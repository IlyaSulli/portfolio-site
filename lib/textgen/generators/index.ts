import { Template, TemplateField, FilterValue } from "@/components/text-gen-builder/types";
import { GeneratorContext, GeneratorResult } from "./utils";
import { generateFirstname } from "./firstname";
import { generateLastname } from "./lastname";
import { generateUsername } from "./username";
import { generateEmail } from "./email";
import { generatePhone } from "./phone";
import { generateDob } from "./dob";
import { generatePronouns } from "./pronouns";
import { generateHeight } from "./height";
import { generateWeight } from "./weight";
import { generateHobby } from "./hobby";
import { generateEducation } from "./education";
import { generatePassword } from "./password";
import { generateId } from "./id";
import { generateToggle } from "./toggle";
import { generateSelect } from "./select";
import { generateMultiselect } from "./multiselect";
import { generateNumber } from "./number";

// Map field original names to generator functions
const generators: Record<string, (ctx: GeneratorContext, fieldId: string) => Promise<GeneratorResult>> = {
    "First Name": generateFirstname,
    "Last Name": generateLastname,
    "Username": generateUsername,
    "Email": generateEmail,
    "Phone Number": generatePhone,
    "Date of Birth": generateDob,
    "Pronouns": generatePronouns,
    "Height": generateHeight,
    "Weight": generateWeight,
    "Hobby": generateHobby,
    "Education Level": generateEducation,
    "Password": generatePassword,
    "ID": generateId,
    "Toggle Field": generateToggle,
    "Select Field": generateSelect,
    "Multi-Select Field": generateMultiselect,
    "Number Field": generateNumber,
};

// Field generation order - fields that depend on others come later
const generationOrder = [
    "First Name",
    "Last Name",
    "Date of Birth",
    "Pronouns",
    "Height",
    "Weight",
    "Hobby",
    "Education Level",
    "Username",      // May use firstname/lastname
    "Email",         // May use firstname/lastname
    "Phone Number",
    "Password",
    "ID",
    "Toggle Field",
    "Select Field",
    "Multi-Select Field",
    "Number Field",
];

export interface GeneratedRow {
    id: string;
    values: Record<string, { value: any; displayValue: string }>;
}

// Sort template fields by generation order
function sortFieldsByDependency(fields: TemplateField[]): TemplateField[] {
    return [...fields].sort((a, b) => {
        const orderA = generationOrder.indexOf(a.originalName);
        const orderB = generationOrder.indexOf(b.originalName);
        // Fields not in the order list go last
        const finalOrderA = orderA === -1 ? 999 : orderA;
        const finalOrderB = orderB === -1 ? 999 : orderB;
        return finalOrderA - finalOrderB;
    });
}

// Generate a single row of data
export async function generateRow(
    template: Template,
    rowIndex: number
): Promise<GeneratedRow> {
    const context: GeneratorContext = {
        generatedFields: {},
        fieldFilters: template.filters || {},
    };
    
    const result: GeneratedRow = {
        id: `row-${Date.now()}-${rowIndex}`,
        values: {},
    };
    
    // Sort fields by dependency order
    const sortedFields = sortFieldsByDependency(template.fields);
    
    // Generate each field in order
    for (const field of sortedFields) {
        const generator = generators[field.originalName];
        
        if (generator) {
            try {
                const generated = await generator(context, field.id);
                
                // Store in context for dependent fields
                context.generatedFields[field.id] = generated.value;
                
                // Also store by original name for easier lookup
                const originalNameKey = field.originalName.toLowerCase().replace(/\s+/g, '');
                context.generatedFields[originalNameKey] = generated.value;
                
                // Store firstname/lastname specifically for username/email generators
                if (field.originalName === "First Name") {
                    context.generatedFields['firstname'] = generated.value;
                }
                if (field.originalName === "Last Name") {
                    context.generatedFields['lastname'] = generated.value;
                }
                
                result.values[field.id] = {
                    value: generated.value,
                    displayValue: generated.displayValue ?? String(generated.value),
                };
            } catch (error) {
                console.error(`Failed to generate ${field.name}:`, error);
                result.values[field.id] = {
                    value: '',
                    displayValue: '(Error)',
                };
            }
        } else {
            // Unknown field type - use placeholder
            result.values[field.id] = {
                value: `[${field.originalName}]`,
                displayValue: `[${field.originalName}]`,
            };
        }
    }
    
    return result;
}

// Generate multiple rows
export async function generateRows(
    template: Template,
    count: number
): Promise<GeneratedRow[]> {
    const rows: GeneratedRow[] = [];
    
    for (let i = 0; i < count; i++) {
        const row = await generateRow(template, i);
        rows.push(row);
    }
    
    return rows;
}

// Regenerate a specific field in a row
export async function regenerateField(
    template: Template,
    row: GeneratedRow,
    fieldId: string
): Promise<GeneratedRow> {
    const field = template.fields.find(f => f.id === fieldId);
    if (!field) return row;
    
    // Build context from existing row
    const context: GeneratorContext = {
        generatedFields: {},
        fieldFilters: template.filters || {},
    };
    
    // Populate context with existing values
    for (const [fId, data] of Object.entries(row.values)) {
        context.generatedFields[fId] = data.value;
        const f = template.fields.find(tf => tf.id === fId);
        if (f?.originalName === "First Name") {
            context.generatedFields['firstname'] = data.value;
        }
        if (f?.originalName === "Last Name") {
            context.generatedFields['lastname'] = data.value;
        }
    }
    
    const generator = generators[field.originalName];
    if (generator) {
        try {
            const generated = await generator(context, fieldId);
            row.values[fieldId] = {
                value: generated.value,
                displayValue: generated.displayValue ?? String(generated.value),
            };
        } catch (error) {
            console.error(`Failed to regenerate ${field.name}:`, error);
        }
    }
    
    return { ...row };
}
