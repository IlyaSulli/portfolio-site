import { useCallback, useEffect } from "react";
import { TemplateField, FieldFilters } from "../../types";
import {
    getFilterSchemaForField,
    getRequiredFilters,
    getDefaultFilterValue,
    isFilterConditionallyRequired,
} from "./utils";
import { getCategoriesForClusters } from "@/lib/textgen/generators/occupation";

export function useFiltersManager(
    fields: TemplateField[],
    fieldFilters: FieldFilters,
    updateFilters: (filters: FieldFilters) => void
) {
    // Auto-add required filters for all fields on mount and when fields change
    useEffect(() => {
        const initializeFilters = async () => {
            let needsUpdate = false;
            const newFilters = { ...fieldFilters };

            for (const field of fields) {
                const requiredFilterKeys = getRequiredFilters(field);
                const schema = getFilterSchemaForField(field);
                
                if (!newFilters[field.id]) {
                    newFilters[field.id] = [];
                }

                // First pass: add all non-dynamicValues filters
                for (const filterKey of requiredFilterKeys) {
                    const existingFilterKeys = newFilters[field.id].map(f => f.filterKey);
                    if (existingFilterKeys.includes(filterKey)) continue;
                    
                    const filterSchema = schema[filterKey];
                    // Skip dynamic filters in first pass
                    if (filterSchema?.dynamicValues) continue;
                    
                    const defaultValue = getDefaultFilterValue(filterSchema);
                    newFilters[field.id] = [
                        ...newFilters[field.id],
                        { filterKey, value: defaultValue }
                    ];
                    needsUpdate = true;
                }

                // Second pass: add dynamicValues filters (like category based on cluster)
                for (const filterKey of requiredFilterKeys) {
                    const existingFilterKeys = newFilters[field.id].map(f => f.filterKey);
                    if (existingFilterKeys.includes(filterKey)) continue;
                    
                    const filterSchema = schema[filterKey];
                    // Only process dynamic filters in second pass
                    if (!filterSchema?.dynamicValues) continue;
                    
                    let defaultValue: any = [];
                    
                    // Get value from the linked filter
                    const linkedFilterKey = filterSchema.dynamicValues;
                    const linkedFilter = newFilters[field.id].find(f => f.filterKey === linkedFilterKey);
                    const linkedValues = (linkedFilter?.value as string[]) || [];
                    
                    if (linkedValues.length > 0 && linkedFilterKey === 'cluster') {
                        defaultValue = await getCategoriesForClusters(linkedValues);
                    }
                    
                    newFilters[field.id] = [
                        ...newFilters[field.id],
                        { filterKey, value: defaultValue }
                    ];
                    needsUpdate = true;
                }
            }

            if (needsUpdate) {
                updateFilters(newFilters);
            }
        };
        
        initializeFilters();
    }, [fields]);

    // Get available filters for a field
    const getAvailableFilters = useCallback((field: TemplateField) => {
        const schema = getFilterSchemaForField(field);
        const existingFilterKeys = (fieldFilters[field.id] || []).map(f => f.filterKey);
        
        const controlledByAdds = new Set<string>();
        Object.entries(schema).forEach(([_, filterDef]) => {
            const def = filterDef as { adds?: string[] };
            if (def.adds) {
                def.adds.forEach(key => controlledByAdds.add(key));
            }
        });
        
        return Object.entries(schema).filter(([key, filterDef]) => {
            const def = filterDef as { required?: boolean; requires?: string[] };
            // Already added
            if (existingFilterKeys.includes(key)) return false;
            // Required filters auto-add, don't show in dropdown
            if (def.required) return false;
            // Controlled by adds
            if (controlledByAdds.has(key)) return false;
            // Has requires dependency - only show if all required filters exist
            if (def.requires && def.requires.length > 0) {
                const hasAllRequired = def.requires.every(req => existingFilterKeys.includes(req));
                if (!hasAllRequired) return false;
            }
            return true;
        });
    }, [fieldFilters]);

    // Check if a filter is required
    const isFilterRequired = useCallback((field: TemplateField, filterKey: string): boolean => {
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey] as { required?: boolean };
        
        if (filterSchema?.required === true) return true;
        
        const existingFilters = fieldFilters[field.id] || [];
        const conditional = isFilterConditionallyRequired(schema, filterKey, existingFilters);
        return conditional.required;
    }, [fieldFilters]);

    // Get dynamic minItems for a filter
    const getFilterMinItems = useCallback((field: TemplateField, filterKey: string): number => {
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey] as { minItems?: number };
        
        const existingFilters = fieldFilters[field.id] || [];
        const conditional = isFilterConditionallyRequired(schema, filterKey, existingFilters);
        const isRequired = isFilterRequired(field, filterKey);
        
        return conditional.minItems ?? filterSchema?.minItems ?? (isRequired ? 1 : 0);
    }, [fieldFilters, isFilterRequired]);

    // Add a new filter to a field
    const handleAddFilter = useCallback((fieldId: string, filterKey: string) => {
        const field = fields.find(f => f.id === fieldId);
        if (!field) return;
        
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey];
        const defaultValue = getDefaultFilterValue(filterSchema);
        
        updateFilters({
            ...fieldFilters,
            [fieldId]: [
                ...(fieldFilters[fieldId] || []),
                { filterKey, value: defaultValue }
            ]
        });
    }, [fields, fieldFilters, updateFilters]);

    // Remove a filter from a field
    const handleRemoveFilter = useCallback((fieldId: string, filterKey: string) => {
        updateFilters({
            ...fieldFilters,
            [fieldId]: (fieldFilters[fieldId] || []).filter(f => f.filterKey !== filterKey)
        });
    }, [fieldFilters, updateFilters]);

    // Update filter value with special handling for linked filters
    const handleUpdateFilterValue = useCallback(async (fieldId: string, filterKey: string, value: any) => {
        const field = fields.find(f => f.id === fieldId);
        if (!field) {
            updateFilters({
                ...fieldFilters,
                [fieldId]: (fieldFilters[fieldId] || []).map(f => 
                    f.filterKey === filterKey ? { ...f, value } : f
                )
            });
            return;
        }
        
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey] as {
            type?: string;
            adds?: string[];
            requires?: string[];
            linkedTo?: string;
            dynamicValues?: string;
        };
        
        let newFieldFilters = (fieldFilters[fieldId] || []).map(f => 
            f.filterKey === filterKey ? { ...f, value } : f
        );
        
        // Handle 'requires' and 'adds' for boolean filters
        if (filterSchema?.type === "boolean") {
            const filtersToAdd = filterSchema.requires || filterSchema.adds || [];
            const existingFilterKeys = newFieldFilters.map(f => f.filterKey);
            
            if (value === true && filtersToAdd.length > 0) {
                for (const addFilterKey of filtersToAdd) {
                    if (!existingFilterKeys.includes(addFilterKey)) {
                        const addFilterSchema = schema[addFilterKey];
                        const defaultValue = getDefaultFilterValue(addFilterSchema);
                        newFieldFilters = [...newFieldFilters, { filterKey: addFilterKey, value: defaultValue }];
                    }
                }
            } else if (value === false && filterSchema.adds) {
                // Only remove for 'adds', not 'requires'
                newFieldFilters = newFieldFilters.filter(f => !filterSchema.adds!.includes(f.filterKey));
            }
        }
        
        // When cluster changes, auto-add all categories for newly added clusters
        if (filterKey === 'cluster') {
            const newClusters = value as string[];
            const oldClusterFilter = fieldFilters[fieldId]?.find(f => f.filterKey === 'cluster');
            const oldClusters = (oldClusterFilter?.value as string[]) || [];
            const categoryFilter = newFieldFilters.find(f => f.filterKey === 'category');
            const currentCategories = (categoryFilter?.value as string[]) || [];
            
            // Find newly added clusters
            const addedClusters = newClusters.filter(c => !oldClusters.includes(c));
            
            if (addedClusters.length > 0) {
                // Get categories for newly added clusters and add them
                const newCategories = await getCategoriesForClusters(addedClusters);
                const updatedCategories = Array.from(new Set([...currentCategories, ...newCategories]));
                
                newFieldFilters = newFieldFilters.map(f => 
                    f.filterKey === 'category' ? { ...f, value: updatedCategories } : f
                );
            }
            
            // Find removed clusters and remove their categories
            const removedClusters = oldClusters.filter(c => !newClusters.includes(c));
            if (removedClusters.length > 0) {
                const removedCategories = await getCategoriesForClusters(removedClusters);
                const filteredCategories = currentCategories.filter(c => !removedCategories.includes(c));
                
                newFieldFilters = newFieldFilters.map(f => 
                    f.filterKey === 'category' ? { ...f, value: filteredCategories } : f
                );
            }
        }
        
        // When category changes, check if any cluster has no categories left - if so, remove that cluster
        if (filterKey === 'category' && filterSchema?.linkedTo === 'cluster') {
            const selectedCategories = value as string[];
            const clusterFilter = newFieldFilters.find(f => f.filterKey === 'cluster');
            const selectedClusters = (clusterFilter?.value as string[]) || [];
            
            // Check each cluster to see if it still has at least one category selected
            const clustersToKeep: string[] = [];
            for (const cluster of selectedClusters) {
                const clusterCategories = await getCategoriesForClusters([cluster]);
                const hasSelectedCategory = clusterCategories.some(cat => selectedCategories.includes(cat));
                if (hasSelectedCategory) {
                    clustersToKeep.push(cluster);
                }
            }
            
            // Update clusters if any were removed
            if (clustersToKeep.length !== selectedClusters.length) {
                newFieldFilters = newFieldFilters.map(f => 
                    f.filterKey === 'cluster' ? { ...f, value: clustersToKeep } : f
                );
            }
        }
        
        updateFilters({
            ...fieldFilters,
            [fieldId]: newFieldFilters
        });
    }, [fields, fieldFilters, updateFilters]);

    // Handle chip operations for array filters
    const handleAddChip = useCallback((fieldId: string, filterKey: string, chipValue: string) => {
        const currentFilter = fieldFilters[fieldId]?.find(f => f.filterKey === filterKey);
        const currentValues = Array.isArray(currentFilter?.value) ? currentFilter.value : [];
        if (chipValue.trim() && !currentValues.includes(chipValue.trim())) {
            handleUpdateFilterValue(fieldId, filterKey, [...currentValues, chipValue.trim()]);
        }
    }, [fieldFilters, handleUpdateFilterValue]);

    const handleRemoveChip = useCallback((fieldId: string, filterKey: string, chipValue: string) => {
        const currentFilter = fieldFilters[fieldId]?.find(f => f.filterKey === filterKey);
        const currentValues = Array.isArray(currentFilter?.value) ? currentFilter.value : [];
        handleUpdateFilterValue(fieldId, filterKey, currentValues.filter(v => v !== chipValue));
    }, [fieldFilters, handleUpdateFilterValue]);

    return {
        getAvailableFilters,
        isFilterRequired,
        getFilterMinItems,
        handleAddFilter,
        handleRemoveFilter,
        handleUpdateFilterValue,
        handleAddChip,
        handleRemoveChip,
    };
}
