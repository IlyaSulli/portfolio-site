import { GeneratorContext, GeneratorResult, getFilterValue, randomInt } from "./utils";

export async function generateHeight(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const unit = getFilterValue<string>(filters, 'unit', 'cm');
    const heightRange = getFilterValue<{ min: number; max: number }>(filters, 'heightRange', { min: 150, max: 200 });
    
    // Generate random height in the specified range
    const heightValue = randomInt(heightRange.min, heightRange.max);
    
    // Format based on unit
    let displayValue: string;
    if (unit === 'inches') {
        const feet = Math.floor(heightValue / 12);
        const inches = heightValue % 12;
        displayValue = `${feet}'${inches}"`;
    } else {
        displayValue = `${heightValue} cm`;
    }
    
    return { 
        value: heightValue,
        displayValue 
    };
}
