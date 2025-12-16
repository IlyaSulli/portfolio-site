import { FilterValue } from "@/components/text-gen-builder/types";

export interface GeneratorContext {
    generatedFields: Record<string, any>;
    fieldFilters: Record<string, FilterValue[]>;
}

export interface GeneratorResult {
    value: any;
    displayValue?: string;
}

export function getFilterValue<T>(
    filters: FilterValue[] | undefined, 
    filterKey: string, 
    defaultValue: T
): T {
    if (!filters) return defaultValue;
    const filter = filters.find(f => f.filterKey === filterKey);
    return (filter?.value as T) ?? defaultValue;
}

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Dataset loading utility
export async function loadDataset<T>(filename: string): Promise<T> {
    const response = await fetch(`/resources/tool/textgen/datasets/${filename}`);
    if (!response.ok) {
        throw new Error(`Failed to load dataset: ${filename}`);
    }
    return response.json();
}

// Cached datasets for hidden name generation
let cachedFirstnames: Record<string, string[]> | null = null;
let cachedSurnames: Record<string, string[]> | null = null;

/**
 * Generate a hidden first or last name for internal consistency.
 * Used when username/email generators need a name but the user hasn't 
 * included firstname/lastname fields in their template.
 */
export async function generateHiddenName(type: 'first' | 'last'): Promise<string> {
    if (type === 'first') {
        if (!cachedFirstnames) {
            try {
                cachedFirstnames = await loadDataset<Record<string, string[]>>('firstnames.json');
            } catch {
                // Fallback names if dataset fails
                return randomElement(['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn']);
            }
        }
        // Pick from any gender category randomly
        const categories = Object.keys(cachedFirstnames);
        const category = randomElement(categories);
        return randomElement(cachedFirstnames[category]);
    } else {
        if (!cachedSurnames) {
            try {
                cachedSurnames = await loadDataset<Record<string, string[]>>('surnames.json');
            } catch {
                // Fallback surnames if dataset fails
                return randomElement(['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Taylor', 'Wilson', 'Davis']);
            }
        }
        // Default to English nationality for hidden surnames
        const englishSurnames = cachedSurnames['English'] || cachedSurnames['British'];
        if (englishSurnames && englishSurnames.length > 0) {
            return randomElement(englishSurnames);
        }
        // Fallback to any nationality if English not found
        const nationalities = Object.keys(cachedSurnames);
        const nationality = randomElement(nationalities);
        return randomElement(cachedSurnames[nationality]);
    }
}
