import { BadgeCheck, User, Users, Smile, AtSign, Cake, Image, MapPinned, BriefcaseBusiness, ToolCase, Ruler, Weight, Eye, KeyRound, SquareAsterisk, Building2, GraduationCap, Phone, ToggleRight, CircleCheck, SquareCheck, Hash, IdCardLanyard } from "lucide-react";

export const TextGenField = {
    username: { 
        name: "Username", 
        icon: BadgeCheck,
        filterSchema: {
            type: { 
                name: "Type",
                type: "array",
                default: ["Gaming", "Work", "Social Media"],
                allowedValues: ["Gaming", "Work", "Social Media"],
                tooltip: "Type of username generation method"
            },
            length: {
                name: "Length",
                type: "range",
                min: 1,
                max: 32,
                defaultMin: 3,
                defaultMax: 15,
                tooltip: "Length range of the username",
            },
            allowedChar: {
                name: "Allowed Characters",
                type: "array",
                default: ["Lowercase (abc)", "Numbers (123)"],
                allowedValues: ["Lowercase (abc)", "Uppercase (ABC)", "Numbers (123)", "Underscores (_)", "Hyphens (-)", "Dots (.)"],
                tooltip: "Character types allowed in the username"
            },
        }
    },
    firstname: { 
        name: "First Name", 
        icon: User,
        filterSchema: {
            gender: {
                name: "Gender",
                type: "array",
                allowedValues: ["Male", "Female", "Unisex"],
                description: "Desired gender basis for the name",
            },
            length: {
                name: "Length",
                type: "range",
                min: 1,
                max: 15,
                defaultMin: 2,
                defaultMax: 10,
                tooltip: "Length range of the first name",
            },
        }
    },
    lastname: { 
        name: "Last Name", 
        icon: Users, 
        filterSchema: {
            length: {
                name: "Length",
                type: "range",
                min: 1,
                max: 17,
                defaultMin: 2,
                defaultMax: 12,
                tooltip: "Length range of the last name",
            },
            nationality: {
                name: "Nationality",
                type: "array",
                allowedValues: ["English", "Russian", "Arabic", "Japanese", "Italian", "German", "Czech", "Spanish", "Dutch", "French", "Chinese", "Irish", "Greek", "Korean", "Scotish"],
                tooltip: "Country of origin for the name"
            },

        }
    },
    pronouns: { 
        name: "Pronouns", 
        icon: Smile,
        filterSchema: {
            options: {
                name: "Options",
                type: "array",
                allowedValues: ["he/him", "she/her", "they/them", "he/they", "she/they", "any"],
                tooltip: "Pronoun options",
            }
        }
    },
    email: {
        name: "Email",
        icon: AtSign,
        filterSchema: {
            type: { 
                name: "Type",
                type: "array", 
                allowedValues: ["Casual", "Professional", "Suspicious"], 
                tooltip: "Style of email format"
            },
            customDomain: {
                name: "Custom Domains",
                type: "boolean",
                tooltip: "Are custom domains allowed?"
            }
        },
    },
    dob: { 
        name: "Date of Birth", 
        icon: Cake,
        filterSchema: {
            dateRange: {
                name: "Date Range",
                type: "dateRange",
                tooltip: "Date of birth range",
                defaultMin: "1940-01-01",
                defaultMax: "2010-01-01",
                min: "1900-01-01",
            }
        }
    },
    // profilepic: { name: "Profile Picture", icon: Image },
    // location: { name: "Location", icon: MapPinned },
    // occupation: { name: "Occupation", icon: BriefcaseBusiness },
    hobby: { 
        name: "Hobby", 
        icon: ToolCase ,
        filterSchema: {
            quantity: {
                name: "Quantity",
                type: "range",
                min: 1,
                max: 20,
                defaultMin: 1,
                defaultMax: 5,
                tooltip: "Number of hobbies range"
            },
        }
    },
    height: { 
        name: "Height", 
        icon: Ruler,
        filterSchema: {
            unit: {
                name: "Unit",
                type: "select",
                default: "cm",
                allowedValues: ["cm", "inches"],
                tooltip: "Measurement unit for height"
            },
            heightRange: {
                name: "Height Range",
                type: "range",
                min: 1,
                max: 300,
                defaultMin: 150,
                defaultMax: 200,
                tooltip: "Height value range"
            }
        }
    },
    weight: { 
        name: "Weight", 
        icon: Weight,
        filterSchema: {
            unit: {
                name: "Unit",
                type: "select",
                default: "kg",
                allowedValues: ["kg", "lbs"],
                tooltip: "Measurement unit for weight"
            },
            weightRange: {
                name: "Weight Range",
                type: "range",
                min: 1,
                max: 500,
                defaultMin: 50,
                defaultMax: 100,
                tooltip: "Weight value range"
            }
        }
    },
    password: { 
        name: "Password", 
        icon: KeyRound,
        filterSchema: {
            length: {
                name: "Length",
                type: "range",
                min: 1,
                max: 128,
                defaultMin: 8,
                defaultMax: 20,
                tooltip: "Password length range"
            },
            allowedChar: {
                name: "Allowed Characters",
                type: "array",
                default: ["Lowercase (abc)", "Uppercase (ABC)", "Numbers (123)", "Special ($@!)"],
                allowedValues: ["Lowercase (abc)", "Uppercase (ABC)", "Numbers (123)", "Special ($@!)"],
                tooltip: "Character types allowed in the password"
            },
        }
    },
    // hash: { name: "Hash", icon: SquareAsterisk },
    // company: { name: "Company Name", icon: Building2 },
    education: { 
        name: "Education Level", 
        icon: GraduationCap,
        filterSchema: {
            levels: {
                name: "Education Levels",
                type: "array",
                default: ["High School", "Associate", "Bachelor", "Master", "PhD", "Diploma"],
                allowedValues: ["High School", "Associate", "Bachelor", "Master", "PhD", "Diploma"],
                tooltip: "Desired education levels"
            }
        }
    },
    phone: {
        name: "Phone Number",
        icon: Phone,
        filterSchema: {
            region: { 
                type: "select", 
                default: "(+44) United Kingdom",
                allowedValues: ["(+44) United Kingdom", "(+1) United States"],
                description: "Geographical region for the phone number" },
            type: { 
                type: "array", 
                default: ["Mobile", "Landline"],
                allowedValues: ["Mobile", "Landline"], 
                description: "Type of phone line." 
            }
        },
    },
    id: { 
        name: "ID", 
        icon: IdCardLanyard,
        filterSchema: {
            format: {
                name: "Format",
                type: "select",
                default: "UUID",
                allowedValues: ["UUID", "Numeric", "Alphanumeric"],
                tooltip: "Format of the ID"
            }
        }
    },
    toggle: { 
        name: "Toggle Field", 
        icon: ToggleRight,
        filterSchema: {
        }
    },
    select: { 
        name: "Select Field", 
        icon: CircleCheck,
        filterSchema: {
            options: {
                name: "Available Options",
                type: "array",
                required: true,
                tooltip: "Options available for selection"
            }
        }
    },
    multiselect: { 
        name: "Multi-Select Field", 
        icon: SquareCheck,
        filterSchema: {
            options: {
                name: "Available Options",
                required: true,
                type: "array",
                tooltip: "Options available for selection"
            },
            selections: {
                name: "Selection Count",
                type: "range",
                required: true,
                min: 0,
                max: 100,
                defaultMin: 1,
                defaultMax: 5,
                tooltip: "Number of selections range"
            }
        }
    },
    number: { 
        name: "Number Field", 
        icon: Hash,
        filterSchema: {
            valueRange: {
                name: "Value Range",
                type: "range",
                required: true,
                min: -999999,
                max: 999999,
                defaultMin: 0,
                defaultMax: 100,
                tooltip: "Numeric value range"
            },
            decimalPlaces: {
                name: "Decimal Places",
                type: "integer",
                required: true,
                default: 0,
                min: 0,
                max: 4,
                tooltip: "Number of decimal places allowed"
            }
        }
    },
};