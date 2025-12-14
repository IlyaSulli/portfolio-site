import { createElement, useCallback, useState, useRef, useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { ScrollShadow } from "@heroui/scroll-shadow";
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

export default function StepFilters({ template, onFiltersChange }: StepFiltersProps) {
    const fieldFilters = template.filters || {};

    const updateFilters = (newFilters: FieldFilters) => {
        if (onFiltersChange) {
            onFiltersChange(newFilters);
        }
    };

    // Get available filters for a field (excluding already added ones)
    const getAvailableFilters = useCallback((field: TemplateField) => {
        const schema = getFilterSchemaForField(field);
        const existingFilterKeys = (fieldFilters[field.id] || []).map(f => f.filterKey);
        return Object.entries(schema).filter(([key]) => !existingFilterKeys.includes(key));
    }, [fieldFilters]);

    // Add a new filter to a field
    const handleAddFilter = (fieldId: string, filterKey: string) => {
        const field = template.fields.find(f => f.id === fieldId);
        if (!field) return;
        
        const schema = getFilterSchemaForField(field);
        const filterSchema = schema[filterKey as keyof typeof schema] as {
            type?: string;
            default?: any;
        };
        
        // Set appropriate default value based on filter type
        let defaultValue;
        if (filterSchema?.type === "date") {
            defaultValue = ""; // Empty string for dates
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
    const handleUpdateFilterValue = (fieldId: string, filterKey: string, value: string | string[] | number | boolean) => {
        updateFilters({
            ...fieldFilters,
            [fieldId]: (fieldFilters[fieldId] || []).map(f => 
                f.filterKey === filterKey ? { ...f, value } : f
            )
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
        };

        if (!filterSchema) return null;

        const currentValue = filter.value;

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
            return (
                <Select
                    aria-label={`Select ${filterSchema.name}`}
                    placeholder="Select options"
                    selectionMode="multiple"
                    variant="bordered"
                    size="sm"
                    isMultiline={true}
                    selectedKeys={new Set(selectedValues)}
                    onSelectionChange={(keys) => {
                        const selected = Array.from(keys) as string[];
                        handleUpdateFilterValue(field.id, filter.filterKey, selected);
                    }}
                    classNames={{
                        base: "flex-1",
                        trigger: "bg-zinc-800/50 border-white/20 h-auto min-h-10 py-2",
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
            );
        }

        // Array type without predefined options - user can type custom values
        if (filterSchema.type === "array" && (!filterSchema.allowedValues || filterSchema.allowedValues.length === 0)) {
            const defaultValues = filterSchema.default && Array.isArray(filterSchema.default) ? filterSchema.default : [];
            const selectedValues = Array.isArray(currentValue) ? currentValue : defaultValues;
            return (
                <div className="flex-1 border border-white/20 bg-zinc-800/50 rounded-lg p-2 flex flex-wrap gap-1 items-center">
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

        // Boolean type - use Select
        if (filterSchema.type === "boolean") {
            const defaultValue = filterSchema.default !== undefined ? filterSchema.default : undefined;
            const displayValue = currentValue !== undefined ? currentValue : defaultValue;
            return (
                <Select
                    aria-label={filterSchema.name}
                    variant="bordered"
                    size="sm"
                    selectedKeys={displayValue !== undefined ? [String(displayValue)] : []}
                    onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        handleUpdateFilterValue(field.id, filter.filterKey, selected === "true");
                    }}
                    classNames={{
                        trigger: "bg-zinc-800/50 border-white/20 w-32 h-10",
                        popoverContent: "bg-zinc-900 border-white/10",
                    }}
                >
                    <SelectItem key="true">Yes</SelectItem>
                    <SelectItem key="false">No</SelectItem>
                </Select>
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
                                        };
                                        const tooltipContent = filterSchema?.tooltip || filterSchema?.description || "";

                                        return (
                                            <div key={filter.filterKey} className="flex flex-col gap-2">
                                                {/* Desktop: single row layout */}
                                                <div className="hidden sm:flex items-start gap-2">
                                                    <span className="text-sm text-zinc-400 whitespace-nowrap mt-2.5">where</span>
                                                    <Tooltip 
                                                        content={tooltipContent}
                                                        isDisabled={!tooltipContent}
                                                        placement="top"
                                                    >
                                                        <div className="flex items-start gap-1">
                                                            <Select
                                                                aria-label="Filter type"
                                                                variant="bordered"
                                                                size="sm"
                                                                isDisabled
                                                                selectedKeys={[filter.filterKey]}
                                                                classNames={{
                                                                    trigger: "bg-zinc-800/50 border-white/20 h-10 min-w-[200px]",
                                                                    popoverContent: "bg-zinc-900 border-white/10",
                                                                    innerWrapper: "truncate",
                                                                }}
                                                            >
                                                                <SelectItem 
                                                                    key={filter.filterKey}
                                                                    endContent={tooltipContent ? (
                                                                        <Tooltip content={tooltipContent} placement="right">
                                                                            <Info size={12} className="text-zinc-500" />
                                                                        </Tooltip>
                                                                    ) : null}
                                                                >
                                                                    {filterSchema?.name || filter.filterKey}
                                                                </SelectItem>
                                                            </Select>
                                                        </div>
                                                    </Tooltip>
                                                    <span className="text-sm text-zinc-400 mt-2.5">is</span>
                                                    <div className="flex-1 min-w-0">
                                                        {renderFilterValueInput(field, filter)}
                                                    </div>
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
                                                </div>

                                                {/* Mobile: two row layout */}
                                                <div className="flex sm:hidden flex-col gap-2">
                                                    {/* First row: where [filter] + delete button */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-zinc-400 whitespace-nowrap">where</span>
                                                        <Tooltip 
                                                            content={tooltipContent}
                                                            isDisabled={!tooltipContent}
                                                            placement="top"
                                                        >
                                                            <div className="flex-1">
                                                                <Select
                                                                    aria-label="Filter type"
                                                                    variant="bordered"
                                                                    size="sm"
                                                                    isDisabled
                                                                    selectedKeys={[filter.filterKey]}
                                                                    classNames={{
                                                                        trigger: "bg-zinc-800/50 border-white/20 h-10 w-full",
                                                                        popoverContent: "bg-zinc-900 border-white/10",
                                                                        innerWrapper: "truncate",
                                                                    }}
                                                                >
                                                                    <SelectItem 
                                                                        key={filter.filterKey}
                                                                        endContent={tooltipContent ? (
                                                                            <Tooltip content={tooltipContent} placement="right">
                                                                                <Info size={12} className="text-zinc-500" />
                                                                            </Tooltip>
                                                                        ) : null}
                                                                    >
                                                                        {filterSchema?.name || filter.filterKey}
                                                                    </SelectItem>
                                                                </Select>
                                                            </div>
                                                        </Tooltip>
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
