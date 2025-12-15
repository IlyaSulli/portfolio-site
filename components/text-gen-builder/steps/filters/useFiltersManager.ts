import { useCallback, useEffect } from "react";
import { TemplateField, FieldFilters } from "../../types";
import {
    getFilterSchemaForField,
    getRequiredFilters,
    getDefaultFilterValue,
    isFilterConditionallyRequired,
} from "./utils";

export function useFiltersManager(
    fields: TemplateField[],
    fieldFilters: FieldFilters,
    updateFilters: (filters: FieldFilters) => void
) {
    // Auto-add required filters for all fields on mount and when fields change
    useEffect(() => {
        let needsUpdate = false;
        const newFilters = { ...fieldFilters };

        fields.forEach((field) => {
            const requiredFilterKeys = getRequiredFilters(field);
            const existingFilterKeys = (newFilters[field.id] || []).map(f => f.filterKey);
            const schema = getFilterSchemaForField(field);

            requiredFilterKeys.forEach((filterKey) => {
                if (!existingFilterKeys.includes(filterKey)) {
                    const filterSchema = schema[filterKey];
                    const defaultValue = getDefaultFilterValue(filterSchema);

                    if (!newFilters[field.id]) {
                        newFilters[field.id] = [];
                    }
                    newFilters[field.id] = [
                        ...newFilters[field.id],
                        { filterKey, value: defaultValue }
                    ];
                    needsUpdate = true;
                }
            });
        });

        if (needsUpdate) {
            updateFilters(newFilters);
        }
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
        
        return Object.entries(schema).filter(([key, filterDef]) => 
            !existingFilterKeys.includes(key) && 
            !(filterDef as any).required &&
            !controlledByAdds.has(key)
        );
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

    // Update filter value with special handling for boolean toggles
    const handleUpdateFilterValue = useCallback((fieldId: string, filterKey: string, value: any) => {
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
