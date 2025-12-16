import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import {Tabs, Tab} from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import TextGenTemplateList from "@/components/text-gen-template-list";
import TextGenFilter from "@/components/text-gen-filter";
import { templates } from "@/config/textGenTemplates";
import TemplateBuilder from "@/components/text-gen-builder";
import StepGenerator from "@/components/text-gen-builder/steps/generator";
import { TextGenField } from "@/config/textGenField";
import { Template, TemplateField } from "@/components/text-gen-builder/types";

// Helper function to convert stored template to generator Template format
function convertToGeneratorTemplate(
    templateData: any, 
    isUserTemplate: boolean
): Template | null {
    if (!templateData) return null;
    
    let fields: TemplateField[] = [];
    let filters: Record<string, any[]> = {};
    
    if (isUserTemplate) {
        // User templates have fields array with id, name, originalName
        fields = (templateData.fields || []).map((field: any) => {
            const originalField = Object.values(TextGenField).find(
                f => f.name === field.originalName
            );
            return {
                id: field.id,
                name: field.name,
                originalName: field.originalName,
                icon: originalField?.icon || TextGenField.username.icon,
            };
        });
        filters = templateData.filters || {};
    } else {
        // Built-in templates have parameters array with key
        fields = (templateData.parameters || []).map((param: any, index: number) => {
            const fieldDef = TextGenField[param.key as keyof typeof TextGenField];
            const fieldId = `${param.key}-${index}`;
            
            // Convert parameter filters to our filter format
            if (param.filters && fieldDef) {
                const filterValues: any[] = [];
                Object.entries(param.filters).forEach(([filterKey, value]) => {
                    filterValues.push({ filterKey, value });
                });
                if (filterValues.length > 0) {
                    filters[fieldId] = filterValues;
                }
            }
            
            return {
                id: fieldId,
                name: fieldDef?.name || param.key,
                originalName: fieldDef?.name || param.key,
                icon: fieldDef?.icon || TextGenField.username.icon,
            };
        });
    }
    
    return {
        name: templateData.name || 'Untitled Template',
        fields,
        filters,
        icon: templateData.icon,
        color: templateData.color,
    };
}

// Generate Tab Component
function GenerateTab({ 
    selectedIndex, 
    selectedUserTemplate 
}: { 
    selectedIndex: number | null; 
    selectedUserTemplate: string | null;
}) {
    const [userTemplates, setUserTemplates] = useState<any[]>([]);
    
    useEffect(() => {
        // Load user templates from localStorage
        const stored = localStorage.getItem('textGenUserTemplates');
        if (stored) {
            setUserTemplates(JSON.parse(stored));
        }
    }, []);
    
    // Determine which template to use
    let templateData: any = null;
    let isUserTemplate = false;
    
    if (selectedUserTemplate) {
        templateData = userTemplates.find(t => t.id === selectedUserTemplate);
        isUserTemplate = true;
    } else if (selectedIndex !== null) {
        templateData = templates[selectedIndex];
        isUserTemplate = false;
    }
    
    const template = convertToGeneratorTemplate(templateData, isUserTemplate);
    
    if (!template) {
        return (
            <div className="flex flex-col items-center justify-center py-16 backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-2xl shadow-lg">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">No Template Selected</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Select a template from the Templates tab to start generating data.
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 px-2 md:px-8 py-6 md:py-8 rounded-2xl shadow-lg">
            <StepGenerator template={template} />
        </div>
    );
}

const GRADIENTS = {
    light: {
        primary: 'radial-gradient(circle, rgb(96 165 250), rgb(59 130 246))',
        danger: 'radial-gradient(circle, rgb(248 113 113), rgb(239 68 68))',
        primary2: 'radial-gradient(circle, rgb(59 130 246), rgb(37 99 235))',
    },
    dark: {
        primary: 'radial-gradient(circle, rgb(59 130 246), rgb(37 99 235))',
        danger: 'radial-gradient(circle, rgb(239 68 68), rgb(220 38 38))',
        primary2: 'radial-gradient(circle, rgb(37 99 235), rgb(29 78 216))',
    }
};

export default function TextGenerator(){
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedUserTemplate, setSelectedUserTemplate] = useState<string | null>(null);
    const [useAdvancedBuilder, setUseAdvancedBuilder] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<any>(null);
    const [scrollY, setScrollY] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();
    const selectedTemplate = selectedIndex !== null ? templates[selectedIndex] : null;
    const isDark = theme === 'dark';
    const gradients = isDark ? GRADIENTS.dark : GRADIENTS.light;

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        setIsMounted(true);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleEditTemplate = (template: any) => {
        setEditingTemplate(template);
        setUseAdvancedBuilder(true);
    };

    const handleCancelBuilder = () => {
        setUseAdvancedBuilder(false);
        setEditingTemplate(null);
    };

    return(
        <DefaultLayout>
            <div className="relative min-h-screen">
                {/* Moving blur blobs background */}
                <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                    {isMounted && (
                        <>
                            <div 
                                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-60"
                                style={{
                                    background: gradients.primary,
                                    animation: 'floatPrimary 60s ease-in-out infinite',
                                    mixBlendMode: 'multiply',
                                    transform: `translateY(${scrollY * 0.1}px)`,
                                    transition: 'background 0.3s ease-in-out'
                                }}
                            />
                            <div 
                                className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-55"
                                style={{
                                    background: gradients.danger,
                                    animation: 'floatDanger 38s ease-in-out infinite',
                                    mixBlendMode: 'multiply',
                                    transform: `translateY(${scrollY * -0.15}px)`,
                                    transition: 'background 0.3s ease-in-out'
                                }}
                            />
                            <div 
                                className="absolute bottom-1/3 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-50"
                                style={{
                                    background: gradients.primary2,
                                    animation: 'floatPrimary2 40s ease-in-out infinite',
                                    mixBlendMode: 'multiply',
                                    transform: `translateY(${scrollY * 0.08}px)`,
                                    transition: 'background 0.3s ease-in-out'
                                }}
                            />
                        </>
                    )}
                </div>
                
                <style jsx global>{`
                    @keyframes floatPrimary {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(300px, -200px) scale(1.2); }
                        50% { transform: translate(-150px, 300px) scale(0.8); }
                        75% { transform: translate(400px, 150px) scale(1.1); }
                    }
                    @keyframes floatDanger {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(-250px, 300px) scale(0.9); }
                        50% { transform: translate(350px, -100px) scale(1.3); }
                        75% { transform: translate(-200px, -250px) scale(1); }
                    }
                    @keyframes floatPrimary2 {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        33% { transform: translate(-300px, -100px) scale(1.1); }
                        66% { transform: translate(200px, 250px) scale(0.9); }
                    }
                `}</style>
                
                <div className="relative -mx-4" style={{ zIndex: 10 }}>
                    <div className="flex-col flex align-middle px-4">
                        <h1 className={`${title()} text-center`}>Text Generator</h1>
                        <span className="mt-4 text-center">Create high quality text, names and more for your designs.</span>
                    </div>
                    <Tabs 
                        aria-label="Generator Types"
                        classNames={{
                            tabList: "mt-16 p-2 opacity-90 backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-lg",
                        }}
                    >
                        <Tab key="templates" title="Templates">
                            {!useAdvancedBuilder ? (
                                <div className="flex flex-col dark:bg-zinc-900/40 bg-zinc-100/40 backdrop-blur-lg px-8 py-8 rounded-2xl border border-white/10 dark:border-white/5">
                                    <div className="justify-between flex-col sm:flex-row flex pb-4">
                                        <span className="text-2xl font-semibold pb-4 sm:pb-0">Templates</span>
                                        <Button 
                                            color="primary"  
                                            startContent={<Plus size={16} />}
                                            onPress={() => setUseAdvancedBuilder(true)}
                                        >
                                            New Template
                                        </Button>
                                    </div>
                                    <TextGenTemplateList 
                                        selectedIndex={selectedIndex} 
                                        onSelectIndex={setSelectedIndex} 
                                        selectedUserTemplate={selectedUserTemplate}
                                        onSelectUserTemplate={setSelectedUserTemplate}
                                        onEditTemplate={handleEditTemplate}
                                    />
                                </div>
                            ) : (
                                <TemplateBuilder 
                                    onCancel={handleCancelBuilder} 
                                    editingTemplate={editingTemplate}
                                />
                            )}
                        </Tab>
                        
                        <Tab key="generate" title="Generate">
                            <GenerateTab 
                                selectedIndex={selectedIndex}
                                selectedUserTemplate={selectedUserTemplate}
                            />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </DefaultLayout> 
    )
}