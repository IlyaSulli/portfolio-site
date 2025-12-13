import { BadgeCheck, User, Users, Smile, AtSign, Cake, Image, MapPinned, BriefcaseBusiness, ToolCase, Ruler, Weight, Eye, KeyRound, SquareAsterisk, Building2, GraduationCap, Phone, ToggleRight, CircleCheck, SquareCheck, Hash, IdCardLanyard } from "lucide-react";

export const TextGenField = {
    username: { 
        name: "Username", 
        icon: BadgeCheck,
        filterSchema: {
            type: { 
                name: "Type",
                type: "array",
                allowedValues: ["Gaming", "Work", "Social Media"],
                tooltip: "Type of username generation method"
            },
            minLength: {
                name: "Minimum Length",
                type: "integer",
                min: 0,
                max: 15,
                tooltip: "Minimum length of the username",
            },
            maxLength: {
                name: "Maximum Length",
                type: "integer",
                min: 1,
                max: 32,
                tooltip: "Maximum length of the username",
            },
            allowedChar: {
                name: "Allowed Characters",
                type: "string",
                tooltip: "Characters allowed to be in the username"
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
            minLength: {
                name: "Minimum Length",
                type: "integer",
                min: 0,
                max: 14,
                tooltip: "Minimum length of the username",
            },
            maxLength: {
                name: "Maximum Length",
                type: "integer",
                min: 1,
                max: 15,
                tooltip: "Maximum length of the username",
            },
        }
    },
    lastname: { 
        name: "Last Name", 
        icon: Users, 
        filterSchema: {
            minLength: {
                name: "Minimum Length",
                type: "integer",
                min: 0,
                max: 16,
                tooltip: "Minimum length of the username",
            },
            maxLength: {
                name: "Maximum Length",
                type: "integer",
                min: 1,
                max: 17,
                tooltip: "Maximum length of the username",
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
            minDate: {
                name: "Minimum Date",
                type: "string",
                tooltip: "DoB after this date"
            },
            maxDate: {
                name: "Maximum Date",
                type: "string",
                tooltip: "DoB before this date"
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
            minQuantity: {
                name: "Minimum Quantity",
                type: "integer",
                tooltip: "Minimum number of hobbies"
            },
            maxQuantity: {
                name: "Maximum Quantity",
                type: "integer",
                tooltip: "Maximum number of hobbies"
            },
        }
    },
    height: { 
        name: "Height", 
        icon: Ruler,
        filterSchema: {
            unit: {
                name: "Unit",
                type: "array",
                allowedValues: ["cm", "inches"],
                tooltip: "Measurement unit for height"
            },
            minHeight: {
                name: "Minimum Height",
                type: "integer",
                tooltip: "Minimum height value"
            },
            maxHeight: {
                name: "Maximum Height",
                type: "integer",
                tooltip: "Maximum height value"
            }
        }
    },
    weight: { 
        name: "Weight", 
        icon: Weight,
        filterSchema: {
            unit: {
                name: "Unit",
                type: "array",
                allowedValues: ["kg", "lbs"],
                tooltip: "Measurement unit for weight"
            },
            minWeight: {
                name: "Minimum Weight",
                type: "integer",
                tooltip: "Minimum weight value"
            },
            maxWeight: {
                name: "Maximum Weight",
                type: "integer",
                tooltip: "Maximum weight value"
            }
        }
    },
    active: { 
        name: "Last Active", 
        icon: Eye,
        filterSchema: {
            timeframe: {
                name: "Timeframe",
                type: "array",
                allowedValues: ["Last 24 hours", "Last 7 days", "Last 30 days", "Last year"],
                tooltip: "Timeframe for last active"
            }
        }
    },
    password: { 
        name: "Password", 
        icon: KeyRound,
        filterSchema: {
            minLength: {
                name: "Minimum Length",
                type: "integer",
                min: 1,
                tooltip: "Minimum password length"
            },
            maxLength: {
                name: "Maximum Length",
                type: "integer",
                tooltip: "Maximum password length"
            },
            includeUppercase: {
                name: "Include Uppercase",
                type: "boolean",
                tooltip: "Include uppercase letters"
            },
            includeLowercase: {
                name: "Include Lowercase",
                type: "boolean",
                tooltip: "Include lowercase letters"
            },
            includeNumbers: {
                name: "Include Numbers",
                type: "boolean",
                tooltip: "Include numeric characters"
            },
            includeSpecial: {
                name: "Include Special Characters",
                type: "boolean",
                tooltip: "Include special characters"
            }
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
                type: "array", 
                allowedValues: ["(+44) United Kingdom", "(+1) United States"],
                description: "Geographical region for the phone number" },
            type: { 
                type: "string", 
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
                type: "array",
                allowedValues: ["UUID", "Numeric", "Alphanumeric"],
                tooltip: "Format of the ID"
            }
        }
    },
    toggle: { 
        name: "Toggle Field", 
        icon: ToggleRight,
        filterSchema: {
            defaultValue: {
                name: "Default Value",
                type: "boolean",
                tooltip: "Default state of the toggle"
            }
        }
    },
    select: { 
        name: "Select Field", 
        icon: CircleCheck,
        filterSchema: {
            options: {
                name: "Available Options",
                type: "array",
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
                type: "array",
                tooltip: "Options available for selection"
            },
            minSelections: {
                name: "Minimum Selections",
                type: "integer",
                min: 0,
                tooltip: "Minimum number of selections"
            },
            maxSelections: {
                name: "Maximum Selections",
                type: "integer",
                tooltip: "Maximum number of selections"
            }
        }
    },
    number: { 
        name: "Number Field", 
        icon: Hash,
        filterSchema: {
            minValue: {
                name: "Minimum Value",
                type: "integer",
                tooltip: "Minimum numeric value"
            },
            maxValue: {
                name: "Maximum Value",
                type: "integer",
                tooltip: "Maximum numeric value"
            },
            decimalPlaces: {
                name: "Decimal Places",
                type: "integer",
                min: 0,
                tooltip: "Number of decimal places allowed"
            }
        }
    },
};