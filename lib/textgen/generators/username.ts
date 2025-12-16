import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, randomInt, loadDataset, generateHiddenName } from "./utils";

// Gaming word pools - nouns/creatures
const gamingNouns = ["Shadow", "Wolf", "Raven", "Ghost", "Dragon", "Phoenix", "Viper", "Hawk", "Tiger", "Panther", "Cobra", "Falcon", "Reaper", "Ninja", "Knight", "Warrior", "Hunter", "Slayer", "Demon", "Angel"];
const gamingSuffixes = ["Slayer", "Hunter", "Master", "Lord", "King", "Knight", "Ninja", "Warrior", "Reaper", "Blade", "Sniper", "Legend", "Pro", "Beast", "God", "Hawk", "Phoenix", "Viper"];
const gamingDecorators = ["xX", "Xx", "420", "69", "360", "MLG", "Pro", "Elite", "Epic", "Boss"];

// Adjectives loaded from dataset (fallback if loading fails)
let adjectives: string[] = [];

async function getAdjectives(): Promise<string[]> {
    if (adjectives.length === 0) {
        try {
            adjectives = await loadDataset<string[]>('adjectives.json');
        } catch {
            // Fallback adjectives if dataset fails to load
            adjectives = ["swift", "dark", "silent", "brave", "wild", "fierce", "cool", "epic", "mighty", "clever"];
        }
    }
    return adjectives;
}

function applyCharacterFilters(username: string, allowedChars: string[]): string {
    let result = username.toLowerCase();
    
    // Always start with lowercase by default
    if (!allowedChars.includes("Lowercase (abc)")) {
        result = result.toUpperCase();
    }
    
    if (!allowedChars.includes("Uppercase (ABC)")) {
        result = result.toLowerCase();
    }
    
    if (!allowedChars.includes("Numbers (123)")) {
        result = result.replace(/[0-9]/g, '');
    }
    
    if (!allowedChars.includes("Underscores (_)")) {
        result = result.replace(/_/g, '');
    }
    
    if (!allowedChars.includes("Hyphens (-)")) {
        result = result.replace(/-/g, '');
    }
    
    if (!allowedChars.includes("Dots (.)")) {
        result = result.replace(/\./g, '');
    }
    
    return result;
}

function truncateToLength(str: string, maxLength: number): string {
    return str.slice(0, maxLength);
}

export async function generateUsername(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    const adjectiveList = await getAdjectives();
    
    // Get filter values
    const types = getFilterValue<string[]>(filters, 'type', ['Gaming', 'Work', 'Social Media']);
    const lengthRange = getFilterValue<{ min: number; max: number }>(filters, 'length', { min: 3, max: 15 });
    const allowedChars = getFilterValue<string[]>(filters, 'allowedChar', ['Lowercase (abc)', 'Numbers (123)']);
    
    // Pick a random type from allowed types
    const type = randomElement(types);
    
    let username = '';
    const targetLength = randomInt(lengthRange.min, lengthRange.max);
    
    // Get names from context, or generate hidden ones for consistency
    const firstName = context.generatedFields['firstname'] as string || await generateHiddenName('first');
    const lastName = context.generatedFields['lastname'] as string || await generateHiddenName('last');
    
    // Helper to pick a good adjective (shorter ones for usernames)
    const pickAdjective = () => {
        const shortAdj = adjectiveList.filter(a => a.length <= 8);
        return randomElement(shortAdj.length > 0 ? shortAdj : adjectiveList);
    };
    
    switch (type) {
        case 'Social Media': {
            // Variations: name + numbers, name_name, _name, name.name, adj_name
            const variations = [
                () => firstName.toLowerCase() + randomInt(1, 999),
                () => firstName.toLowerCase() + '_' + randomInt(10, 99),
                () => '_' + firstName.toLowerCase(),
                () => firstName.toLowerCase() + '.' + lastName.toLowerCase().slice(0, 1),
                () => firstName.toLowerCase() + lastName.toLowerCase().slice(0, 2) + randomInt(1, 99),
                () => pickAdjective() + '_' + firstName.toLowerCase(),
                () => firstName.toLowerCase() + '.' + lastName.toLowerCase(),
            ];
            username = randomElement(variations)();
            break;
        }
        
        case 'Work': {
            // Professional formats: first.last, flast, firstlast - no adjectives
            const variations = [
                () => firstName.toLowerCase() + '.' + lastName.toLowerCase(),
                () => firstName.toLowerCase().slice(0, 1) + lastName.toLowerCase(),
                () => firstName.toLowerCase() + lastName.toLowerCase().slice(0, 1),
                () => firstName.toLowerCase() + '_' + lastName.toLowerCase(),
                () => firstName.toLowerCase() + lastName.toLowerCase(),
                () => lastName.toLowerCase() + '.' + firstName.toLowerCase(),
                () => lastName.toLowerCase() + firstName.toLowerCase().slice(0, 1),
            ];
            username = randomElement(variations)();
            break;
        }
        
        case 'Gaming':
        default: {
            // Gaming: adj + noun, xX_name_Xx, noun + numbers, adj + suffix
            const adj = pickAdjective();
            const capAdj = adj.charAt(0).toUpperCase() + adj.slice(1);
            
            const variations = [
                () => capAdj + randomElement(gamingNouns) + randomInt(1, 999),
                () => 'xX_' + capAdj + randomElement(gamingNouns) + '_Xx',
                () => randomElement(gamingNouns) + randomInt(100, 9999),
                () => capAdj + randomElement(gamingSuffixes),
                () => randomElement(gamingNouns) + '_' + randomInt(1, 99),
                () => randomElement(gamingDecorators) + capAdj + randomElement(gamingNouns),
                () => capAdj + randomElement(gamingNouns) + randomElement(gamingDecorators),
            ];
            username = randomElement(variations)();
            break;
        }
    }
    
    // Apply character filters
    username = applyCharacterFilters(username, allowedChars);
    
    // Ensure within length bounds
    if (username.length > lengthRange.max) {
        username = truncateToLength(username, lengthRange.max);
    }
    
    // If too short, pad with numbers
    while (username.length < lengthRange.min && allowedChars.includes("Numbers (123)")) {
        username += randomInt(0, 9);
    }
    
    return { value: username };
}
