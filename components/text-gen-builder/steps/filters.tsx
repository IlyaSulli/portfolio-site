import { createElement, useCallback, useState, useRef, useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Switch } from "@heroui/switch";
import { X, Info } from "lucide-react";
import { Template, TemplateField, FieldFilters, FilterValue } from "../types";
import { TextGenField } from "@/config/textGenField";
import { parseDate, parseAbsoluteToLocal } from "@internationalized/date";

interface StepFiltersProps {
    template: Template;
    onFiltersChange?: (filters: FieldFilters) => void;
}

// Get the filter schema for a field based on its originalName
function getFilterSchemaForField(field: TemplateField) {
    const fieldKey = Object.keys(TextGenField).find(
        key => TextGenField[key as keyof typeof TextGenField].name === field.originalName
    );
    if (fieldKey) {
        return TextGenField[fieldKey as keyof typeof TextGenField].filterSchema || {};
    }
    return {};
}

// Helper function to check if a filter value is considered "filled"
function isFilterValueFilled(value: any, minItems?: number): boolean {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) {
        const min = minItems ?? 1;
        return value.length >= min;
    }
    if (typeof value === "number") return true;
    if (typeof value === "boolean") return true;
    // Range type check
    if (typeof value === "object" && "min" in value && "max" in value) {
        // For date range, check if both dates are filled
        if (typeof value.min === "string" || typeof value.max === "string") {
            return value.min !== "" || value.max !== "";
        }
        // For numeric range, it's always considered filled if we have the object
        return true;
    }
    return false;
}

// Check if a filter is conditionally required based on another filter's value
function isFilterConditionallyRequired(
    schema: Record<string, any>,
    filterKey: string,
    existingFilters: FilterValue[]
): { required: boolean; minItems?: number } {
    // Check if any boolean filter has this filter in its 'requires' array and is turned on
    for (const [key, filterDef] of Object.entries(schema)) {
        const def = filterDef as { type?: string; requires?: string[]; requiresMinItems?: Record<string, number> };
        if (def.type === "boolean" && def.requires?.includes(filterKey)) {
            const boolFilter = existingFilters.find(f => f.filterKey === key);
            if (boolFilter?.value === true) {
                const minItems = def.requiresMinItems?.[filterKey];
                return { required: true, minItems };
            }
        }
    }
    
    // Legacy support for requiredWhen
    const filterSchema = schema[filterKey] as { requiredWhen?: string };
    if (filterSchema?.requiredWhen) {
        const dependentFilter = existingFilters.find(f => f.filterKey === filterSchema.requiredWhen);
        if (dependentFilter?.value === true) {
            return { required: true };
        }
    }
    
    return { required: false };
}

// Validation function to check if all required filters are filled
export function validateRequiredFilters(template: Template): { isValid: boolean; missingFields: string[] } {
    const missingFields: string[] = [];
    const fieldFilters = template.filters || {};

    for (const field of template.fields) {
        const schema = getFilterSchemaForField(field);
        const existingFilters = fieldFilters[field.id] || [];
        
        // Get statically required filters
        const requiredFilterKeys = Object.entries(schema)
            .filter(([_, filterDef]) => (filterDef as any).required === true)
            .map(([key]) => key);
        
        // Get conditionally required filters
        const conditionalRequirements: Record<string, number | undefined> = {};
        Object.keys(schema).forEach(key => {
            const conditional = isFilterConditionallyRequired(schema, key, existingFilters);
            if (conditional.required) {
                conditionalRequirements[key] = conditional.minItems;
            }
        });
        
        const allRequiredKeys = Array.from(new Set([...requiredFilterKeys, ...Object.keys(conditionalRequirements)]));

        for (const filterKey of allRequiredKeys) {
            const filterValue = existingFilters.find(f => f.filterKey === filterKey);
            const filterSchema = schema[filterKey as keyof typeof schema] as { name?: string; minItems?: number };
            const conditionalMinItems = conditionalRequirements[filterKey];
            const minItems = conditionalMinItems ?? filterSchema?.minItems;
            
            if (!filterValue || !isFilterValueFilled(filterValue.value, minItems)) {
                missingFields.push(`${field.name}: ${filterSchema?.name || filterKey}`);
            }
        }
        
        // Also validate minItems for non-required array filters that have values
        for (const filter of existingFilters) {
            const filterSchema = schema[filter.filterKey as keyof typeof schema] as { name?: string; type?: string; minItems?: number };
            if (filterSchema?.type === "array" && filterSchema?.minItems && Array.isArray(filter.value)) {
                if (filter.value.length < filterSchema.minItems && filter.value.length > 0) {
                    missingFields.push(`${field.name}: ${filterSchema?.name || filter.filterKey} (minimum ${filterSchema.minItems} required)`);
                }
            }
        }
    }

    return {
        isValid: missingFields.length === 0,
        missingFields
    };
}

// Helper to get required filter keys for a field
function getRequiredFilters(field: TemplateField): string[] {
    const schema = getFilterSchemaForField(field);
    return Object.entries(schema)
        .filter(([_, filterDef]) => (filterDef as any).required === true)
        .map(([key]) => key);
}

export default function StepFilters({ template, onFiltersChange }: StepFiltersProps) {
    const fieldFilters = template.filters || {};

    const updateFilters = (newFilters: FieldFilters) => {
        if (onFiltersChange) {
            onFiltersChange(newFilters);
        }
    };

    // Auto-add required filters for all fields on mount and when fields change
    useEffect(() => {
        let needsUpdate = false;
        const newFilters = { ...fieldFilters };

        template.fields.forEach((field) => {
            const requiredFilterKeys = getRequiredFilters(field);
            const existingFilterKeys = (newFilters[field.id] || []).map(f => f.filterKey);
            const schema = getFilterSchemaForField(field);

            requiredFilterKeys.forEach((filterKey) => {
                if (!existingFilterKeys.includes(filterKey)) {
                    const filterSchema = schema[filterKey as keyof typeof schema] as {
                        type?: string;
                        default?: any;
                        defaultMin?: number;
                        defaultMax?: number;
                        min?: number;
                        max?: number;
                    };

                    let defaultValue;
                    if (filterSchema?.type === "date") {
                        defaultValue = "";
                    } else if (filterSchema?.type === "dateRange") {
                        defaultValue = { min: "", max: "" };
                    } else if (filterSchema?.type === "range") {
                        defaultValue = { 
                            min: filterSchema?.defaultMin ?? filterSchema?.min ?? 0, 
                            max: filterSchema?.defaultMax ?? filterSchema?.max ?? 100 
                        };
                    } else if (filterSchema?.type === "array") {
                        defaultValue = filterSchema?.default && Array.isArray(filterSchema.default) ? filterSchema.default : [];
                    } else {
                        defaultValue = filterSchema?.default !== undefined ? filterSchema.default : (filterSchema?.type === "array" ? [] : "");
                    }

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
    }, [template.fields]);

    // Get available filters for a field (excluding already added ones, required filters, and filters controlled by 'adds')
    const getAvailableFilters = useCallback((field: TemplateField) => {
        const schema = getFilterSchemaForField(field);
        const existingFilterKeys = (fieldFilters[field.id] || []).map(f => f.filterKey);
        
        // Get all filter keys that are controlled by 'adds' from other filters
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

    // Check if a filter is required (either statically or conditionally)
    const isFilterRequired = useCallback((field: TemplateField, filterKey: string): boolean => {
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey as keyof typeof schema] as { required?: boolean; requiredWhen?: string };
        
        // Check static required
        if (filterSchema?.required === true) return true;
        
        // Check conditional required
        const existingFilters = fieldFilters[field.id] || [];
        const conditional = isFilterConditionallyRequired(schema, filterKey, existingFilters);
        return conditional.required;
    }, [fieldFilters]);
    
    // Get the dynamic minItems for a filter (from conditional requirements)
    const getFilterMinItems = useCallback((field: TemplateField, filterKey: string): number | undefined => {
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey as keyof typeof schema] as { minItems?: number };
        
        const existingFilters = fieldFilters[field.id] || [];
        const conditional = isFilterConditionallyRequired(schema, filterKey, existingFilters);
        
        return conditional.minItems ?? filterSchema?.minItems;
    }, [fieldFilters]);

    // Add a new filter to a field
    const handleAddFilter = (fieldId: string, filterKey: string) => {
        const field = template.fields.find(f => f.id === fieldId);
        if (!field) return;
        
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey as keyof typeof schema] as {
            type?: string;
            default?: any;
            defaultMin?: number;
            defaultMax?: number;
            min?: number;
            max?: number;
        };
        
        // Set appropriate default value based on filter type
        let defaultValue;
        if (filterSchema?.type === "date") {
            defaultValue = ""; // Empty string for dates
        } else if (filterSchema?.type === "dateRange") {
            defaultValue = { min: "", max: "" };
        } else if (filterSchema?.type === "range") {
            defaultValue = { 
                min: filterSchema?.defaultMin ?? filterSchema?.min ?? 0, 
                max: filterSchema?.defaultMax ?? filterSchema?.max ?? 100 
            };
        } else if (filterSchema?.type === "array") {
            defaultValue = filterSchema?.default && Array.isArray(filterSchema.default) ? filterSchema.default : [];
        } else {
            defaultValue = filterSchema?.default !== undefined ? filterSchema.default : (filterSchema?.type === "array" ? [] : "");
        }
        
        updateFilters({
            ...fieldFilters,
            [fieldId]: [
                ...(fieldFilters[fieldId] || []),
                { filterKey, value: defaultValue }
            ]
        });
    };

    // Remove a filter from a field
    const handleRemoveFilter = (fieldId: string, filterKey: string) => {
        updateFilters({
            ...fieldFilters,
            [fieldId]: (fieldFilters[fieldId] || []).filter(f => f.filterKey !== filterKey)
        });
    };

    // Update filter value
    const handleUpdateFilterValue = (fieldId: string, filterKey: string, value: any) => {
        const field = template.fields.find(f => f.id === fieldId);
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
        const filterSchema = schema[filterKey as keyof typeof schema] as {
            type?: string;
            adds?: string[];
            requires?: string[];
            default?: any;
            defaultMin?: number;
            defaultMax?: number;
            min?: number;
            max?: number;
        };
        
        let newFieldFilters = (fieldFilters[fieldId] || []).map(f => 
            f.filterKey === filterKey ? { ...f, value } : f
        );
        
        // Handle 'requires' property for boolean filters - add required filters when turned on
        if (filterSchema?.type === "boolean" && filterSchema?.requires && value === true) {
            const filtersToAdd = filterSchema.requires;
            const existingFilterKeys = newFieldFilters.map(f => f.filterKey);
            
            for (const addFilterKey of filtersToAdd) {
                if (!existingFilterKeys.includes(addFilterKey)) {
                    const addFilterSchema = schema[addFilterKey as keyof typeof schema] as {
                        type?: string;
                        default?: any;
                        defaultMin?: number;
                        defaultMax?: number;
                        min?: number;
                        max?: number;
                    };
                    
                    let defaultValue;
                    if (addFilterSchema?.type === "date") {
                        defaultValue = "";
                    } else if (addFilterSchema?.type === "dateRange") {
                        defaultValue = { min: "", max: "" };
                    } else if (addFilterSchema?.type === "range") {
                        defaultValue = { 
                            min: addFilterSchema?.defaultMin ?? addFilterSchema?.min ?? 0, 
                            max: addFilterSchema?.defaultMax ?? addFilterSchema?.max ?? 100 
                        };
                    } else if (addFilterSchema?.type === "array") {
                        defaultValue = addFilterSchema?.default && Array.isArray(addFilterSchema.default) ? addFilterSchema.default : [];
                    } else {
                        defaultValue = addFilterSchema?.default !== undefined ? addFilterSchema.default : (addFilterSchema?.type === "array" ? [] : "");
                    }
                    
                    newFieldFilters = [...newFieldFilters, { filterKey: addFilterKey, value: defaultValue }];
                }
            }
        }
        
        // Handle legacy 'adds' property for boolean filters
        if (filterSchema?.type === "boolean" && filterSchema?.adds) {
            const filtersToAdd = filterSchema.adds;
            const existingFilterKeys = newFieldFilters.map(f => f.filterKey);
            
            if (value === true) {
                // Add the specified filters if they don't exist
                for (const addFilterKey of filtersToAdd) {
                    if (!existingFilterKeys.includes(addFilterKey)) {
                        const addFilterSchema = schema[addFilterKey as keyof typeof schema] as {
                            type?: string;
                            default?: any;
                            defaultMin?: number;
                            defaultMax?: number;
                            min?: number;
                            max?: number;
                        };
                        
                        let defaultValue;
                        if (addFilterSchema?.type === "date") {
                            defaultValue = "";
                        } else if (addFilterSchema?.type === "dateRange") {
                            defaultValue = { min: "", max: "" };
                        } else if (addFilterSchema?.type === "range") {
                            defaultValue = { 
                                min: addFilterSchema?.defaultMin ?? addFilterSchema?.min ?? 0, 
                                max: addFilterSchema?.defaultMax ?? addFilterSchema?.max ?? 100 
                            };
                        } else if (addFilterSchema?.type === "array") {
                            defaultValue = addFilterSchema?.default && Array.isArray(addFilterSchema.default) ? addFilterSchema.default : [];
                        } else {
                            defaultValue = addFilterSchema?.default !== undefined ? addFilterSchema.default : (addFilterSchema?.type === "array" ? [] : "");
                        }
                        
                        newFieldFilters = [...newFieldFilters, { filterKey: addFilterKey, value: defaultValue }];
                    }
                }
            } else {
                // Remove the specified filters when toggle is off
                newFieldFilters = newFieldFilters.filter(f => !filtersToAdd.includes(f.filterKey));
            }
        }
        
        updateFilters({
            ...fieldFilters,
            [fieldId]: newFieldFilters
        });
    };

    // Handle adding a chip for array type filters
    const handleAddChip = (fieldId: string, filterKey: string, chipValue: string) => {
        const currentFilter = fieldFilters[fieldId]?.find(f => f.filterKey === filterKey);
        const currentValues = Array.isArray(currentFilter?.value) ? currentFilter.value : [];
        if (chipValue.trim() && !currentValues.includes(chipValue.trim())) {
            handleUpdateFilterValue(fieldId, filterKey, [...currentValues, chipValue.trim()]);
        }
    };

    // Handle removing a chip for array type filters
    const handleRemoveChip = (fieldId: string, filterKey: string, chipValue: string) => {
        const currentFilter = fieldFilters[fieldId]?.find(f => f.filterKey === filterKey);
        const currentValues = Array.isArray(currentFilter?.value) ? currentFilter.value : [];
        handleUpdateFilterValue(fieldId, filterKey, currentValues.filter(v => v !== chipValue));
    };

    // Render the value input for a filter based on its type
    const renderFilterValueInput = (field: TemplateField, filter: FilterValue) => {
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filter.filterKey as keyof typeof schema] as {
            name: string;
            type: string;
            allowedValues?: string[];
            tooltip?: string;
            description?: string;
            min?: number;
            max?: number;
            default?: any;
            defaultMin?: number;
            defaultMax?: number;
            required?: boolean;
            requiredWhen?: string;
            minItems?: number;
        };

        if (!filterSchema) return null;

        const currentValue = filter.value;
        const isRequired = isFilterRequired(field, filter.filterKey);

        // Range type - two number inputs for min/max
        if (filterSchema.type === "range") {
            const rangeValue = (currentValue && typeof currentValue === "object" && !Array.isArray(currentValue)) 
                ? currentValue as { min: number; max: number }
                : { min: filterSchema.defaultMin ?? filterSchema.min ?? 0, max: filterSchema.defaultMax ?? filterSchema.max ?? 100 };
            
            return (
                <div className="inline-flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <Input
                        type="number"
                        aria-label={`${filterSchema.name} minimum`}
                        placeholder="Min"
                        variant="bordered"
                        size="sm"
                        isRequired={isRequired}
                        min={filterSchema.min}
                        max={rangeValue.max}
                        value={rangeValue.min?.toString() ?? ""}
                        onValueChange={(val) => {
                            const newMin = parseInt(val) || 0;
                            const clampedMin = Math.min(newMin, rangeValue.max);
                            handleUpdateFilterValue(field.id, filter.filterKey, { ...rangeValue, min: clampedMin });
                        }}
                        classNames={{
                            base: "w-auto",
                            inputWrapper: "bg-zinc-800/50 border-white/20 w-24 h-10",
                        }}
                        startContent={<span className="text-xs text-zinc-500">Min</span>}
                    />
                    <span className="text-zinc-500">—</span>
                    <Input
                        type="number"
                        aria-label={`${filterSchema.name} maximum`}
                        placeholder="Max"
                        variant="bordered"
                        size="sm"
                        isRequired={isRequired}
                        min={rangeValue.min}
                        max={filterSchema.max}
                        value={rangeValue.max?.toString() ?? ""}
                        onValueChange={(val) => {
                            const newMax = parseInt(val) || 0;
                            const clampedMax = Math.max(newMax, rangeValue.min);
                            handleUpdateFilterValue(field.id, filter.filterKey, { ...rangeValue, max: clampedMax });
                        }}
                        classNames={{
                            base: "w-auto",
                            inputWrapper: "bg-zinc-800/50 border-white/20 w-24 h-10",
                        }}
                        startContent={<span className="text-xs text-zinc-500">Max</span>}
                    />
                </div>
            );
        }

        // Date Range type - two DatePickers for min/max dates
        if (filterSchema.type === "dateRange") {
            const dateRangeValue = (currentValue && typeof currentValue === "object" && !Array.isArray(currentValue))
                ? currentValue as { min: string; max: string }
                : { min: "", max: "" };

            const parseDateValue = (dateStr: string): any => {
                if (!dateStr) return null;
                try {
                    const parts = dateStr.split('/');
                    if (parts.length === 3) {
                        const [day, month, year] = parts;
                        return parseDate(`${year}-${month}-${day}`);
                    }
                } catch (e) {}
                return null;
            };

            const formatDate = (val: any) => {
                if (!val) return "";
                return `${String(val.day).padStart(2, '0')}/${String(val.month).padStart(2, '0')}/${val.year}`;
            };

            return (
                <div className="inline-flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <DatePicker
                        aria-label={`${filterSchema.name} from`}
                        variant="bordered"
                        size="sm"
                        showMonthAndYearPickers
                        isRequired={isRequired}
                        value={parseDateValue(dateRangeValue.min) as any}
                        onChange={(val) => {
                            handleUpdateFilterValue(field.id, filter.filterKey, { ...dateRangeValue, min: formatDate(val) });
                        }}
                        classNames={{
                            base: "w-auto",
                            inputWrapper: "bg-zinc-800/50 border-white/20 w-36 h-10",
                        }}
                    />
                    <span className="text-zinc-500">—</span>
                    <DatePicker
                        aria-label={`${filterSchema.name} to`}
                        variant="bordered"
                        size="sm"
                        showMonthAndYearPickers
                        isRequired={isRequired}
                        value={parseDateValue(dateRangeValue.max) as any}
                        onChange={(val) => {
                            handleUpdateFilterValue(field.id, filter.filterKey, { ...dateRangeValue, max: formatDate(val) });
                        }}
                        classNames={{
                            base: "w-auto",
                            inputWrapper: "bg-zinc-800/50 border-white/20 w-36 h-10",
                        }}
                    />
                </div>
            );
        }

        // Date type - use DatePicker for calendar selection
        if (filterSchema.type === "date") {
            // Parse dd/mm/yyyy format back to date object if it exists
            let dateValue: any = null;
            if (currentValue && typeof currentValue === "string" && currentValue.length > 0) {
                try {
                    const parts = currentValue.split('/');
                    if (parts.length === 3) {
                        const [day, month, year] = parts;
                        dateValue = parseDate(`${year}-${month}-${day}`);
                    }
                } catch (e) {
                    // If parsing fails, leave as null
                }
            }

            return (
                <DatePicker
                    aria-label={filterSchema.name}
                    variant="bordered"
                    size="sm"
                    showMonthAndYearPickers
                    isRequired={isRequired}
                    value={dateValue}
                    onChange={(val) => {
                        if (val) {
                            // Convert date to dd/mm/yyyy string
                            const dateStr = `${String(val.day).padStart(2, '0')}/${String(val.month).padStart(2, '0')}/${val.year}`;
                            handleUpdateFilterValue(field.id, filter.filterKey, dateStr);
                        } else {
                            handleUpdateFilterValue(field.id, filter.filterKey, "");
                        }
                    }}
                    classNames={{
                        inputWrapper: "bg-zinc-800/50 border-white/20 w-40 h-10",
                    }}
                />
            );
        }

        // Array type with predefined options - use Select with multiple
        if (filterSchema.type === "array" && filterSchema.allowedValues && filterSchema.allowedValues.length > 0) {
            const defaultValues = filterSchema.default && Array.isArray(filterSchema.default) ? filterSchema.default : [];
            const selectedValues = Array.isArray(currentValue) ? currentValue : defaultValues;
            const dynamicMinItems = getFilterMinItems(field, filter.filterKey);
            const minItems = dynamicMinItems ?? (isRequired ? 1 : 0);
            const hasMinItemsError = minItems > 0 && selectedValues.length < minItems;
            
            return (
                <div className="flex-1 flex flex-col gap-1">
                    <Select
                        aria-label={`Select ${filterSchema.name}`}
                        placeholder="Select options"
                        selectionMode="multiple"
                        variant="bordered"
                        size="sm"
                        isMultiline={true}
                        isRequired={isRequired}
                        isInvalid={hasMinItemsError}
                        errorMessage={hasMinItemsError ? `Select at least ${minItems} option${minItems > 1 ? 's' : ''}` : undefined}
                        selectedKeys={new Set(selectedValues)}
                        onSelectionChange={(keys) => {
                            const selected = Array.from(keys) as string[];
                            handleUpdateFilterValue(field.id, filter.filterKey, selected);
                        }}
                        classNames={{
                            base: "flex-1",
                            trigger: `bg-zinc-800/50 ${hasMinItemsError ? 'border-danger' : 'border-white/20'} h-auto min-h-10 py-2`,
                            popoverContent: "bg-zinc-900 border-white/10",
                        }}
                        renderValue={(items) => (
                            <div className="flex flex-wrap gap-1">
                                {Array.from(items).map((item) => (
                                    <Chip
                                        key={item.key}
                                        size="sm"
                                        variant="flat"
                                        onClose={() => handleRemoveChip(field.id, filter.filterKey, item.key as string)}
                                    >
                                        {item.textValue}
                                    </Chip>
                                ))}
                            </div>
                        )}
                    >
                        {filterSchema.allowedValues.map((option: string) => (
                            <SelectItem key={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            );
        }

        // Select type - single selection dropdown
        if (filterSchema.type === "select" && filterSchema.allowedValues && filterSchema.allowedValues.length > 0) {
            const defaultValue = filterSchema.default !== undefined ? filterSchema.default : "";
            const selectedValue = currentValue !== undefined && currentValue !== "" ? String(currentValue) : defaultValue;
            return (
                <Select
                    aria-label={`Select ${filterSchema.name}`}
                    placeholder="Select an option"
                    variant="bordered"
                    size="sm"
                    isRequired={isRequired}
                    selectedKeys={selectedValue ? [selectedValue] : []}
                    onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        handleUpdateFilterValue(field.id, filter.filterKey, selected || "");
                    }}
                    classNames={{
                        base: "w-auto min-w-[150px]",
                        trigger: "bg-zinc-800/50 border-white/20 h-10",
                        popoverContent: "bg-zinc-900 border-white/10",
                    }}
                >
                    {filterSchema.allowedValues.map((option: string) => (
                        <SelectItem key={option}>
                            {option}
                        </SelectItem>
                    ))}
                </Select>
            );
        }

        // Array type without predefined options - user can type custom values
        if (filterSchema.type === "array" && (!filterSchema.allowedValues || filterSchema.allowedValues.length === 0)) {
            const defaultValues = filterSchema.default && Array.isArray(filterSchema.default) ? filterSchema.default : [];
            const selectedValues = Array.isArray(currentValue) ? currentValue : defaultValues;
            const dynamicMinItems = getFilterMinItems(field, filter.filterKey);
            const minItems = dynamicMinItems ?? (isRequired ? 1 : 0);
            const hasMinItemsError = minItems > 0 && selectedValues.length < minItems;
            
            return (
                <div className="flex-1 flex flex-col gap-1">
                    <div className={`flex-1 border ${hasMinItemsError ? 'border-danger' : 'border-white/20'} bg-zinc-800/50 rounded-lg p-2 flex flex-wrap gap-1 items-center`}>
                        {selectedValues.map((val: string) => (
                            <Chip
                                key={val}
                                size="sm"
                                variant="flat"
                                onClose={() => handleRemoveChip(field.id, filter.filterKey, val)}
                            >
                                {val}
                            </Chip>
                        ))}
                        <input
                            type="text"
                            placeholder="Type and press Enter"
                            className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none flex-1 min-w-[120px]"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const input = e.target as HTMLInputElement;
                                    handleAddChip(field.id, filter.filterKey, input.value);
                                    input.value = "";
                                }
                            }}
                        />
                    </div>
                    {hasMinItemsError && (
                        <span className="text-tiny text-danger">Add at least {minItems} item{minItems > 1 ? 's' : ''}</span>
                    )}
                </div>
            );
        }

        // Integer type - use number input
        if (filterSchema.type === "integer") {
            const defaultValue = filterSchema.default !== undefined ? filterSchema.default : "";
            const displayValue = currentValue !== undefined && currentValue !== "" ? currentValue.toString() : defaultValue?.toString() || "";
            return (
                <Input
                    type="number"
                    aria-label={filterSchema.name}
                    variant="bordered"
                    size="sm"
                    isRequired={isRequired}
                    min={filterSchema.min}
                    max={filterSchema.max}
                    value={displayValue}
                    onValueChange={(val) => handleUpdateFilterValue(field.id, filter.filterKey, parseInt(val) || 0)}
                    classNames={{
                        inputWrapper: "bg-zinc-800/50 border-white/20 w-32 h-10",
                    }}
                />
            );
        }

        // Boolean type - use Switch
        if (filterSchema.type === "boolean") {
            const defaultValue = filterSchema.default !== undefined ? filterSchema.default : false;
            const displayValue = currentValue !== undefined ? Boolean(currentValue) : defaultValue;
            return (
                <div className="flex items-center h-10">
                    <Switch
                        aria-label={filterSchema.name}
                        size="sm"
                        color="success"
                        isSelected={displayValue}
                        onValueChange={(val) => handleUpdateFilterValue(field.id, filter.filterKey, val)}
                        classNames={{
                            wrapper: "bg-zinc-700",
                        }}
                    />
                </div>
            );
        }

        // String type - use text input
        const defaultValue = filterSchema.default !== undefined ? filterSchema.default : "";
        const displayValue = currentValue !== undefined && currentValue !== "" ? currentValue.toString() : defaultValue?.toString() || "";
        return (
            <Input
                aria-label={filterSchema.name}
                placeholder={`Enter ${filterSchema.name.toLowerCase()}`}
                variant="bordered"
                size="sm"
                isRequired={isRequired}
                value={displayValue}
                onValueChange={(val) => handleUpdateFilterValue(field.id, filter.filterKey, val)}
                classNames={{
                    inputWrapper: "bg-zinc-800/50 border-white/20 flex-1 min-w-[150px] h-10",
                }}
            />
        );
    };

    return (
        <div className="mt-8 flex flex-col w-full gap-4 h-[500px]">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 px-2">
                Configure filters for each field in your template. Filters help refine the generated data.
            </p>
            
            <ScrollShadow 
                className="flex-1" 
                hideScrollBar={false}
                size={60}
            >
                <div className="flex flex-col gap-4 pr-3">
                    {template.fields.length === 0 ? (
                        <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-6 rounded-lg min-h-[300px] flex items-center justify-center">
                            <span className="text-zinc-500 dark:text-zinc-400">
                                No fields to configure. Go back and add some fields first.
                            </span>
                        </div>
                    ) : (
                        template.fields.map((field) => {
                    const availableFilters = getAvailableFilters(field);
                    const existingFilters = fieldFilters[field.id] || [];
                    const schema = getFilterSchemaForField(field);
                    const hasFiltersAvailable = Object.keys(schema).length > 0;

                    return (
                        <div 
                            key={field.id}
                            className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-4 rounded-lg"
                        >
                            {/* Field Header */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center">
                                    {createElement(field.icon, { size: 16 })}
                                </div>
                                <span className="font-medium">{field.name}</span>
                            </div>

                            {/* Filters */}
                            {hasFiltersAvailable ? (
                                <div className="flex flex-col gap-3 pl-10">
                                    {/* Existing filters */}
                                    {existingFilters.map((filter) => {
                                        const filterSchema = schema[filter.filterKey as keyof typeof schema] as {
                                            name: string;
                                            type?: string;
                                            tooltip?: string;
                                            description?: string;
                                            required?: boolean;
                                            requiredWhen?: string;
                                        };
                                        const tooltipContent = filterSchema?.tooltip || filterSchema?.description || "";
                                        const isRequired = isFilterRequired(field, filter.filterKey);

                                        return (
                                            <div key={filter.filterKey} className="flex flex-col gap-2">
                                                {/* Desktop: single row layout */}
                                                <div className="hidden sm:flex items-start gap-2">
                                                    <span className="text-sm text-zinc-400 whitespace-nowrap mt-2.5">where</span>
                                                    <div className="flex items-center gap-1">
                                                        <Tooltip 
                                                            content={tooltipContent}
                                                            isDisabled={!tooltipContent}
                                                            placement="top"
                                                        >
                                                            <div className={`flex items-center gap-1 px-3 py-2 rounded-lg border bg-zinc-800/50 h-10 min-w-[220px] ${
                                                                isRequired ? 'border-amber-500/50' : 'border-white/20'
                                                            }`}>
                                                                <span className="text-sm truncate">
                                                                    {filterSchema?.name || filter.filterKey}
                                                                </span>
                                                                {isRequired && <span className="text-amber-500">*</span>}
                                                                {tooltipContent && <Info size={12} className="text-zinc-500 ml-auto flex-shrink-0" />}
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                    <span className="text-sm text-zinc-400 mt-2.5">is</span>
                                                    <div className="flex-1 min-w-0">
                                                        {renderFilterValueInput(field, filter)}
                                                    </div>
                                                    {!isRequired && (
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            className="text-danger mt-2"
                                                            onPress={() => handleRemoveFilter(field.id, filter.filterKey)}
                                                            aria-label="Remove filter"
                                                        >
                                                            <X size={16} />
                                                        </Button>
                                                    )}
                                                </div>

                                                {/* Mobile: two row layout */}
                                                <div className="flex sm:hidden flex-col gap-2">
                                                    {/* First row: where [filter] + delete button */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-zinc-400 whitespace-nowrap">where</span>
                                                        <div className="flex-1">
                                                            <Tooltip 
                                                                content={tooltipContent}
                                                                isDisabled={!tooltipContent}
                                                                placement="top"
                                                            >
                                                                <div className={`flex items-center gap-1 px-3 py-2 rounded-lg border bg-zinc-800/50 h-10 w-full ${
                                                                    isRequired ? 'border-amber-500/50' : 'border-white/20'
                                                                }`}>
                                                                    <span className="text-sm truncate">
                                                                        {filterSchema?.name || filter.filterKey}
                                                                    </span>
                                                                    {isRequired && <span className="text-amber-500">*</span>}
                                                                    {tooltipContent && <Info size={12} className="text-zinc-500 ml-auto flex-shrink-0" />}
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                        {!isRequired && (
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="light"
                                                                className="text-danger"
                                                                onPress={() => handleRemoveFilter(field.id, filter.filterKey)}
                                                                aria-label="Remove filter"
                                                            >
                                                                <X size={16} />
                                                            </Button>
                                                        )}
                                                    </div>
                                                    {/* Second row: is [options] */}
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-sm text-zinc-400 whitespace-nowrap mt-2.5">is</span>
                                                        <div className="flex-1 min-w-0">
                                                            {renderFilterValueInput(field, filter)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Add new filter dropdown - only show if there are available filters */}
                                    {availableFilters.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-zinc-400 whitespace-nowrap">where</span>
                                            <Select
                                                aria-label="Select filter"
                                                placeholder="Select Filter"
                                                variant="bordered"
                                                size="sm"
                                                selectedKeys={[]}
                                                onSelectionChange={(keys) => {
                                                    const selected = Array.from(keys)[0] as string;
                                                    if (selected) {
                                                        handleAddFilter(field.id, selected);
                                                    }
                                                }}
                                                classNames={{
                                                    trigger: "bg-zinc-800/50 border-white/20 h-10 max-w-xs",
                                                    popoverContent: "bg-zinc-900 border-white/10",
                                                }}
                                            >
                                                {availableFilters.map(([key, filterDef]) => {
                                                    const def = filterDef as { name: string; tooltip?: string; description?: string };
                                                    return (
                                                        <SelectItem 
                                                            key={key}
                                                            endContent={(def.tooltip || def.description) ? (
                                                                <Tooltip content={def.tooltip || def.description} placement="right">
                                                                    <Info size={12} className="text-zinc-500" />
                                                                </Tooltip>
                                                            ) : null}
                                                        >
                                                            {def.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="pl-10">
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                        No filters available for this field type
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })
                    )}
                </div>
            </ScrollShadow>
        </div>
    );
}
