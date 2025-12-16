import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, randomInt, loadDataset } from "./utils";

interface CompanyData {
    prefixes: Record<string, string[]>;
    roots: Record<string, string[]>;
    suffixes: string[];
}

let companyData: CompanyData | null = null;

async function getCompanyData(): Promise<CompanyData> {
    if (!companyData) {
        try {
            companyData = await loadDataset<CompanyData>('companies.json');
        } catch {
            // Fallback data if loading fails
            companyData = {
                prefixes: { General: ["Global", "United", "Premier", "Elite", "Prime", "Alpha", "Nova"] },
                roots: { General: ["Group", "Corp", "Enterprises", "Holdings", "Industries", "Partners"] },
                suffixes: ["Inc", "LLC", "Ltd", "Corp", "Co", ""]
            };
        }
    }
    return companyData;
}

// Map occupation clusters to company industries
const clusterToIndustry: Record<string, string> = {
    "Business & Administration": "Consulting",
    "Construction & Property": "Manufacturing",
    "Creative & Media": "Creative",
    "Technology & Computing": "Tech",
    "Education & Public Services": "Education",
    "Energy & Offshore": "Energy",
    "Healthcare & Medicine": "Healthcare",
    "Manufacturing & Engineering": "Manufacturing",
    "Science & Environment": "Tech",
    "Transport & Hospitality": "Retail",
};

export async function generateCompany(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    const data = await getCompanyData();
    
    // Get filter values
    let industries = getFilterValue<string[]>(filters, 'industry', ['General']);
    const includesSuffix = getFilterValue<boolean>(filters, 'includeSuffix', true);
    const style = getFilterValue<string>(filters, 'style', 'Mixed');
    
    // Check if there's an occupation with a cluster we can link to
    const occupationMeta = context.fieldMetadata?.['Occupation'];
    if (occupationMeta?.cluster) {
        const linkedIndustry = clusterToIndustry[occupationMeta.cluster];
        if (linkedIndustry && industries.includes(linkedIndustry)) {
            // Prefer the linked industry (80% chance to use it)
            industries = Math.random() < 0.8 ? [linkedIndustry] : industries;
        } else if (linkedIndustry) {
            // If linked industry isn't in filter, still use it 50% of the time
            industries = Math.random() < 0.5 ? [linkedIndustry] : industries;
        }
    }
    
    // Pick a random industry from allowed industries
    const industry = randomElement(industries);
    
    // Get prefixes and roots for the selected industry (fallback to General)
    const prefixes = data.prefixes[industry] || data.prefixes['General'];
    const roots = data.roots[industry] || data.roots['General'];
    
    let companyName = '';
    
    switch (style) {
        case 'Prefix + Root': {
            // e.g., "TechSolutions", "CloudWorks"
            companyName = randomElement(prefixes) + randomElement(roots);
            break;
        }
        case 'Single Word': {
            // Just use a root or prefix as standalone
            companyName = Math.random() > 0.5 
                ? randomElement(prefixes) 
                : randomElement(roots);
            break;
        }
        case 'Initials': {
            // Generate 2-4 letter acronym
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const length = randomInt(2, 4);
            for (let i = 0; i < length; i++) {
                companyName += letters[randomInt(0, 25)];
            }
            break;
        }
        case 'Mixed':
        default: {
            // Randomly choose between different styles
            const styleChoice = randomInt(1, 4);
            switch (styleChoice) {
                case 1:
                    // Prefix + Root
                    companyName = randomElement(prefixes) + randomElement(roots);
                    break;
                case 2:
                    // Just Root
                    companyName = randomElement(roots);
                    break;
                case 3:
                    // Prefix + space + Root
                    companyName = randomElement(prefixes) + ' ' + randomElement(roots);
                    break;
                case 4:
                    // Two words combined
                    companyName = randomElement(prefixes) + randomElement(prefixes).toLowerCase();
                    break;
            }
            break;
        }
    }
    
    // Add suffix if enabled
    if (includesSuffix) {
        const suffix = randomElement(data.suffixes);
        if (suffix) {
            companyName += ' ' + suffix;
        }
    }
    
    return { value: companyName.trim() };
}
