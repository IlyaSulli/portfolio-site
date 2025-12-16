import { GeneratorContext, GeneratorResult } from "./utils";

export async function generateToggle(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    // Simple random true/false
    const value = Math.random() > 0.5;
    
    return { 
        value,
        displayValue: value ? 'Yes' : 'No'
    };
}
