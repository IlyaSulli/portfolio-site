import { GeneratorContext, GeneratorResult, getFilterValue, randomInt } from "./utils";

export async function generateDob(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const dateRange = getFilterValue<{ min: string; max: string }>(filters, 'dateRange', { 
        min: '1940-01-01', 
        max: '2010-01-01' 
    });
    
    // Parse dates
    const minDate = new Date(dateRange.min);
    const maxDate = new Date(dateRange.max);
    
    // Generate random timestamp between min and max
    const minTime = minDate.getTime();
    const maxTime = maxDate.getTime();
    const randomTime = minTime + Math.random() * (maxTime - minTime);
    
    const randomDate = new Date(randomTime);
    
    // Format as YYYY-MM-DD
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');
    
    const dateString = `${year}-${month}-${day}`;
    
    // Calculate age for display
    const today = new Date();
    const age = today.getFullYear() - year;
    
    return { 
        value: dateString,
        displayValue: `${month}/${day}/${year} (${age}y)`
    };
}
