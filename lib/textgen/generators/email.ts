import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, randomInt, generateHiddenName } from "./utils";

// Default email domains by type
const casualDomains = ["gmail.com","googlemail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "protonmail.com"];
const professionalDomains = ["gmail.com", "outlook.com", "company.com", "business.org", "corp.net", "enterprise.io", "professional.com", "work.email", "office365.com", "business.net", "corporate.com", "company.org", "firm.com", "consultancy.co.uk", "agency.com", "solutions.io", "ventures.com", "group.net"];
const suspiciousDomains = ["temp-mail.xyz", "guerrillamail.com", "throwaway.email", "fakeinbox.com", "10minutemail.net", "mailinator.com", "trashmail.com", "yopmail.com", "maildrop.cc", "sharklasers.com", "spam4.me", "tempmail.com", "minutemail.com", "guerrillamail.info", "tempmail.xyz", "fakeemail.net"];

async function generateEmailPrefix(context: GeneratorContext, type: string): Promise<string> {
    // Get names from context or generate hidden ones for consistency
    const firstName = (context.generatedFields['firstname'] as string || await generateHiddenName('first')).toLowerCase();
    const lastName = (context.generatedFields['lastname'] as string || await generateHiddenName('last')).toLowerCase();
    
    switch (type) {
        case 'Professional': {
            // Professional formats
            const variations = [
                () => firstName + '.' + lastName,
                () => firstName.slice(0, 1) + lastName,
                () => firstName + lastName.slice(0, 1),
                () => firstName + '_' + lastName,
            ];
            return randomElement(variations)();
        }
        
        case 'Suspicious': {
            // Random looking
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let prefix = '';
            const length = randomInt(8, 15);
            for (let i = 0; i < length; i++) {
                prefix += chars[Math.floor(Math.random() * chars.length)];
            }
            return prefix;
        }
        
        case 'Casual':
        default: {
            // Casual formats
            const variations = [
                () => firstName + randomInt(1, 999),
                () => firstName + '.' + lastName + randomInt(1, 99),
                () => firstName + lastName.slice(0, 2),
                () => firstName + '_' + randomInt(10, 99),
                () => firstName.slice(0, 1) + lastName + randomInt(1, 9),
            ];
            return randomElement(variations)();
        }
    }
}

export async function generateEmail(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const types = getFilterValue<string[]>(filters, 'type', ['Casual', 'Professional', 'Suspicious']);
    const customDomains = getFilterValue<string[]>(filters, 'customDomains', []);
    const exclusiveCustomDomains = getFilterValue<boolean>(filters, 'exclusiveCustomDomains', false);
    
    // Pick a random type from allowed types
    const type = randomElement(types);
    
    // Generate email prefix based on type (await since it may need to generate hidden names)
    const prefix = await generateEmailPrefix(context, type);
    
    // Determine domain pool
    let domainPool: string[] = [];
    
    if (exclusiveCustomDomains && customDomains.length > 0) {
        // Use only custom domains
        domainPool = customDomains;
    } else {
        // Mix default domains with custom domains
        switch (type) {
            case 'Professional':
                domainPool = [...professionalDomains];
                break;
            case 'Suspicious':
                domainPool = [...suspiciousDomains];
                break;
            case 'Casual':
            default:
                domainPool = [...casualDomains];
                break;
        }
        
        // Add custom domains to the pool
        if (customDomains.length > 0) {
            domainPool = [...domainPool, ...customDomains];
        }
    }
    
    // Fallback if domain pool is empty
    if (domainPool.length === 0) {
        domainPool = casualDomains;
    }
    
    const domain = randomElement(domainPool);
    const email = `${prefix}@${domain}`;
    
    return { value: email };
}
