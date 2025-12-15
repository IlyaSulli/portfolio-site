import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { useRef, useEffect, useCallback, useState, DragEvent, ComponentType, createElement } from "react";
import { TemplateField, ScrollState } from "./types";
import FieldItem from "./field-item";
import { 
    Plus, 
    Layers, 
    FileText, 
    Star, 
    Heart, 
    Bookmark, 
    Tag, 
    Clock, 
    User, 
    Settings, 
    Folder, 
    Image, 
    Music, 
    Video, 
    Download, 
    Upload, 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    Camera, 
    Calendar,
    Palette,
    CircleCheck
} from "lucide-react";

interface TemplateFieldsListProps {
    templateName: string;
    onTemplateNameChange: (name: string) => void;
    templateIcon?: string;
    templateColor?: string;
    onTemplateIconChange?: (icon: string) => void;
    onTemplateColorChange?: (color: string) => void;
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
    onAddFieldClick?: () => void;
}

// Icon categories and options
const ALL_ICONS = [FileText, Star, Heart, Bookmark, Tag, Clock, Calendar, User, Mail, Phone, MapPin, Image, Music, Video, Camera, Download, Upload, Settings, Globe, Folder, CircleCheck] as const;

// Icon name to component mapping
const ICON_MAP = {
    FileText, Star, Heart, Bookmark, Tag, Clock, Calendar, User, Mail, Phone, MapPin, Image, Music, Video, Camera, Download, Upload, Settings, Globe, Folder, CircleCheck
} as const;

// Color options with hex values for storage
const COLOR_OPTIONS = [
    { name: "Blue", value: "3B82F6", tailwind: "text-blue-500" },
    { name: "Green", value: "22C55E", tailwind: "text-green-500" },
    { name: "Red", value: "EF4444", tailwind: "text-red-500" },
    { name: "Purple", value: "A855F7", tailwind: "text-purple-500" },
    { name: "Orange", value: "F97316", tailwind: "text-orange-500" },
    { name: "Pink", value: "EC4899", tailwind: "text-pink-500" },
    { name: "Indigo", value: "6366F1", tailwind: "text-indigo-500" },
] as const;

export default function TemplateFieldsList({
    templateName,
    onTemplateNameChange,
    templateIcon = "FileText",
    templateColor = "3B82F6",
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
    const [scrollState, setScrollState] = useState<ScrollState>({ atTop: true, atBottom: false });
    const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
    const [editingFieldName, setEditingFieldName] = useState("");
    const [isIconPopoverOpen, setIsIconPopoverOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    
    // Get current template icon component and color
    const getCurrentIconComponent = () => {
        return ICON_MAP[templateIcon as keyof typeof ICON_MAP] || CircleCheck;
    };
    
    const getCurrentColor = () => {
        return COLOR_OPTIONS.find(color => color.value === templateColor) || COLOR_OPTIONS[0];
    };

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

    // Handle icon selection
    const handleIconSelect = (IconComponent: ComponentType<{ size?: number }>) => {
        const iconName = Object.keys(ICON_MAP).find(key => 
            ICON_MAP[key as keyof typeof ICON_MAP] === IconComponent
        );
        if (iconName && onTemplateIconChange) {
            onTemplateIconChange(iconName);
        }
        setIsIconPopoverOpen(false);
    };

    // Handle color selection
    const handleColorSelect = (color: typeof COLOR_OPTIONS[number]) => {
        if (onTemplateColorChange) {
            onTemplateColorChange(color.value);
        }
    };

    return (
        <div 
            className={`flex flex-col backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 p-4 rounded-lg w-full md:w-2/3 h-[500px] transition-colors shadow-lg ${isDraggingOver ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="flex items-center gap-3 pt-4 mb-4">
                {/* Icon Selector */}
                <Popover 
                    isOpen={isIconPopoverOpen} 
                    onOpenChange={setIsIconPopoverOpen}
                    placement="bottom-start"
                >
                    <PopoverTrigger>
                        <Button
                            isIconOnly
                            variant="flat"
                            size="lg"
                            className={`hover:scale-105 transition-all`}
                            style={{ color: `#${templateColor}` }}
                            aria-label="Select template icon"
                        >
                            {createElement(getCurrentIconComponent(), { size: 24 })}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="px-2 py-3">
                            <h4 className="text-lg font-semibold mb-3">Choose Icon</h4>
                            
                            {/* Colour Selection */}
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                    {COLOR_OPTIONS.map((color: typeof COLOR_OPTIONS[number]) => (
                                        <Button
                                            key={color.name}
                                            isIconOnly
                                            size="sm"
                                            variant="flat"
                                            className={`min-w-8 h-8 transition-all ${getCurrentColor().value === color.value ? 'ring-2 ring-offset-1' : ''}`}
                                            style={{ 
                                                backgroundColor: `#${color.value}`, 
                                                color: 'transparent',
                                                ...(getCurrentColor().value === color.value && {
                                                    '--tw-ring-color': `#${color.value}`,
                                                    filter: 'brightness(0.8)',
                                                    borderColor: `#${color.value}`,
                                                    borderWidth: '2px'
                                                })
                                            }}
                                            onPress={() => handleColorSelect(color)}
                                            aria-label={`Select ${color.name} color`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Icon Selection */}
                            <div>
                                <p className="text-sm font-medium mb-2">Icon:</p>
                                <div className="flex flex-wrap gap-1 max-h-64 overflow-y-auto">
                                    {ALL_ICONS.map((IconComponent, index) => (
                                        <Button
                                            key={index}
                                            isIconOnly
                                            size="sm"
                                            variant={getCurrentIconComponent() === IconComponent ? "solid" : "flat"}
                                            style={{ 
                                                backgroundColor: getCurrentIconComponent() === IconComponent ? `#${templateColor}` : undefined,
                                                color: getCurrentIconComponent() === IconComponent ? 'white' : `#${templateColor}`
                                            }}
                                            onPress={() => handleIconSelect(IconComponent)}
                                            aria-label="Select icon"
                                        >
                                            {createElement(IconComponent, { size: 14 })}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Template Name Input */}
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
            {/* Template fields */}
            <div className="relative flex-1 min-h-0">
                {/* Top fade gradient */}
                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/30 dark:from-black/30 to-transparent z-10 pointer-events-none rounded-t-lg transition-opacity duration-200 ${scrollState.atTop ? 'opacity-0' : 'opacity-100'}`} />
                {/* Bottom fade gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/30 dark:from-black/30 to-transparent z-10 pointer-events-none rounded-b-lg transition-opacity duration-200 ${scrollState.atBottom ? 'opacity-0' : 'opacity-100'}`} />
                <div ref={listRef} className="flex flex-col gap-y-2 h-full overflow-y-auto py-2 pr-3 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600">
                    {templateFields.length === 0 ? (
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
