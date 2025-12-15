import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { DatePicker } from "@heroui/date-picker";
import { Switch } from "@heroui/switch";
import { parseDate } from "@internationalized/date";

interface FilterInputProps {
    filterSchema: any;
    currentValue: any;
    isRequired: boolean;
    minItems: number;
    onValueChange: (value: any) => void;
    onRemoveChip: (chipValue: string) => void;
    onAddChip: (chipValue: string) => void;
}

// Parse date string (dd/mm/yyyy) to date object
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

// Format date object to dd/mm/yyyy string
const formatDate = (val: any): string => {
    if (!val) return "";
    return `${String(val.day).padStart(2, '0')}/${String(val.month).padStart(2, '0')}/${val.year}`;
};

export function RangeInput({ filterSchema, currentValue, isRequired, onValueChange }: FilterInputProps) {
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
                    onValueChange({ ...rangeValue, min: clampedMin });
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
                    onValueChange({ ...rangeValue, max: clampedMax });
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

export function DateRangeInput({ filterSchema, currentValue, isRequired, onValueChange }: FilterInputProps) {
    const dateRangeValue = (currentValue && typeof currentValue === "object" && !Array.isArray(currentValue))
        ? currentValue as { min: string; max: string }
        : { min: "", max: "" };

    return (
        <div className="inline-flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <DatePicker
                aria-label={`${filterSchema.name} from`}
                variant="bordered"
                size="sm"
                showMonthAndYearPickers
                isRequired={isRequired}
                value={parseDateValue(dateRangeValue.min)}
                onChange={(val) => onValueChange({ ...dateRangeValue, min: formatDate(val) })}
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
                value={parseDateValue(dateRangeValue.max)}
                onChange={(val) => onValueChange({ ...dateRangeValue, max: formatDate(val) })}
                classNames={{
                    base: "w-auto",
                    inputWrapper: "bg-zinc-800/50 border-white/20 w-36 h-10",
                }}
            />
        </div>
    );
}

export function DateInput({ filterSchema, currentValue, isRequired, onValueChange }: FilterInputProps) {
    return (
        <DatePicker
            aria-label={filterSchema.name}
            variant="bordered"
            size="sm"
            showMonthAndYearPickers
            isRequired={isRequired}
            value={parseDateValue(currentValue)}
            onChange={(val) => onValueChange(val ? formatDate(val) : "")}
            classNames={{
                inputWrapper: "bg-zinc-800/50 border-white/20 w-40 h-10",
            }}
        />
    );
}

export function MultiSelectInput({ filterSchema, currentValue, isRequired, minItems, onValueChange, onRemoveChip }: FilterInputProps) {
    const defaultValues = filterSchema.default && Array.isArray(filterSchema.default) ? filterSchema.default : [];
    const selectedValues = Array.isArray(currentValue) ? currentValue : defaultValues;
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
                onSelectionChange={(keys) => onValueChange(Array.from(keys) as string[])}
                classNames={{
                    base: "flex-1",
                    trigger: `bg-zinc-800/50 ${hasMinItemsError ? 'border-danger' : 'border-white/20'} h-auto min-h-10 py-2`,
                    popoverContent: "bg-zinc-900 border-white/10",
                }}
                renderValue={(items) => (
                    <div className="flex flex-wrap gap-1">
                        {Array.from(items).map((item) => (
                            <Chip key={item.key} size="sm" variant="flat" onClose={() => onRemoveChip(item.key as string)}>
                                {item.textValue}
                            </Chip>
                        ))}
                    </div>
                )}
            >
                {filterSchema.allowedValues.map((option: string) => (
                    <SelectItem key={option}>{option}</SelectItem>
                ))}
            </Select>
        </div>
    );
}

export function SingleSelectInput({ filterSchema, currentValue, isRequired, onValueChange }: FilterInputProps) {
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
            onSelectionChange={(keys) => onValueChange(Array.from(keys)[0] as string || "")}
            classNames={{
                base: "w-auto min-w-[150px]",
                trigger: "bg-zinc-800/50 border-white/20 h-10",
                popoverContent: "bg-zinc-900 border-white/10",
            }}
        >
            {filterSchema.allowedValues.map((option: string) => (
                <SelectItem key={option}>{option}</SelectItem>
            ))}
        </Select>
    );
}

export function ChipArrayInput({ filterSchema, currentValue, isRequired, minItems, onRemoveChip, onAddChip }: FilterInputProps) {
    const defaultValues = filterSchema.default && Array.isArray(filterSchema.default) ? filterSchema.default : [];
    const selectedValues = Array.isArray(currentValue) ? currentValue : defaultValues;
    const hasMinItemsError = minItems > 0 && selectedValues.length < minItems;
    
    return (
        <div className="flex-1 flex flex-col gap-1">
            <div className={`flex-1 border ${hasMinItemsError ? 'border-danger' : 'border-white/20'} bg-zinc-800/50 rounded-lg p-2 flex flex-wrap gap-1 items-center`}>
                {selectedValues.map((val: string) => (
                    <Chip key={val} size="sm" variant="flat" onClose={() => onRemoveChip(val)}>
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
                            onAddChip(input.value);
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

export function IntegerInput({ filterSchema, currentValue, isRequired, onValueChange }: FilterInputProps) {
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
            onValueChange={(val) => onValueChange(parseInt(val) || 0)}
            classNames={{
                inputWrapper: "bg-zinc-800/50 border-white/20 w-32 h-10",
            }}
        />
    );
}

export function BooleanInput({ filterSchema, currentValue, onValueChange }: FilterInputProps) {
    const defaultValue = filterSchema.default !== undefined ? filterSchema.default : false;
    const displayValue = currentValue !== undefined ? Boolean(currentValue) : defaultValue;
    
    return (
        <div className="flex items-center h-10">
            <Switch
                aria-label={filterSchema.name}
                size="sm"
                color="success"
                isSelected={displayValue}
                onValueChange={onValueChange}
                classNames={{ wrapper: "bg-zinc-700" }}
            />
        </div>
    );
}

export function TextInput({ filterSchema, currentValue, isRequired, onValueChange }: FilterInputProps) {
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
            onValueChange={onValueChange}
            classNames={{
                inputWrapper: "bg-zinc-800/50 border-white/20 flex-1 min-w-[150px] h-10",
            }}
        />
    );
}
