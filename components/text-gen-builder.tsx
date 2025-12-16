import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Tabs, Tab } from "@heroui/tabs";
import { Badge } from "@heroui/badge";
import { useState, useMemo } from "react";
import { Template, FieldFilters } from "./text-gen-builder/types";
import StepBuilder from "./text-gen-builder/steps/builder";
import StepFilters, { validateRequiredFilters } from "./text-gen-builder/steps/filters";
import { AlertCircle } from "lucide-react";
import { TextGenField } from "@/config/textGenField";

type TabKey = 'builder' | 'filters';

interface TemplateBuilderProps {
    onCancel?: () => void;
    editingTemplate?: {
        id: string;
        name: string;
        fields: any[];
        filters: any;
        isUserTemplate: boolean;
        icon?: string;
        color?: string;
    };
}

export default function TemplateBuilder({ onCancel, editingTemplate }: TemplateBuilderProps) {
    const [activeTab, setActiveTab] = useState<TabKey>('builder');
    
    // Convert stored field data back to proper template fields with icon components
    const restoreFields = (storedFields: any[] | undefined) => {
        if (!storedFields) return [];
        return storedFields.map(field => {
            // Find the original field definition to get the icon component
            const originalField = Object.values(TextGenField).find(
                f => f.name === field.originalName
            );
            return {
                ...field,
                icon: originalField?.icon || field.icon,
            };
        });
    };
    
    const [template, setTemplate] = useState<Template>({
        name: editingTemplate?.name || "Untitled Template",
        fields: restoreFields(editingTemplate?.fields) || [],
        filters: editingTemplate?.filters || {},
        icon: editingTemplate?.icon || "CircleCheck",
        color: editingTemplate?.color || "3B82F6",
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Validate required filters
    const filtersValidation = useMemo(() => validateRequiredFilters(template), [template]);
    const hasFields = template.fields.length > 0;
    const needsFilterAttention = hasFields && !filtersValidation.isValid;
    const canSave = hasFields && filtersValidation.isValid;

    const handleFiltersChange = (filters: FieldFilters) => {
        setTemplate(prev => ({ ...prev, filters }));
    };

    const handleCancel = () => {
        // Show confirmation modal
        setShowConfirmModal(true);
    };

    const handleConfirmCancel = () => {
        // Close modal and call the onCancel callback to go back to templates page
        setShowConfirmModal(false);
        if (onCancel) {
            onCancel();
        }
    };

    const handleCancelModal = () => {
        // Just close the modal without canceling
        setShowConfirmModal(false);
    };

    const handleSave = () => {
        // Get existing user templates from localStorage
        const existingTemplates = localStorage.getItem('textGenUserTemplates');
        let userTemplates = existingTemplates ? JSON.parse(existingTemplates) : [];
        
        // Prepare fields for storage (remove non-serializable icon component, keep originalName for restoration)
        const serializableFields = template.fields.map(field => ({
            id: field.id,
            name: field.name,
            originalName: field.originalName,
            // Don't include icon - it will be restored from originalName when loading
        }));
        
        if (editingTemplate && editingTemplate.isUserTemplate) {
            // Update existing template
            const templateToUpdate = {
                id: editingTemplate.id,
                name: template.name,
                description: "", // Can be added later
                category: ["Custom"],
                icon: template.icon || "CircleCheck",
                color: template.color || "3B82F6",
                fields: serializableFields,
                filters: template.filters,
                isUserTemplate: true,
                createdAt: editingTemplate.id.includes('user-') ? 
                    userTemplates.find((t: any) => t.id === editingTemplate.id)?.createdAt || new Date().toISOString() : 
                    new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            
            // Find and replace the existing template
            const templateIndex = userTemplates.findIndex((t: any) => t.id === editingTemplate.id);
            if (templateIndex !== -1) {
                userTemplates[templateIndex] = templateToUpdate;
            } else {
                // If not found (shouldn't happen), add as new
                userTemplates.push(templateToUpdate);
            }
            
            console.log('Template updated:', templateToUpdate);
        } else {
            // Create new template
            const templateId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            const templateToSave = {
                id: templateId,
                name: template.name,
                description: "", // Can be added later
                category: ["Custom"],
                icon: template.icon || "CircleCheck",
                color: template.color || "3B82F6",
                fields: serializableFields,
                filters: template.filters,
                isUserTemplate: true,
                createdAt: new Date().toISOString(),
            };
            
            // Add the new template
            userTemplates.push(templateToSave);
            
            console.log('Template saved:', templateToSave);
        }
        
        // Save back to localStorage
        localStorage.setItem('textGenUserTemplates', JSON.stringify(userTemplates));
        
        // Call onCancel to go back to templates view
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className="flex flex-col backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 px-2 md:px-8 py-6 md:py-8 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex flex-col px-2 md:px-0">
                    <span className="text-xl md:text-2xl font-semibold">Template Builder</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {editingTemplate ? 'Edit your template' : 'Create a new template'}
                    </span>
                </div>
                {/* Desktop buttons */}
                <div className="hidden md:flex gap-2">
                    <Button 
                        color="default" 
                        variant="flat"
                        onPress={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="success" 
                        variant="flat"
                        onPress={handleSave}
                        isDisabled={!canSave}
                    >
                        {editingTemplate ? 'Update' : 'Save'}
                    </Button>
                </div>
            </div>

            {/* Tabs for Build and Filter */}
            <Tabs 
                aria-label="Builder Steps"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as TabKey)}
                classNames={{
                    tabList: "mt-4 p-1 backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10",
                    tab: "data-[selected=true]:bg-white/20 dark:data-[selected=true]:bg-white/10",
                }}
            >
                <Tab key="builder" title="Build" />
                <Tab 
                    key="filters" 
                    title={
                        <div className="flex items-center gap-2">
                            <span>Filters</span>
                            {needsFilterAttention && (
                                <span className="flex items-center justify-center w-5 h-5 text-xs bg-warning-500 text-white rounded-full">
                                    {filtersValidation.missingFields.length}
                                </span>
                            )}
                        </div>
                    }
                />
            </Tabs>

            {/* Validation message when on Build tab but filters need attention */}
            {activeTab === 'builder' && needsFilterAttention && (
                <div className="mt-4 mx-2 md:mx-0 flex items-center gap-2 px-4 py-3 rounded-lg bg-warning-500/20 border border-warning-500/30 text-warning-700 dark:text-warning-400">
                    <AlertCircle size={18} />
                    <span className="text-sm">
                        {filtersValidation.missingFields.length} required filter{filtersValidation.missingFields.length > 1 ? 's' : ''} need{filtersValidation.missingFields.length === 1 ? 's' : ''} to be configured in the Filters tab before saving.
                    </span>
                </div>
            )}

            {/* Tab content */}
            {activeTab === 'builder' && (
                <StepBuilder 
                    template={template} 
                    onTemplateChange={setTemplate} 
                />
            )}
            {activeTab === 'filters' && (
                <StepFilters 
                    template={template} 
                    onFiltersChange={handleFiltersChange}
                />
            )}

            {/* Mobile bottom buttons */}
            <div className="flex md:hidden gap-2 mt-6">
                <Button 
                    color="default" 
                    variant="flat"
                    onPress={handleCancel}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button 
                    color="success" 
                    variant="flat"
                    onPress={handleSave}
                    isDisabled={!canSave}
                    className="flex-1"
                >
                    {editingTemplate ? 'Update' : 'Save'}
                </Button>
            </div>

            {/* Confirmation Modal */}
            <Modal isOpen={showConfirmModal} onOpenChange={setShowConfirmModal} backdrop="blur" hideCloseButton>
                <ModalContent className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-lg">
                    <ModalHeader className="flex flex-col gap-1 text-white">
                        Discard Template?
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-white/90">
                            Are you sure you want to leave without saving? All your changes to the template will be lost.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="light" onPress={handleCancelModal}>
                            Keep Editing
                        </Button>
                        <Button color="danger" onPress={handleConfirmCancel}>
                            Discard
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}