export const templates = [
    {
        name: "Social Media Profile",
        description: "Create unique and complete and consistent profiles",
        icon: "User",
        color: "EA2121",
        parameters: [
            {
                key: "username",
                filters: {
                    type: ["Social Media"],
                    minLength: "4",
                    maxLength: "14",
                    allowedChar: "[a-zA-Z0-9_.-]"
                }
            },
            {
                key: "firstname",
                filters: {
                    gender: ["Male", "Female", "Unisex"],
                    minLength: "2",
                }
            },
            {
                key: "pronouns",
                filters: {
                    options: ["he/him", "she/her", "they/them", "he/they", "she/they", "any"]
                }
            },
            {
                key: "lastname",
                filters: {
                    minLength: "2",
                }
            },
            {
                key: "email",
                filters: {
                    type: ["Casual", "Professional"]
                },
            },
            {
                key: "profilepic",
                filters: {
                    type: ["Face", "Pet", "Gaming"]
                }
            }
        ]
    },
    {
        name: "Phone Contact",
        description: "Contact pages with realistic phone numbers and profiles",
        icon: "BookUser",
        color: "21AF19",
        parameters: [
            {
                key: "phone",
                filters: {
                    region: "UK",
                    type: "mobile"
                }
            },
            {
                key: "firstname",
                filters: {
                    gender: ["male", "female", "unisex"],
                    minLength: "2",
                }
            },
            {
                key: "lastname",
                filters: {
                    minLength: "2",
                }
            },
            {
                key: "profilepic",
                filters: {
                    type: ["face", "pet", "gaming"]
                }
            }
        ]
    },
    {
        name: "Fitness Tracking Profile",
        description: "Generate fitness profiles with realistic trackable metrics",
        icon: "Activity",
        color: "AF198A",
        parameters: [
            {
                key: "weight",
                filters: [
                    {
                        minWeight: 40,
                        maxWeight: 90,
                        step: 5,
                        measurement: "metric",
                        granularity: ["kg"]
                    }
                ]
            },
            {
                key: "height",
                filters: [
                    {
                        minHeight: 140,
                        maxHeight: 200,
                        step: 5,
                        measurement: "metric",
                        granularity: ["cm"]
                    }
                ]
            },
            {
                key: "firstname",
                filters: {
                    gender: ["male", "female", "unisex"],
                    minLength: "2",
                }
            },
            {
                key: "lastname",
                filters: {
                    minLength: "2",
                }
            },
            {
                key: "dob",
                filters: {
                    minDate: "1950-01-01",
                    maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]
                }
            },
            {
                key: "profilepic",
                filters: {
                    type: ["face"]
                }
            },
        ]
    }
]