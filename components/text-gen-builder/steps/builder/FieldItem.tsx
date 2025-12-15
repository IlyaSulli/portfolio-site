import { Input } from "@heroui/input";
import { GripVertical, Check, X, Trash2 } from "lucide-react";
import { TemplateField } from "../../types";
import { DragEvent, createElement } from "react";

interface FieldItemProps {
    field: TemplateField;
    index: number;
    draggedIndex: number | null;
    dropTargetIndex: number | null;
    editingFieldId: string | null;
    editingFieldName: string;
    onDragStart: (e: DragEvent<HTMLDivElement>, index: number) => void;
    onDragOver: (e: DragEvent<HTMLDivElement>, index: number) => void;
    onDragEnd: () => void;
    onStartEdit: (field: TemplateField) => void;
    onSaveFieldName: (id: string) => void;
    onCancelEdit: () => void;
    onDelete: (id: string) => void;
    onEditingNameChange: (value: string) => void;
}

export default function FieldItem({
    field,
    index,
    draggedIndex,
    dropTargetIndex,
    editingFieldId,
    editingFieldName,
    onDragStart,
    onDragOver,
    onDragEnd,
    onStartEdit,
    onSaveFieldName,
    onCancelEdit,
    onDelete,
    onEditingNameChange,
}: FieldItemProps) {
    const isEditing = editingFieldId === field.id;
    const isDragging = draggedIndex === index;
    const showDropIndicator = dropTargetIndex === index;

    return (
        <div className="relative">
            {/* Drop indicator line */}
            {showDropIndicator && (
                <div className="absolute -top-1 left-0 right-0 h-0.5 bg-primary rounded-full z-10">
                    <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                    <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                </div>
            )}
            <div
                className={`backdrop-blur-sm bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20 px-4 py-3 rounded-lg flex flex-row justify-between items-center cursor-grab active:cursor-grabbing transition-all shadow-sm ${isDragging ? 'opacity-50' : ''}`}
                draggable={!isEditing}
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragEnd={onDragEnd}
            >
                <div className="flex flex-row items-center flex-1">
                    <GripVertical size={16} className="text-white/50 mr-2 flex-shrink-0" />
                    <span className="flex-shrink-0">
                        {createElement(field.icon, { size: 20, color: "hsl(var(--heroui-primary))" })}
                    </span>
                    <div className="pl-4 flex-1">
                        {isEditing ? (
                            <Input
                                size="sm"
                                value={editingFieldName}
                                onValueChange={onEditingNameChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onSaveFieldName(field.id);
                                    } else if (e.key === 'Escape') {
                                        onCancelEdit();
                                    }
                                }}
                                autoFocus
                                className="text-sm"
                            />
                        ) : (
                            <div className="flex flex-col">
                                <span className="font-medium cursor-pointer" onClick={() => onStartEdit(field)}>
                                    {field.name}
                                </span>
                                {field.name !== field.originalName && (
                                    <span className="text-xs italic text-white/50">
                                        {field.originalName}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 -m-2">
                    {isEditing ? (
                        <>
                            <button 
                                onClick={() => onSaveFieldName(field.id)}
                                className="p-2 hover:bg-white/20 dark:hover:bg-white/15 rounded transition-colors"
                            >
                                <Check size={16} className="text-green-400"/>
                            </button>
                            <button 
                                onClick={onCancelEdit}
                                className="p-2 hover:bg-white/20 dark:hover:bg-white/15 rounded transition-colors"
                            >
                                <X size={16} className="text-gray-300"/>
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => onDelete(field.id)}
                            className="p-2 hover:bg-white/20 dark:hover:bg-white/15 rounded transition-colors"
                        >
                            <Trash2 size={16} className="text-red-400"/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
