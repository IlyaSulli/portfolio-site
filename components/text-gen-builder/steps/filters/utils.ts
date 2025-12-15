import { Template, TemplateField, FieldFilters, FilterValue } from "../../types";
import { TextGenField } from "@/config/textGenField";

// Get the filter schema for a field based on its originalName
export function getFilterSchemaForField(field: TemplateField): Record<string, any> {
    const fieldKey = Object.keys(TextGenField).find(
        key => TextGenField[key as keyof typeof TextGenField].name === field.originalName
    );
    if (fieldKey) {
        return TextGenField[fieldKey as keyof typeof TextGenField].filterSchema || {};
    }
    return {};
}

// Helper function to check if a filter value is considered "filled"
export function isFilterValueFilled(value: any, minItems?: number): boolean {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) {
        const min = minItems ?? 1;
        return value.length >= min;
    }
    if (typeof value === "number") return true;
    if (typeof value === "boolean") return true;
    if (typeof value === "object" && "min" in value && "max" in value) {
        if (typeof value.min === "string" || typeof value.max === "string") {
            return value.min !== "" || value.max !== "";
        }
        return true;
    }
    return false;
}

// Check if a filter is conditionally required based on another filter's value
export function isFilterConditionallyRequired(
    schema: Record<string, any>,
    filterKey: string,
    existingFilters: FilterValue[]
): { required: boolean; minItems?: number } {
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
    
    const filterSchema = schema[filterKey] as { requiredWhen?: string };
    if (filterSchema?.requiredWhen) {
        const dependentFilter = existingFilters.find(f => f.filterKey === filterSchema.requiredWhen);
        if (dependentFilter?.value === true) {
            return { required: true };
        }
    }
    
    return { required: false };
}

// Get required filter keys for a field
export function getRequiredFilters(field: TemplateField): string[] {
    const schema = getFilterSchemaForField(field);
    return Object.entries(schema)
        .filter(([_, filterDef]) => (filterDef as any).required === true)
        .map(([key]) => key);
}

// Get default value for a filter based on its schema
export function getDefaultFilterValue(filterSchema: any): any {
    if (!filterSchema) return "";
    
    const { type, default: defaultVal, defaultMin, defaultMax, min, max } = filterSchema;
    
    switch (type) {
        case "date":
            return "";
        case "dateRange":
            return { min: "", max: "" };
        case "range":
            return { 
                min: defaultMin ?? min ?? 0, 
                max: defaultMax ?? max ?? 100 
            };
        case "array":
            return defaultVal && Array.isArray(defaultVal) ? defaultVal : [];
        default:
            return defaultVal !== undefined ? defaultVal : (type === "array" ? [] : "");
    }
}

// Validation function to check if all required filters are filled
export function validateRequiredFilters(template: Template): { isValid: boolean; missingFields: string[] } {
    const missingFields: string[] = [];
    const fieldFilters = template.filters || {};

    for (const field of template.fields) {
        const schema = getFilterSchemaForField(field);
        const existingFilters = fieldFilters[field.id] || [];
        
        const requiredFilterKeys = Object.entries(schema)
            .filter(([_, filterDef]) => (filterDef as any).required === true)
            .map(([key]) => key);
        
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
            const filterSchema = schema[filterKey] as { name?: string; minItems?: number };
            const minItems = conditionalRequirements[filterKey] ?? filterSchema?.minItems;
            
            if (!filterValue || !isFilterValueFilled(filterValue.value, minItems)) {
                missingFields.push(`${field.name}: ${filterSchema?.name || filterKey}`);
            }
        }
        
        for (const filter of existingFilters) {
            const filterSchema = schema[filter.filterKey] as { name?: string; type?: string; minItems?: number };
            if (filterSchema?.type === "array" && filterSchema?.minItems && Array.isArray(filter.value)) {
                if (filter.value.length < filterSchema.minItems && filter.value.length > 0) {
                    missingFields.push(`${field.name}: ${filterSchema?.name || filter.filterKey} (minimum ${filterSchema.minItems} required)`);
                }
            }
        }
    }

    return { isValid: missingFields.length === 0, missingFields };
}
