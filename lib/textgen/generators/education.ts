import { GeneratorContext, GeneratorResult, getFilterValue, randomElement } from "./utils";

const defaultLevels = ["High School", "Associate", "Bachelor", "Master", "PhD", "Diploma"];

export async function generateEducation(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const levels = getFilterValue<string[]>(filters, 'levels', defaultLevels);
    
    // Pick a random education level from available options
    const level = randomElement(levels.length > 0 ? levels : defaultLevels);
    
    return { value: level };
}
