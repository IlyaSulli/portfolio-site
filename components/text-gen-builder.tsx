import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Plus, Search, Trash2, GripVertical, Check, X } from "lucide-react"
import { TextGenField } from "@/config/textGenField";
import { useState, DragEvent, useRef, useEffect, useCallback } from "react";

interface TemplateField {
    id: string;
    name: string;
    originalName: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
}

export default function TemplateBuilder(){
    const [templateFields, setTemplateFields] = useState<TemplateField[]>([]);
    const [draggedField, setDraggedField] = useState<TemplateField | null>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
    const [editingFieldName, setEditingFieldName] = useState("");
    
    // Scroll position state for fade visibility
    const [availableScrollState, setAvailableScrollState] = useState({ atTop: true, atBottom: false });
    const [templateScrollState, setTemplateScrollState] = useState({ atTop: true, atBottom: false });
    const availableListRef = useRef<HTMLDivElement>(null);
    const templateListRef = useRef<HTMLDivElement>(null);

    // Check scroll position and update fade visibility
    const checkScrollPosition = useCallback((element: HTMLDivElement | null, setState: React.Dispatch<React.SetStateAction<{ atTop: boolean; atBottom: boolean }>>) => {
        if (!element) return;
        const threshold = 10; // pixels from edge to consider "at" top/bottom
        const atTop = element.scrollTop <= threshold;
        const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= threshold;
        setState({ atTop, atBottom });
    }, []);

    // Filter available fields based on search query
    const filteredFields = Object.values(TextGenField).filter(field =>
        field.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Set up scroll listeners
    useEffect(() => {
        const availableList = availableListRef.current;
        const templateList = templateListRef.current;

        const handleAvailableScroll = () => checkScrollPosition(availableList, setAvailableScrollState);
        const handleTemplateScroll = () => checkScrollPosition(templateList, setTemplateScrollState);

        // Initial check
        handleAvailableScroll();
        handleTemplateScroll();

        availableList?.addEventListener('scroll', handleAvailableScroll);
        templateList?.addEventListener('scroll', handleTemplateScroll);

        return () => {
            availableList?.removeEventListener('scroll', handleAvailableScroll);
            templateList?.removeEventListener('scroll', handleTemplateScroll);
        };
    }, [checkScrollPosition]);

    // Re-check scroll positions when content changes
    useEffect(() => {
        checkScrollPosition(availableListRef.current, setAvailableScrollState);
    }, [filteredFields.length, checkScrollPosition]);

    useEffect(() => {
        checkScrollPosition(templateListRef.current, setTemplateScrollState);
    }, [templateFields.length, checkScrollPosition]);

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
        // If dragging in the bottom half, show indicator after this item
        if (e.clientY > midpoint) {
            setDropTargetIndex(index + 1);
        } else {
            setDropTargetIndex(index);
        }
    };

    // Handle drag leave
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        // Only set to false if leaving the container entirely
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
                // Reordering within template
                const newFields = [...templateFields];
                const [removed] = newFields.splice(draggedIndex, 1);
                const insertIndex = dropTargetIndex !== null ? dropTargetIndex : newFields.length;
                newFields.splice(insertIndex, 0, removed);
                setTemplateFields(newFields);
            } else {
                // Adding new field from available fields
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

    // Handle delete field
    const handleDeleteField = (id: string) => {
        setTemplateFields(templateFields.filter(field => field.id !== id));
    };

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

    return(
        <div className="flex flex-col dark:bg-zinc-900 bg-zinc-100 px-8 py-8 rounded-2xl">
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-semibold">Template Builder</span>
                <div className="flex gap-2">
                    <Button color="default" variant="flat">Cancel</Button>
                    <Button color="primary" variant="flat">Next</Button>
                </div>
            </div>
            {/* Available Fields */}
            <div className="mt-8 gap-8 flex flex-row w-full">
                <div className="flex flex-col w-1/3">
                    <span className="font-semibold">Available Fields</span>
                    <span className="opacity-70 tracking-tight">Click or drag the fields to set up your template</span>
                    <Input 
                        placeholder="Search..." 
                        variant="underlined" 
                        isClearable 
                        startContent={<Search />} 
                        className="pt-4 mb-4"
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                    />
                    <div className="relative h-[400px]">
                        {/* Top fade gradient */}
                        <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${availableScrollState.atTop ? 'opacity-0' : 'opacity-100'}`} />
                        {/* Bottom fade gradient */}
                        <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${availableScrollState.atBottom ? 'opacity-0' : 'opacity-100'}`} />
                        <div ref={availableListRef} className="flex flex-col gap-y-2 h-full overflow-y-auto py-2 pr-3 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600">
                        { filteredFields.map(field => (
                        <div 
                            key={field.name} 
                            className="bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 border-2 px-4 py-3 rounded-lg flex flex-row justify-between items-center cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => handleDragStartFromAvailable(e, field)}
                            onDragEnd={handleDragEnd}
                            onClick={() => handleAddField(field)}
                        >
                            <div className="flex flex-row items-center">
                                <field.icon size={20} color="hsl(var(--heroui-primary))"/>
                                <span className="font-medium pl-4">{field.name}</span>
                            </div>
                            <Plus size={16}/>
                        </div>
                    ))
                    }
                        </div>
                    </div>
                </div>
                <div 
                    className={`flex flex-col bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg w-2/3 h-[500px] transition-colors ${isDraggingOver ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Input size="lg" placeholder="Untitled Template" defaultValue="Untitled Template" variant="underlined" className="pt-4 mb-4" />
                    {/* Template fields */}
                    <div className="relative flex-1 min-h-0">
                        {/* Top fade gradient */}
                        <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-transparent z-10 pointer-events-none rounded-t-lg transition-opacity duration-200 ${templateScrollState.atTop ? 'opacity-0' : 'opacity-100'}`} />
                        {/* Bottom fade gradient */}
                        <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-200 dark:from-zinc-800 to-transparent z-10 pointer-events-none rounded-b-lg transition-opacity duration-200 ${templateScrollState.atBottom ? 'opacity-0' : 'opacity-100'}`} />
                        <div ref={templateListRef} className="flex flex-col gap-y-2 h-full overflow-y-auto py-2 pr-3 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600">
                            {templateFields.length === 0 ? (
                                <div className={`h-full min-h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg transition-colors ${isDraggingOver ? 'border-primary bg-primary/10' : 'border-zinc-400 dark:border-zinc-600'}`}>
                                    <span className="text-zinc-500 dark:text-zinc-400">Drag fields here or click to add</span>
                                </div>
                            ) : (
                            <>
                                {templateFields.map((field, index) => (
                                    <div key={field.id} className="relative">
                                        {/* Drop indicator line */}
                                        {dropTargetIndex === index && (
                                            <div className="absolute -top-1 left-0 right-0 h-0.5 bg-primary rounded-full z-10">
                                                <div className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                                                <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-primary rounded-full" />
                                            </div>
                                        )}
                                        <div
                                            className={`bg-zinc-100 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 border-2 px-4 py-3 rounded-lg flex flex-row justify-between items-center cursor-grab active:cursor-grabbing transition-all ${draggedIndex === index ? 'opacity-50' : ''}`}
                                            draggable={editingFieldId !== field.id}
                                            onDragStart={(e) => handleDragStartFromTemplate(e, index)}
                                            onDragOver={(e) => handleDragOverItem(e, index)}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <div className="flex flex-row items-center flex-1">
                                                <GripVertical size={16} className="text-zinc-400 mr-2 flex-shrink-0" />
                                                <span className="flex-shrink-0">
                                                    <field.icon size={20} color="hsl(var(--heroui-primary))"/>
                                                </span>
                                                <div className="pl-4 flex-1">
                                                    {editingFieldId === field.id ? (
                                                        <Input
                                                            size="sm"
                                                            value={editingFieldName}
                                                            onValueChange={setEditingFieldName}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    handleSaveFieldName(field.id);
                                                                } else if (e.key === 'Escape') {
                                                                    handleCancelEdit();
                                                                }
                                                            }}
                                                            autoFocus
                                                            className="text-sm"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col">
                                                            <span className="font-medium cursor-pointer" onClick={() => handleStartEditField(field)}>
                                                                {field.name}
                                                            </span>
                                                            {field.name !== field.originalName && (
                                                                <span className="text-xs italic text-zinc-500 dark:text-zinc-400">
                                                                    {field.originalName}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {editingFieldId === field.id ? (
                                                    <>
                                                        <button 
                                                            onClick={() => handleSaveFieldName(field.id)}
                                                            className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
                                                        >
                                                            <Check size={16} className="text-green-500"/>
                                                        </button>
                                                        <button 
                                                            onClick={handleCancelEdit}
                                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900/30 rounded transition-colors"
                                                        >
                                                            <X size={16} className="text-gray-500"/>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleDeleteField(field.id)}
                                                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                                    >
                                                        <Trash2 size={16} className="text-red-500"/>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
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
            </div>
        </div>
    )
}