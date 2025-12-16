import { GeneratorContext, GeneratorResult, getFilterValue, randomInt } from "./utils";

export async function generateWeight(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const unit = getFilterValue<string>(filters, 'unit', 'kg');
    const weightRange = getFilterValue<{ min: number; max: number }>(filters, 'weightRange', { min: 50, max: 100 });
    
    // Generate random weight in the specified range
    const weightValue = randomInt(weightRange.min, weightRange.max);
    
    // Format based on unit
    const displayValue = unit === 'lbs' ? `${weightValue} lbs` : `${weightValue} kg`;
    
    return { 
        value: weightValue,
        displayValue 
    };
}
