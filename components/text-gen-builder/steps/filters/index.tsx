import { ScrollShadow } from "@heroui/scroll-shadow";
import { Template, FieldFilters } from "../../types";
import FieldFiltersCard from "./FieldFiltersCard";
import { useFiltersManager } from "./useFiltersManager";

// Re-export validation function for external use
export { validateRequiredFilters } from "./utils";

interface StepFiltersProps {
    template: Template;
    onFiltersChange?: (filters: FieldFilters) => void;
}

export default function StepFilters({ template, onFiltersChange }: StepFiltersProps) {
    const fieldFilters = template.filters || {};

    const updateFilters = (newFilters: FieldFilters) => {
        if (onFiltersChange) {
            onFiltersChange(newFilters);
        }
    };

    const {
        getAvailableFilters,
        isFilterRequired,
        getFilterMinItems,
        handleAddFilter,
        handleRemoveFilter,
        handleUpdateFilterValue,
        handleAddChip,
        handleRemoveChip,
    } = useFiltersManager(template.fields, fieldFilters, updateFilters);

    return (
        <div className="mt-8 flex flex-col w-full gap-4 h-[500px]">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 px-2">
                Configure filters for each field in your template. Filters help refine the generated data.
            </p>
            
            <ScrollShadow className="flex-1" hideScrollBar={false} size={60}>
                <div className="flex flex-col gap-4 pr-3">
                    {template.fields.length === 0 ? (
                        <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-6 rounded-lg min-h-[300px] flex items-center justify-center">
                            <span className="text-zinc-500 dark:text-zinc-400">
                                No fields to configure. Go back and add some fields first.
                            </span>
                        </div>
                    ) : (
                        template.fields.map((field) => (
                            <FieldFiltersCard
                                key={field.id}
                                field={field}
                                existingFilters={fieldFilters[field.id] || []}
                                availableFilters={getAvailableFilters(field)}
                                isFilterRequired={(filterKey) => isFilterRequired(field, filterKey)}
                                getFilterMinItems={(filterKey) => getFilterMinItems(field, filterKey)}
                                onAddFilter={(filterKey) => handleAddFilter(field.id, filterKey)}
                                onRemoveFilter={(filterKey) => handleRemoveFilter(field.id, filterKey)}
                                onUpdateFilterValue={(filterKey, value) => handleUpdateFilterValue(field.id, filterKey, value)}
                                onRemoveChip={(filterKey, chipValue) => handleRemoveChip(field.id, filterKey, chipValue)}
                                onAddChip={(filterKey, chipValue) => handleAddChip(field.id, filterKey, chipValue)}
                            />
                        ))
                    )}
                </div>
            </ScrollShadow>
        </div>
    );
}
