import { useState } from "react";
import { Template } from "../../types";
import { useDragAndDrop } from "./useDragAndDrop";
import AvailableFieldsList from "./AvailableFieldsList";
import TemplateFieldsList from "./TemplateFieldsList";
import AddFieldModal from "./AddFieldModal";

interface StepBuilderProps {
    template: Template;
    onTemplateChange: (template: Template) => void;
}

export default function StepBuilder({ template, onTemplateChange }: StepBuilderProps) {
    const [showAddFieldModal, setShowAddFieldModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { dragState, templateFields, setTemplateFields, handlers } = useDragAndDrop({
        template,
        onTemplateChange,
    });

    const handleTemplateIconChange = (icon: string) => {
        onTemplateChange({ ...template, icon });
    };

    const handleTemplateColorChange = (color: string) => {
        onTemplateChange({ ...template, color });
    };

    const handleTemplateNameChange = (name: string) => {
        onTemplateChange({ ...template, name });
    };

    return (
        <div className="mt-8 gap-8 flex flex-col md:flex-row w-full">
            <AvailableFieldsList
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddField={handlers.handleAddField}
                onDragStart={handlers.handleDragStartFromAvailable}
                onDragEnd={handlers.handleDragEnd}
                onDragOver={handlers.handleDragOverAvailable}
                onDrop={handlers.handleDropOnAvailable}
                className="hidden md:flex md:w-1/3"
            />
            <TemplateFieldsList
                templateName={template.name}
                onTemplateNameChange={handleTemplateNameChange}
                templateIcon={template.icon || "FileText"}
                templateColor={template.color || "3B82F6"}
                onTemplateIconChange={handleTemplateIconChange}
                onTemplateColorChange={handleTemplateColorChange}
                templateFields={templateFields}
                setTemplateFields={setTemplateFields}
                isDraggingOver={dragState.isDraggingOver}
                dropTargetIndex={dragState.dropTargetIndex}
                draggedIndex={dragState.draggedIndex}
                onDragOver={handlers.handleDragOver}
                onDragLeave={handlers.handleDragLeave}
                onDrop={handlers.handleDrop}
                onDragOverItem={handlers.handleDragOverItem}
                onDragStartFromTemplate={handlers.handleDragStartFromTemplate}
                onDragEnd={handlers.handleDragEnd}
                onAddFieldClick={() => setShowAddFieldModal(true)}
            />

            {/* Mobile Add Field Modal */}
            <AddFieldModal
                isOpen={showAddFieldModal}
                onOpenChange={setShowAddFieldModal}
                onAddField={handlers.handleAddField}
            />
        </div>
    );
}
