import { createElement } from "react";
import { Select, SelectItem } from "@heroui/select";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Tooltip } from "@heroui/tooltip";
import { Info } from "lucide-react";
import { TemplateField, FieldFilters } from "../../types";
import FilterRow from "./FilterRow";
import { getFilterSchemaForField } from "./utils";

interface FieldFiltersCardProps {
    field: TemplateField;
    existingFilters: { filterKey: string; value: any }[];
    availableFilters: [string, any][];
    isFilterRequired: (filterKey: string) => boolean;
    getFilterMinItems: (filterKey: string) => number;
    onAddFilter: (filterKey: string) => void;
    onRemoveFilter: (filterKey: string) => void;
    onUpdateFilterValue: (filterKey: string, value: any) => void;
    onRemoveChip: (filterKey: string, chipValue: string) => void;
    onAddChip: (filterKey: string, chipValue: string) => void;
}

export default function FieldFiltersCard({
    field,
    existingFilters,
    availableFilters,
    isFilterRequired,
    getFilterMinItems,
    onAddFilter,
    onRemoveFilter,
    onUpdateFilterValue,
    onRemoveChip,
    onAddChip,
}: FieldFiltersCardProps) {
    const schema = getFilterSchemaForField(field);
    const hasFiltersAvailable = Object.keys(schema).length > 0;

    return (
        <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-4 rounded-lg">
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
                    {existingFilters.map((filter) => {
                        const filterSchema = schema[filter.filterKey];
                        const isRequired = isFilterRequired(filter.filterKey);
                        const minItems = getFilterMinItems(filter.filterKey);

                        return (
                            <FilterRow
                                key={filter.filterKey}
                                field={field}
                                filter={filter}
                                filterSchema={filterSchema}
                                allFilters={existingFilters}
                                fullSchema={schema}
                                isRequired={isRequired}
                                minItems={minItems}
                                onValueChange={(value) => onUpdateFilterValue(filter.filterKey, value)}
                                onRemove={() => onRemoveFilter(filter.filterKey)}
                                onRemoveChip={(chipValue) => onRemoveChip(filter.filterKey, chipValue)}
                                onAddChip={(chipValue) => onAddChip(filter.filterKey, chipValue)}
                            />
                        );
                    })}

                    {/* Add new filter dropdown */}
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
                                    if (selected) onAddFilter(selected);
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
}
