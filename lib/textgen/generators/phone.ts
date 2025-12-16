import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, randomInt } from "./utils";

// Phone number formats by region and type
const phoneFormats: Record<string, Record<string, { prefix: string; format: string }[]>> = {
    "(+44) United Kingdom": {
        Mobile: [
            { prefix: "+44 7", format: "### ### ###" },
            { prefix: "07", format: "### ### ###" },
        ],
        Landline: [
            { prefix: "+44 20", format: " #### ####" }, // London
            { prefix: "+44 121", format: " ### ####" }, // Birmingham
            { prefix: "+44 161", format: " ### ####" }, // Manchester
            { prefix: "020", format: " #### ####" },
        ],
        "Toll-free": [
            { prefix: "0800", format: " ### ####" },
            { prefix: "0808", format: " ### ####" },
        ],
    },
    "(+1) United States": {
        Mobile: [
            { prefix: "+1 ", format: "(###) ###-####" },
            { prefix: "", format: "(###) ###-####" },
        ],
        Landline: [
            { prefix: "+1 ", format: "(###) ###-####" },
            { prefix: "", format: "(###) ###-####" },
        ],
        "Toll-free": [
            { prefix: "1-800-", format: "###-####" },
            { prefix: "1-888-", format: "###-####" },
            { prefix: "1-877-", format: "###-####" },
        ],
    },
};

function generatePhoneFromFormat(prefix: string, format: string): string {
    let result = prefix;
    for (const char of format) {
        if (char === '#') {
            result += randomInt(0, 9).toString();
        } else {
            result += char;
        }
    }
    return result;
}

export async function generatePhone(context: GeneratorContext, fieldId: string): Promise<GeneratorResult> {
    const filters = context.fieldFilters[fieldId];
    
    // Get filter values
    const region = getFilterValue<string>(filters, 'region', '(+44) United Kingdom');
    const types = getFilterValue<string[]>(filters, 'type', ['Mobile', 'Landline', 'Toll-free']);
    
    // Pick a random type from allowed types
    const type = randomElement(types);
    
    // Get formats for this region and type
    const regionFormats = phoneFormats[region] || phoneFormats['(+44) United Kingdom'];
    const typeFormats = regionFormats[type] || regionFormats['Mobile'];
    
    // Pick a random format
    const { prefix, format } = randomElement(typeFormats);
    
    // Generate the phone number
    const phoneNumber = generatePhoneFromFormat(prefix, format);
    
    return { value: phoneNumber };
}
