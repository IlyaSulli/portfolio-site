import { GeneratorContext, GeneratorResult, getFilterValue, randomElements, randomInt } from "./utils";

// Will be loaded from JSON
let hobbiesData: string[] | null = null;

export async function loadHobbiesData(): Promise<string[]> {
    if (hobbiesData) return hobbiesData;
    
    try {
        const response = await fetch('/resources/tool/textgen/datasets/hobbies.json');
        hobbiesData = await response.json();
        return hobbiesData!;
    } catch (error) {
        console.error('Failed to load hobbies data:', error);
        // Fallback data
        return [
            "Reading", "Gaming", "Cooking", "Photography", "Hiking", 
            "Swimming", "Painting", "Music", "Dancing", "Writing",
            "Cycling", "Yoga", "Gardening", "Fishing", "Traveling"
        ];
    }
}

export async function generateHobby(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const quantityRange = getFilterValue<{ min: number; max: number }>(filters, 'quantity', { min: 1, max: 5 });
    
    const data = await loadHobbiesData();
    
    // Generate random quantity within range
    const quantity = randomInt(quantityRange.min, quantityRange.max);
    
    // Pick random hobbies
    const selectedHobbies = randomElements(data, Math.min(quantity, data.length));
    
    return { 
        value: selectedHobbies,
        displayValue: selectedHobbies.join(', ')
    };
}
