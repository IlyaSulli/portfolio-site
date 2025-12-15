import { useState, useCallback, DragEvent } from "react";
import { TextGenField } from "@/config/textGenField";
import { TemplateField, Template } from "../../types";

interface UseDragAndDropProps {
    template: Template;
    onTemplateChange: (template: Template) => void;
}

interface DragState {
    draggedField: TemplateField | null;
    draggedIndex: number | null;
    dropTargetIndex: number | null;
    isDraggingOver: boolean;
}

export function useDragAndDrop({ template, onTemplateChange }: UseDragAndDropProps) {
    const [dragState, setDragState] = useState<DragState>({
        draggedField: null,
        draggedIndex: null,
        dropTargetIndex: null,
        isDraggingOver: false,
    });

    const templateFields = template.fields;
    
    const setTemplateFields = useCallback((fields: TemplateField[] | ((prev: TemplateField[]) => TemplateField[])) => {
        if (typeof fields === 'function') {
            onTemplateChange({ ...template, fields: fields(template.fields) });
        } else {
            onTemplateChange({ ...template, fields });
        }
    }, [template, onTemplateChange]);

    // Handle drag start from available fields (left column)
    const handleDragStartFromAvailable = useCallback((e: DragEvent<HTMLDivElement>, field: typeof TextGenField[keyof typeof TextGenField]) => {
        const newField: TemplateField = {
            id: `${field.name}-${Date.now()}`,
            name: field.name,
            originalName: field.name,
            icon: field.icon,
        };
        setDragState(prev => ({
            ...prev,
            draggedField: newField,
            draggedIndex: null,
        }));
        e.dataTransfer.effectAllowed = "copy";
    }, []);

    // Handle drag start from template fields (right column) for reordering
    const handleDragStartFromTemplate = useCallback((e: DragEvent<HTMLDivElement>, index: number) => {
        setDragState(prev => ({
            ...prev,
            draggedIndex: index,
            draggedField: templateFields[index],
        }));
        e.dataTransfer.effectAllowed = "move";
    }, [templateFields]);

    // Handle drag over the drop zone
    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragState(prev => ({ ...prev, isDraggingOver: true }));
    }, []);

    // Handle drag over a specific template field for reordering
    const handleDragOverItem = useCallback((e: DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const newDropTargetIndex = e.clientY > midpoint ? index + 1 : index;
        setDragState(prev => ({ ...prev, dropTargetIndex: newDropTargetIndex }));
    }, []);

    // Handle drag leave
    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragState(prev => ({
                ...prev,
                isDraggingOver: false,
                dropTargetIndex: null,
            }));
        }
    }, []);

    // Handle drop
    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        const { draggedField, draggedIndex, dropTargetIndex } = dragState;

        if (draggedField) {
            if (draggedIndex !== null) {
                // Reordering existing field
                const newFields = [...templateFields];
                const [removed] = newFields.splice(draggedIndex, 1);
                const insertIndex = dropTargetIndex !== null ? dropTargetIndex : newFields.length;
                // Adjust insert index if we're moving forward in the list
                const adjustedIndex = draggedIndex < insertIndex ? insertIndex - 1 : insertIndex;
                newFields.splice(adjustedIndex, 0, removed);
                setTemplateFields(newFields);
            } else {
                // Adding new field from available list
                const insertIndex = dropTargetIndex !== null ? dropTargetIndex : templateFields.length;
                const newFields = [...templateFields];
                newFields.splice(insertIndex, 0, draggedField);
                setTemplateFields(newFields);
            }
        }

        setDragState({
            draggedField: null,
            draggedIndex: null,
            dropTargetIndex: null,
            isDraggingOver: false,
        });
    }, [dragState, templateFields, setTemplateFields]);

    // Handle drag end
    const handleDragEnd = useCallback(() => {
        setDragState({
            draggedField: null,
            draggedIndex: null,
            dropTargetIndex: null,
            isDraggingOver: false,
        });
    }, []);

    // Handle drop on available fields list to remove from template
    const handleDropOnAvailable = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const { draggedIndex, draggedField } = dragState;
        
        if (draggedIndex !== null && draggedField) {
            // Remove the field from template
            const newFields = templateFields.filter((_, index) => index !== draggedIndex);
            setTemplateFields(newFields);
        }
        
        setDragState({
            draggedField: null,
            draggedIndex: null,
            dropTargetIndex: null,
            isDraggingOver: false,
        });
    }, [dragState, templateFields, setTemplateFields]);

    // Handle drag over available fields list
    const handleDragOverAvailable = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dragState.draggedIndex !== null) {
            e.dataTransfer.dropEffect = "move";
        }
    }, [dragState.draggedIndex]);

    // Handle click to add field
    const handleAddField = useCallback((field: typeof TextGenField[keyof typeof TextGenField]) => {
        const newField: TemplateField = {
            id: `${field.name}-${Date.now()}`,
            name: field.name,
            originalName: field.name,
            icon: field.icon,
        };
        setTemplateFields([...templateFields, newField]);
    }, [templateFields, setTemplateFields]);

    return {
        dragState,
        templateFields,
        setTemplateFields,
        handlers: {
            handleDragStartFromAvailable,
            handleDragStartFromTemplate,
            handleDragOver,
            handleDragOverItem,
            handleDragLeave,
            handleDrop,
            handleDragEnd,
            handleDropOnAvailable,
            handleDragOverAvailable,
            handleAddField,
        },
    };
}
