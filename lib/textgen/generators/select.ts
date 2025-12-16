import { GeneratorContext, GeneratorResult, getFilterValue, randomElement } from "./utils";

export async function generateSelect(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const options = getFilterValue<string[]>(filters, 'options', []);
    
    if (options.length === 0) {
        return { value: '', displayValue: '(No options configured)' };
    }
    
    // Pick a random option
    const selected = randomElement(options);
    
    return { value: selected };
}
