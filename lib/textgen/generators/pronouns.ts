import { GeneratorContext, GeneratorResult, getFilterValue, randomElement } from "./utils";

const defaultPronouns = ["he/him", "she/her", "they/them", "he/they", "she/they", "any"];

export async function generatePronouns(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const options = getFilterValue<string[]>(filters, 'options', defaultPronouns);
    
    // Pick a random pronoun from available options
    const pronoun = randomElement(options.length > 0 ? options : defaultPronouns);
    
    return { value: pronoun };
}
