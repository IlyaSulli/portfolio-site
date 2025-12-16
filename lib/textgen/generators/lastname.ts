import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, randomInt } from "./utils";

// Will be loaded from JSON
let surnamesData: Record<string, string[]> | null = null;

// Mapping from TextGenField nationality names to dataset nationality names
const nationalityMapping: Record<string, string> = {
    "English": "English",
    "Russian": "Russian",
    "Arabic": "Arabic",
    "Japanese": "Japanese",
    "Italian": "Italian",
    "German": "German",
    "Czech": "Czech",
    "Spanish": "Spanish",
    "Dutch": "Dutch",
    "French": "French",
    "Chinese": "Chinese",
    "Irish": "Irish",
    "Greek": "Greek",
    "Korean": "Korean",
    "Scotish": "Scottish", // Note: typo in original config
    "Polish": "Polish",
    "Portuguese": "Portuguese",
    "Vietnamese": "Vietnamese"
};

export async function loadSurnamesData(): Promise<Record<string, string[]>> {
    if (surnamesData) return surnamesData;
    
    try {
        const response = await fetch('/resources/tool/textgen/datasets/surnames.json');
        surnamesData = await response.json();
        return surnamesData!;
    } catch (error) {
        console.error('Failed to load surnames data:', error);
        // Fallback data
        return {
            English: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
        };
    }
}

export async function generateLastname(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const nationalities = getFilterValue<string[]>(filters, 'nationality', ['English']);
    const lengthRange = getFilterValue<{ min: number; max: number }>(filters, 'length', { min: 2, max: 12 });
    
    const data = await loadSurnamesData();
    
    // Collect all names from selected nationalities
    let availableNames: string[] = [];
    for (const nationality of nationalities) {
        const mappedNationality = nationalityMapping[nationality] || nationality;
        if (data[mappedNationality]) {
            availableNames = availableNames.concat(data[mappedNationality]);
        }
    }
    
    // If no names found, use English as fallback
    if (availableNames.length === 0 && data['English']) {
        availableNames = data['English'];
    }
    
    // Filter by length
    const filteredNames = availableNames.filter(
        name => name.length >= lengthRange.min && name.length <= lengthRange.max
    );
    
    // If we have matching names, pick one randomly
    if (filteredNames.length > 0) {
        return { value: randomElement(filteredNames) };
    }
    
    // Fallback to any name from the pool if length filter is too restrictive
    if (availableNames.length > 0) {
        return { value: randomElement(availableNames) };
    }
    
    // Ultimate fallback
    return { value: "Smith" };
}
