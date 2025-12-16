import { GeneratorContext, GeneratorResult, getFilterValue, randomElement, randomInt } from "./utils";

// Realistic area codes and exchanges for US and UK
const US_AREA_CODES = [
    "212", "213", "312", "305", "415", "646", "718", "202", "617", "818", "602", "713", "214", "415", "408", "917", "516", "718", "646", "347", "773", "312", "213", "323", "818", "310", "305", "786", "954", "407", "813", "404", "770", "678", "303", "720", "214", "469", "972", "713", "281", "832", "210", "512", "713", "281", "832", "602", "480", "623", "702", "725", "801", "385", "206", "253", "425", "360", "509", "503", "971", "208", "406", "307", "605", "402", "308", "316", "913", "785", "816", "314", "636", "573", "417", "816", "913", "785", "316", "913", "785", "316"
];
const US_EXCHANGES = [
    "555", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299"
];
const UK_MOBILE_PREFIXES = ["+44 7"];
const UK_MOBILE_EXCHANGES = [
    "7400", "7500", "7600", "7700", "7800", "7900", "7911", "7920", "7930", "7940", "7950", "7960", "7970", "7980", "7990"
];
const UK_LANDLINE_CODES = [
    { area: "London", code: "+44 20", local: "020" },
    { area: "Birmingham", code: "+44 121", local: "0121" },
    { area: "Manchester", code: "+44 161", local: "0161" },
    { area: "Leeds", code: "+44 113", local: "0113" },
    { area: "Glasgow", code: "+44 141", local: "0141" },
    { area: "Liverpool", code: "+44 151", local: "0151" },
    { area: "Sheffield", code: "+44 114", local: "0114" },
    { area: "Edinburgh", code: "+44 131", local: "0131" },
    { area: "Bristol", code: "+44 117", local: "0117" },
    { area: "Nottingham", code: "+44 115", local: "0115" },
];
const UK_TOLL_FREE = ["0800", "0808"];

const phoneFormats: Record<string, Record<string, { prefix: string; format: string }[]>> = {
    "(+44) United Kingdom": {
        Mobile: UK_MOBILE_PREFIXES.map(prefix => ({ prefix, format: "#### ######" })),
        Landline: [
            ...UK_LANDLINE_CODES.map(({ code }) => ({ prefix: code, format: " ### ####" })),
            ...UK_LANDLINE_CODES.map(({ local }) => ({ prefix: local, format: " ### ####" })),
        ],
        "Toll-free": UK_TOLL_FREE.map(prefix => ({ prefix, format: " ### ####" })),
    },
    "(+1) United States": {
        Mobile: [
            { prefix: "+1 ", format: "(AAA) EEE-NNNN" },
            { prefix: "", format: "(AAA) EEE-NNNN" },
        ],
        Landline: [
            { prefix: "+1 ", format: "(AAA) EEE-NNNN" },
            { prefix: "", format: "(AAA) EEE-NNNN" },
        ],
        "Toll-free": [
            { prefix: "1-800-", format: "NNN-NNNN" },
            { prefix: "1-888-", format: "NNN-NNNN" },
            { prefix: "1-877-", format: "NNN-NNNN" },
        ],
    },
};


function generatePhoneFromFormat(prefix: string, format: string): string {
    // For US numbers, replace AAA and EEE blocks first
    let result = prefix;
    let workingFormat = format;
    if (format.includes("AAA") && format.includes("EEE")) {
        const area = randomElement(US_AREA_CODES);
        const exch = randomElement(US_EXCHANGES);
        workingFormat = workingFormat.replace("AAA", area).replace("EEE", exch);
    }
    // Now process the rest (N/# for digits)
    for (const char of workingFormat) {
        if (char === '#' || char === 'N') {
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
    let phoneNumber = generatePhoneFromFormat(prefix, format);

    // For UK mobile, optionally use a real exchange
    if (region === "(+44) United Kingdom" && type === "Mobile") {
        // Replace the first 4 digits after prefix with a real exchange
        const exchange = randomElement(UK_MOBILE_EXCHANGES);
        phoneNumber = phoneNumber.replace(/(\+44 7|07)\d{4}/, (m, p1) => p1 + exchange.slice(2));
    }

    // Always ensure UK numbers start with +44
    if (region === "(+44) United Kingdom") {
        phoneNumber = phoneNumber.replace(/^0+/, "");
        phoneNumber = phoneNumber.replace(/^\+44\s*/, "");
        phoneNumber = "+44 " + phoneNumber.trim();
    }

    // Always ensure US numbers start with +1
    if (region === "(+1) United States") {
        phoneNumber = phoneNumber.replace(/^\+?1\s*/, "");
        phoneNumber = "+1 " + phoneNumber.trim();
    }

    return { value: phoneNumber };
}
