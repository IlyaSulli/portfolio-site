import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useEffect, useState, DragEvent } from "react";
import { TemplateField } from "../../types";
import { Plus, Layers } from "lucide-react";
import IconColorPicker from "./IconColorPicker";
import FieldItem from "./FieldItem";
import { useScrollFade, ScrollFadeGradients } from "./useScrollFade";

interface TemplateFieldsListProps {
    templateName: string;
    onTemplateNameChange: (name: string) => void;
    templateIcon: string;
    templateColor: string;
    onTemplateIconChange: (icon: string) => void;
    onTemplateColorChange: (color: string) => void;
    templateFields: TemplateField[];
    setTemplateFields: (fields: TemplateField[] | ((prev: TemplateField[]) => TemplateField[])) => void;
    isDraggingOver: boolean;
    dropTargetIndex: number | null;
    draggedIndex: number | null;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onDragOverItem: (e: DragEvent<HTMLDivElement>, index: number) => void;
    onDragStartFromTemplate: (e: DragEvent<HTMLDivElement>, index: number) => void;
    onDragEnd: () => void;
    onAddFieldClick?: () => void;
}

export default function TemplateFieldsList({
    templateName,
    onTemplateNameChange,
    templateIcon,
    templateColor,
    onTemplateIconChange,
    onTemplateColorChange,
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
    onAddFieldClick,
}: TemplateFieldsListProps) {
    const { scrollState, listRef, checkScrollPosition } = useScrollFade();
    const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
    const [editingFieldName, setEditingFieldName] = useState("");

    // Re-check scroll positions when content changes
    useEffect(() => {
        checkScrollPosition();
    }, [templateFields.length, checkScrollPosition]);

    const handleStartEditField = (field: TemplateField) => {
        setEditingFieldId(field.id);
        setEditingFieldName(field.name);
    };

    const handleSaveFieldName = (id: string) => {
        if (editingFieldName.trim()) {
            setTemplateFields((prev: TemplateField[]) => 
                prev.map(field => 
                    field.id === id ? { ...field, name: editingFieldName.trim() } : field
                )
            );
        }
        setEditingFieldId(null);
        setEditingFieldName("");
    };

    const handleCancelEdit = () => {
        setEditingFieldId(null);
        setEditingFieldName("");
    };

    const handleDeleteField = (id: string) => {
        setTemplateFields((prev: TemplateField[]) => prev.filter(field => field.id !== id));
    };

    return (
        <div 
            className={`flex flex-col backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 p-4 rounded-lg w-full md:w-2/3 h-[500px] transition-colors shadow-lg ${isDraggingOver ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {/* Header with Icon Picker and Name Input */}
            <div className="flex items-center gap-3 pt-4 mb-4">
                <IconColorPicker
                    selectedIcon={templateIcon}
                    selectedColor={templateColor}
                    onIconChange={onTemplateIconChange}
                    onColorChange={onTemplateColorChange}
                />
                <Input 
                    size="lg" 
                    placeholder="Untitled Template" 
                    value={templateName}
                    onValueChange={onTemplateNameChange}
                    onBlur={() => {
                        if (!templateName.trim()) {
                            onTemplateNameChange("Untitled Template");
                        }
                    }}
                    maxLength={64}
                    variant="underlined" 
                    className="flex-1"
                />
            </div>

            {/* Template fields list */}
            <div className="relative flex-1 min-h-0">
                <ScrollFadeGradients scrollState={scrollState} />
                <div 
                    ref={listRef} 
                    className="flex flex-col gap-y-2 h-full overflow-y-auto py-2 pr-3 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600"
                >
                    {templateFields.length === 0 ? (
                        <EmptyState isDraggingOver={isDraggingOver} />
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
                                <DropIndicator />
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Add Field Button */}
            {onAddFieldClick && (
                <Button 
                    color="primary" 
                    variant="flat" 
                    className="mt-4 w-full md:hidden"
                    startContent={<Plus size={16} />}
                    onPress={onAddFieldClick}
                >
                    Add Field
                </Button>
            )}
        </div>
    );
}

function EmptyState({ isDraggingOver }: { isDraggingOver: boolean }) {
    return (
        <div className={`h-full min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${isDraggingOver ? 'border-primary bg-primary/10' : 'border-white/30 dark:border-white/20'}`}>
            <div className="hidden md:flex flex-col items-center gap-2 text-center px-4">
                <Layers size={32} className="text-white/40" />
                <span className="text-zinc-500 dark:text-zinc-400">Drag fields here or click to add</span>
            </div>
            <div className="flex md:hidden flex-col items-center gap-3 text-center px-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Plus size={28} className="text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-medium">No fields yet</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">Tap the button below to add your first field</span>
                </div>
            </div>
        </div>
    );
}

function DropIndicator() {
    return (
        <div className="relative h-0.5 bg-primary rounded-full mt-1">
            <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
            <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
        </div>
    );
}
