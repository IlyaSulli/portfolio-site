import { createElement } from "react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { X, Info } from "lucide-react";
import { TemplateField, FilterValue } from "../../types";
import {
    RangeInput,
    DateRangeInput,
    DateInput,
    MultiSelectInput,
    SingleSelectInput,
    ChipArrayInput,
    IntegerInput,
    BooleanInput,
    TextInput,
} from "./FilterInputs";

interface FilterRowProps {
    field: TemplateField;
    filter: FilterValue;
    filterSchema: any;
    isRequired: boolean;
    minItems: number;
    onValueChange: (value: any) => void;
    onRemove: () => void;
    onRemoveChip: (chipValue: string) => void;
    onAddChip: (chipValue: string) => void;
}

function FilterValueInput({ 
    filterSchema, 
    currentValue, 
    isRequired, 
    minItems,
    onValueChange, 
    onRemoveChip, 
    onAddChip 
}: {
    filterSchema: any;
    currentValue: any;
    isRequired: boolean;
    minItems: number;
    onValueChange: (value: any) => void;
    onRemoveChip: (chipValue: string) => void;
    onAddChip: (chipValue: string) => void;
}) {
    if (!filterSchema) return null;

    const commonProps = {
        filterSchema,
        currentValue,
        isRequired,
        minItems,
        onValueChange,
        onRemoveChip,
        onAddChip,
    };

    const { type, allowedValues } = filterSchema;

    if (type === "range") return <RangeInput {...commonProps} />;
    if (type === "dateRange") return <DateRangeInput {...commonProps} />;
    if (type === "date") return <DateInput {...commonProps} />;
    if (type === "array" && allowedValues?.length > 0) return <MultiSelectInput {...commonProps} />;
    if (type === "select" && allowedValues?.length > 0) return <SingleSelectInput {...commonProps} />;
    if (type === "array") return <ChipArrayInput {...commonProps} />;
    if (type === "integer") return <IntegerInput {...commonProps} />;
    if (type === "boolean") return <BooleanInput {...commonProps} />;
    
    return <TextInput {...commonProps} />;
}

function FilterLabel({ filterSchema, filterKey, isRequired, tooltipContent }: {
    filterSchema: any;
    filterKey: string;
    isRequired: boolean;
    tooltipContent: string;
}) {
    return (
        <Tooltip content={tooltipContent} isDisabled={!tooltipContent} placement="top">
            <div className={`flex items-center gap-1 px-3 py-2 rounded-lg border bg-zinc-800/50 h-10 min-w-[220px] sm:min-w-[220px] w-full sm:w-auto ${
                isRequired ? 'border-amber-500/50' : 'border-white/20'
            }`}>
                <span className="text-sm truncate">
                    {filterSchema?.name || filterKey}
                </span>
                {isRequired && <span className="text-amber-500">*</span>}
                {tooltipContent && <Info size={12} className="text-zinc-500 ml-auto flex-shrink-0" />}
            </div>
        </Tooltip>
    );
}

export default function FilterRow({
    field,
    filter,
    filterSchema,
    isRequired,
    minItems,
    onValueChange,
    onRemove,
    onRemoveChip,
    onAddChip,
}: FilterRowProps) {
    const tooltipContent = filterSchema?.tooltip || filterSchema?.description || "";

    const RemoveButton = () => !isRequired ? (
        <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-danger"
            onPress={onRemove}
            aria-label="Remove filter"
        >
            <X size={16} />
        </Button>
    ) : null;

    return (
        <div className="flex flex-col gap-2">
            {/* Desktop layout */}
            <div className="hidden sm:flex items-start gap-2">
                <span className="text-sm text-zinc-400 whitespace-nowrap mt-2.5">where</span>
                <FilterLabel 
                    filterSchema={filterSchema} 
                    filterKey={filter.filterKey} 
                    isRequired={isRequired} 
                    tooltipContent={tooltipContent} 
                />
                <span className="text-sm text-zinc-400 mt-2.5">is</span>
                <div className="flex-1 min-w-0">
                    <FilterValueInput
                        filterSchema={filterSchema}
                        currentValue={filter.value}
                        isRequired={isRequired}
                        minItems={minItems}
                        onValueChange={onValueChange}
                        onRemoveChip={onRemoveChip}
                        onAddChip={onAddChip}
                    />
                </div>
                <div className="mt-2">
                    <RemoveButton />
                </div>
            </div>

            {/* Mobile layout */}
            <div className="flex sm:hidden flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-400 whitespace-nowrap">where</span>
                    <div className="flex-1">
                        <FilterLabel 
                            filterSchema={filterSchema} 
                            filterKey={filter.filterKey} 
                            isRequired={isRequired} 
                            tooltipContent={tooltipContent} 
                        />
                    </div>
                    <RemoveButton />
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-sm text-zinc-400 whitespace-nowrap mt-2.5">is</span>
                    <div className="flex-1 min-w-0">
                        <FilterValueInput
                            filterSchema={filterSchema}
                            currentValue={filter.value}
                            isRequired={isRequired}
                            minItems={minItems}
                            onValueChange={onValueChange}
                            onRemoveChip={onRemoveChip}
                            onAddChip={onAddChip}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
