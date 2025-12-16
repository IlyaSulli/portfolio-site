import { GeneratorContext, GeneratorResult, getFilterValue, randomInt } from "./utils";

export async function generatePassword(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const lengthRange = getFilterValue<{ min: number; max: number }>(filters, 'length', { min: 8, max: 20 });
    const allowedChars = getFilterValue<string[]>(filters, 'allowedChar', ['Lowercase (abc)', 'Uppercase (ABC)', 'Numbers (123)', 'Special ($@!)']);
    
    // Build character pool based on allowed characters
    let charPool = '';
    
    if (allowedChars.includes('Lowercase (abc)')) {
        charPool += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (allowedChars.includes('Uppercase (ABC)')) {
        charPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (allowedChars.includes('Numbers (123)')) {
        charPool += '0123456789';
    }
    if (allowedChars.includes('Special ($@!)')) {
        charPool += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
    
    // Fallback if no characters selected
    if (charPool.length === 0) {
        charPool = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }
    
    // Generate password with random length
    const length = randomInt(lengthRange.min, lengthRange.max);
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += charPool[Math.floor(Math.random() * charPool.length)];
    }
    
    // Ensure at least one character from each selected category for better passwords
    if (password.length >= 4) {
        const ensureChars: string[] = [];
        if (allowedChars.includes('Lowercase (abc)')) ensureChars.push('abcdefghijklmnopqrstuvwxyz'[randomInt(0, 25)]);
        if (allowedChars.includes('Uppercase (ABC)')) ensureChars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'[randomInt(0, 25)]);
        if (allowedChars.includes('Numbers (123)')) ensureChars.push('0123456789'[randomInt(0, 9)]);
        if (allowedChars.includes('Special ($@!)')) ensureChars.push('!@#$%^&*'[randomInt(0, 7)]);
        
        // Replace random positions with ensured characters
        const passArray = password.split('');
        for (let i = 0; i < ensureChars.length && i < passArray.length; i++) {
            const pos = randomInt(0, passArray.length - 1);
            passArray[pos] = ensureChars[i];
        }
        password = passArray.join('');
    }
    
    return { value: password };
}
