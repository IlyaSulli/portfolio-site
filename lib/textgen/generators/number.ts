import { GeneratorContext, GeneratorResult, getFilterValue, randomInt } from "./utils";

export async function generateNumber(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const valueRange = getFilterValue<{ min: number; max: number }>(filters, 'valueRange', { min: 0, max: 100 });
    const decimalPlaces = getFilterValue<number>(filters, 'decimalPlaces', 0);
    
    // Generate random number
    let value: number;
    
    if (decimalPlaces === 0) {
        value = randomInt(valueRange.min, valueRange.max);
    } else {
        // Generate with decimal places
        const range = valueRange.max - valueRange.min;
        value = valueRange.min + (Math.random() * range);
        value = parseFloat(value.toFixed(decimalPlaces));
    }
    
    return { 
        value,
        displayValue: decimalPlaces > 0 ? value.toFixed(decimalPlaces) : value.toString()
    };
}
