import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, loadDataset } from "./utils";

// Occupations by category
let occupationsData: Record<string, string[]> | null = null;
// Categories grouped by cluster
let clustersData: Record<string, string[]> | null = null;

async function getOccupationsData(): Promise<Record<string, string[]>> {
    if (!occupationsData) {
        try {
            occupationsData = await loadDataset<Record<string, string[]>>('occupations.json');
        } catch {
            // Fallback data if loading fails
            occupationsData = {
                "General": ["Manager", "Assistant", "Consultant", "Analyst", "Coordinator", "Specialist", "Director", "Administrator"]
            };
        }
    }
    return occupationsData;
}

async function getClustersData(): Promise<Record<string, string[]>> {
    if (!clustersData) {
        try {
            clustersData = await loadDataset<Record<string, string[]>>('categoryclusters.json');
        } catch {
            // Fallback data if loading fails
            clustersData = {
                "General": ["General"]
            };
        }
    }
    return clustersData;
}

// Export for UI to get categories based on selected clusters
export async function getCategoriesForClusters(selectedClusters: string[]): Promise<string[]> {
    const clusters = await getClustersData();
    const categories: string[] = [];
    
    for (const cluster of selectedClusters) {
        const clusterCategories = clusters[cluster] || [];
        for (const category of clusterCategories) {
            if (!categories.includes(category)) {
                categories.push(category);
            }
        }
    }
    
    return categories.sort();
}

// Export all cluster names
export async function getAllClusters(): Promise<string[]> {
    const clusters = await getClustersData();
    return Object.keys(clusters).sort();
}

export async function generateOccupation(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    const occupations = await getOccupationsData();
    const clusters = await getClustersData();
    
    // Get filter values
    const selectedClusters = getFilterValue<string[]>(filters, 'cluster', Object.keys(clusters));
    const selectedCategories = getFilterValue<string[]>(filters, 'category', []);
    
    // Pick a cluster to use (store it for company linking)
    const chosenCluster = randomElement(selectedClusters);
    
    // Get all categories in the chosen cluster
    const categoriesInCluster = clusters[chosenCluster] || [];
    
    // If specific categories are selected, filter to only those within the chosen cluster
    let categoriesToUse: string[];
    if (selectedCategories.length > 0) {
        // Use only categories that are both selected AND in the chosen cluster
        categoriesToUse = selectedCategories.filter(cat => categoriesInCluster.includes(cat));
        // If no overlap, fall back to all categories in cluster
        if (categoriesToUse.length === 0) {
            categoriesToUse = categoriesInCluster;
        }
    } else {
        // No specific categories selected, use all in cluster
        categoriesToUse = categoriesInCluster;
    }
    
    // Build a pool of valid occupations from the categories
    const validOccupations: string[] = [];
    for (const category of categoriesToUse) {
        const occupationsInCategory = occupations[category] || [];
        for (const occupation of occupationsInCategory) {
            if (!validOccupations.includes(occupation)) {
                validOccupations.push(occupation);
            }
        }
    }
    
    // Fallback if no valid occupations found
    if (validOccupations.length === 0) {
        // Get all occupations as fallback
        const allOccupations = Object.values(occupations).flat();
        const uniqueOccupations = Array.from(new Set(allOccupations));
        return { 
            value: randomElement(uniqueOccupations),
            metadata: { cluster: chosenCluster }
        };
    }
    
    return { 
        value: randomElement(validOccupations),
        metadata: { cluster: chosenCluster }
    };
}
