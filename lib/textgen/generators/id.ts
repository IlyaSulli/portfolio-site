import { GeneratorContext, GeneratorResult, getFilterValue, generateUUID, randomInt } from "./utils";

export async function generateId(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const format = getFilterValue<string>(filters, 'format', 'UUID');
    
    let idValue: string;
    
    switch (format) {
        case 'UUID':
            idValue = generateUUID();
            break;
            
        case 'Numeric': {
            // Generate 10-digit numeric ID
            idValue = '';
            for (let i = 0; i < 10; i++) {
                idValue += randomInt(0, 9).toString();
            }
            break;
        }
            
        case 'Alphanumeric': {
            // Generate 12-character alphanumeric ID
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            idValue = '';
            for (let i = 0; i < 12; i++) {
                idValue += chars[Math.floor(Math.random() * chars.length)];
            }
            break;
        }
            
        default:
            idValue = generateUUID();
    }
    
    return { value: idValue };
}
