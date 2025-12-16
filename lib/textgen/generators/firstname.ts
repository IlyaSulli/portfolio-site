import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, randomInt } from "./utils";

// Will be loaded from JSON
let firstnamesData: Record<string, string[]> | null = null;

export async function loadFirstnamesData(): Promise<Record<string, string[]>> {
    if (firstnamesData) return firstnamesData;
    
    try {
        const response = await fetch('/resources/tool/textgen/datasets/firstnames.json');
        firstnamesData = await response.json();
        return firstnamesData!;
    } catch (error) {
        console.error('Failed to load firstnames data:', error);
        // Fallback data
        return {
            Male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"],
            Female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"],
            Unisex: ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Quinn", "Avery", "Peyton", "Cameron"]
        };
    }
}

// Generate random syllable-based name as fallback
function generateSyllableName(length: number): string {
    const consonants = 'bcdfghjklmnprstvwz';
    const vowels = 'aeiou';
    let name = '';
    
    // Start with consonant or vowel
    const startWithConsonant = Math.random() > 0.3;
    
    while (name.length < length) {
        if ((name.length % 2 === 0) === startWithConsonant) {
            name += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
            name += vowels[Math.floor(Math.random() * vowels.length)];
        }
    }
    
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export async function generateFirstname(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const genders = getFilterValue<string[]>(filters, 'gender', ['Male', 'Female', 'Unisex']);
    const lengthRange = getFilterValue<{ min: number; max: number }>(filters, 'length', { min: 2, max: 10 });
    
    const data = await loadFirstnamesData();
    
    // Collect all names from selected genders
    let availableNames: string[] = [];
    for (const gender of genders) {
        if (data[gender]) {
            availableNames = availableNames.concat(data[gender]);
        }
    }
    
    // Filter by length
    const filteredNames = availableNames.filter(
        name => name.length >= lengthRange.min && name.length <= lengthRange.max
    );
    
    // If we have matching names, pick one randomly
    if (filteredNames.length > 0) {
        return { value: randomElement(filteredNames) };
    }
    
    // Fallback: generate syllable-based name
    const targetLength = randomInt(lengthRange.min, lengthRange.max);
    return { value: generateSyllableName(targetLength) };
}
