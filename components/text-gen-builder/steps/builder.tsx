import { TextGenField } from "@/config/textGenField";
import { useState, DragEvent } from "react";
import { TemplateField, Template } from "./../types";
import AvailableFieldsList from "./../available-fields-list";
import TemplateFieldsList from "./../template-fields-list";

interface StepBuilderProps {
    template: Template;
    onTemplateChange: (template: Template) => void;
}

export default function StepBuilder({ template, onTemplateChange }: StepBuilderProps) {
    const [draggedField, setDraggedField] = useState<TemplateField | null>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const templateFields = template.fields;
    const setTemplateFields = (fields: TemplateField[] | ((prev: TemplateField[]) => TemplateField[])) => {
        if (typeof fields === 'function') {
            onTemplateChange({ ...template, fields: fields(template.fields) });
        } else {
            onTemplateChange({ ...template, fields });
        }
    };

    // Handle drag start from available fields (left column)
    const handleDragStartFromAvailable = (e: DragEvent<HTMLDivElement>, field: typeof TextGenField[keyof typeof TextGenField]) => {
        const newField: TemplateField = {
            id: `${field.name}-${Date.now()}`,
            name: field.name,
            originalName: field.name,
            icon: field.icon,
        };
        setDraggedField(newField);
        setDraggedIndex(null);
        e.dataTransfer.effectAllowed = "copy";
    };

    // Handle drag start from template fields (right column) for reordering
    const handleDragStartFromTemplate = (e: DragEvent<HTMLDivElement>, index: number) => {
        setDraggedIndex(index);
        setDraggedField(templateFields[index]);
        e.dataTransfer.effectAllowed = "move";
    };

    // Handle drag over the drop zone
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    // Handle drag over a specific template field for reordering
    const handleDragOverItem = (e: DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        if (e.clientY > midpoint) {
            setDropTargetIndex(index + 1);
        } else {
            setDropTargetIndex(index);
        }
    };

    // Handle drag leave
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDraggingOver(false);
            setDropTargetIndex(null);
        }
    };

    // Handle drop
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        setDropTargetIndex(null);

        if (draggedField) {
            if (draggedIndex !== null) {
                const newFields = [...templateFields];
                const [removed] = newFields.splice(draggedIndex, 1);
                const insertIndex = dropTargetIndex !== null ? dropTargetIndex : newFields.length;
                newFields.splice(insertIndex, 0, removed);
                setTemplateFields(newFields);
            } else {
                const insertIndex = dropTargetIndex !== null ? dropTargetIndex : templateFields.length;
                const newFields = [...templateFields];
                newFields.splice(insertIndex, 0, draggedField);
                setTemplateFields(newFields);
            }
        }

        setDraggedField(null);
        setDraggedIndex(null);
    };

    // Handle drag end
    const handleDragEnd = () => {
        setDraggedField(null);
        setDraggedIndex(null);
        setDropTargetIndex(null);
        setIsDraggingOver(false);
    };

    // Handle drop on available fields list to remove from template
    const handleDropOnAvailable = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedField) {
            // Remove the field from template
            const newFields = templateFields.filter((_, index) => index !== draggedIndex);
            setTemplateFields(newFields);
        }
        setDraggedField(null);
        setDraggedIndex(null);
        setDropTargetIndex(null);
    };

    // Handle drag over available fields list
    const handleDragOverAvailable = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedIndex !== null) {
            e.dataTransfer.dropEffect = "move";
        }
    };

    // Handle click to add field
    const handleAddField = (field: typeof TextGenField[keyof typeof TextGenField]) => {
        const newField: TemplateField = {
            id: `${field.name}-${Date.now()}`,
            name: field.name,
            originalName: field.name,
            icon: field.icon,
        };
        setTemplateFields([...templateFields, newField]);
    };

    // Handle template name change
    const handleTemplateNameChange = (name: string) => {
        onTemplateChange({ ...template, name });
    };

    return (
        <div className="mt-8 gap-8 flex flex-row w-full">
            <AvailableFieldsList
                onAddField={handleAddField}
                onDragStart={handleDragStartFromAvailable}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOverAvailable}
                onDrop={handleDropOnAvailable}
            />
            <TemplateFieldsList
                templateName={template.name}
                onTemplateNameChange={handleTemplateNameChange}
                templateFields={templateFields}
                setTemplateFields={setTemplateFields}
                isDraggingOver={isDraggingOver}
                dropTargetIndex={dropTargetIndex}
                draggedIndex={draggedIndex}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragOverItem={handleDragOverItem}
                onDragStartFromTemplate={handleDragStartFromTemplate}
                onDragEnd={handleDragEnd}
            />
        </div>
    );
}
