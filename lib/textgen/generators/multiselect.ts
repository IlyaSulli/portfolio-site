import { GeneratorContext, GeneratorResult, getFilterValue, randomElements, randomInt } from "./utils";

export async function generateMultiselect(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const options = getFilterValue<string[]>(filters, 'options', []);
    const selectionsRange = getFilterValue<{ min: number; max: number }>(filters, 'selections', { min: 1, max: 5 });
    
    if (options.length === 0) {
        return { 
            value: [], 
            displayValue: '(No options configured)' 
        };
    }
    
    // Determine how many to select
    const maxSelections = Math.min(selectionsRange.max, options.length);
    const minSelections = Math.min(selectionsRange.min, maxSelections);
    const count = randomInt(minSelections, maxSelections);
    
    // Select random options
    const selected = randomElements(options, count);
    
    return { 
        value: selected,
        displayValue: selected.join(', ')
    };
}
