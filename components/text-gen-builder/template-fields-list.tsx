import { Input } from "@heroui/input";
import { useRef, useEffect, useCallback, useState, DragEvent } from "react";
import { TemplateField, ScrollState } from "./types";
import FieldItem from "./field-item";

interface TemplateFieldsListProps {
    templateName: string;
    onTemplateNameChange: (name: string) => void;
    templateFields: TemplateField[];
    setTemplateFields: React.Dispatch<React.SetStateAction<TemplateField[]>>;
    isDraggingOver: boolean;
    dropTargetIndex: number | null;
    draggedIndex: number | null;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onDragOverItem: (e: DragEvent<HTMLDivElement>, index: number) => void;
    onDragStartFromTemplate: (e: DragEvent<HTMLDivElement>, index: number) => void;
    onDragEnd: () => void;
}

export default function TemplateFieldsList({
    templateName,
    onTemplateNameChange,
    templateFields,
    setTemplateFields,
    isDraggingOver,
    dropTargetIndex,
    draggedIndex,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragOverItem,
    onDragStartFromTemplate,
    onDragEnd,
}: TemplateFieldsListProps) {
    const [scrollState, setScrollState] = useState<ScrollState>({ atTop: true, atBottom: false });
    const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
    const [editingFieldName, setEditingFieldName] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    // Check scroll position and update fade visibility
    const checkScrollPosition = useCallback(() => {
        const element = listRef.current;
        if (!element) return;
        const threshold = 10;
        const atTop = element.scrollTop <= threshold;
        const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= threshold;
        setScrollState({ atTop, atBottom });
    }, []);

    // Set up scroll listeners
    useEffect(() => {
        const list = listRef.current;
        checkScrollPosition();
        list?.addEventListener('scroll', checkScrollPosition);
        return () => {
            list?.removeEventListener('scroll', checkScrollPosition);
        };
    }, [checkScrollPosition]);

    // Re-check scroll positions when content changes
    useEffect(() => {
        checkScrollPosition();
    }, [templateFields.length, checkScrollPosition]);

    // Handle start editing field name
    const handleStartEditField = (field: TemplateField) => {
        setEditingFieldId(field.id);
        setEditingFieldName(field.name);
    };

    // Handle save field name
    const handleSaveFieldName = (id: string) => {
        if (editingFieldName.trim()) {
            setTemplateFields(templateFields.map(field => 
                field.id === id ? { ...field, name: editingFieldName.trim() } : field
            ));
        }
        setEditingFieldId(null);
        setEditingFieldName("");
    };

    // Handle cancel editing
    const handleCancelEdit = () => {
        setEditingFieldId(null);
        setEditingFieldName("");
    };

    // Handle delete field
    const handleDeleteField = (id: string) => {
        setTemplateFields(templateFields.filter(field => field.id !== id));
    };

    return (
        <div 
            className={`flex flex-col bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg w-2/3 h-[500px] transition-colors ${isDraggingOver ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <Input 
                size="lg" 
                placeholder="Untitled Template" 
                value={templateName}
                onValueChange={onTemplateNameChange}
                variant="underlined" 
                className="pt-4 mb-4" 
            />
            {/* Template fields */}
            <div className="relative flex-1 min-h-0">
                {/* Top fade gradient */}
                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-transparent z-10 pointer-events-none rounded-t-lg transition-opacity duration-200 ${scrollState.atTop ? 'opacity-0' : 'opacity-100'}`} />
                {/* Bottom fade gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-200 dark:from-zinc-800 to-transparent z-10 pointer-events-none rounded-b-lg transition-opacity duration-200 ${scrollState.atBottom ? 'opacity-0' : 'opacity-100'}`} />
                <div ref={listRef} className="flex flex-col gap-y-2 h-full overflow-y-auto py-2 pr-3 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600">
                    {templateFields.length === 0 ? (
                        <div className={`h-full min-h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg transition-colors ${isDraggingOver ? 'border-primary bg-primary/10' : 'border-zinc-400 dark:border-zinc-600'}`}>
                            <span className="text-zinc-500 dark:text-zinc-400">Drag fields here or click to add</span>
                        </div>
                    ) : (
                        <>
                            {templateFields.map((field, index) => (
                                <FieldItem
                                    key={field.id}
                                    field={field}
                                    index={index}
                                    draggedIndex={draggedIndex}
                                    dropTargetIndex={dropTargetIndex}
                                    editingFieldId={editingFieldId}
                                    editingFieldName={editingFieldName}
                                    onDragStart={onDragStartFromTemplate}
                                    onDragOver={onDragOverItem}
                                    onDragEnd={onDragEnd}
                                    onStartEdit={handleStartEditField}
                                    onSaveFieldName={handleSaveFieldName}
                                    onCancelEdit={handleCancelEdit}
                                    onDelete={handleDeleteField}
                                    onEditingNameChange={setEditingFieldName}
                                />
                            ))}
                            {/* Drop indicator at the end */}
                            {dropTargetIndex === templateFields.length && (
                                <div className="relative h-0.5 bg-primary rounded-full mt-1">
                                    <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                                    <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
