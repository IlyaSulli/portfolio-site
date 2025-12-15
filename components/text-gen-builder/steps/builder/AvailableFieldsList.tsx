import { Input } from "@heroui/input";
import { Plus, Search } from "lucide-react";
import { TextGenField } from "@/config/textGenField";
import { useEffect, DragEvent, createElement } from "react";
import { useScrollFade, ScrollFadeGradients } from "./useScrollFade";

interface AvailableFieldsListProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onAddField: (field: typeof TextGenField[keyof typeof TextGenField]) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, field: typeof TextGenField[keyof typeof TextGenField]) => void;
    onDragEnd: () => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    className?: string;
}

export default function AvailableFieldsList({
    searchQuery,
    onSearchChange,
    onAddField,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    className,
}: AvailableFieldsListProps) {
    const { scrollState, listRef, checkScrollPosition } = useScrollFade();

    const filteredFields = Object.values(TextGenField).filter(field =>
        field.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Re-check scroll positions when content changes
    useEffect(() => {
        checkScrollPosition();
    }, [filteredFields.length, checkScrollPosition]);

    return (
        <div className={`flex flex-col ${className || ''}`}>
            <span className="font-semibold">Available Fields</span>
            <span className="opacity-70 tracking-tight">Click or drag the fields to set up your template</span>
            <Input 
                placeholder="Search..." 
                variant="underlined" 
                isClearable 
                startContent={<Search />} 
                className="pt-4 mb-4"
                value={searchQuery}
                onValueChange={onSearchChange}
            />
            <div 
                className="relative h-[400px] backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-lg p-3 shadow-lg" 
                onDragOver={onDragOver} 
                onDrop={onDrop}
            >
                <ScrollFadeGradients scrollState={scrollState} />
                <div 
                    ref={listRef} 
                    className="flex flex-col gap-y-2 h-full overflow-y-auto py-2 pr-3 scrollbar-thin scrollbar-thumb-white/30 dark:scrollbar-thumb-white/20"
                >
                    {filteredFields.map(field => (
                        <div 
                            key={field.name} 
                            className="backdrop-blur-sm bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20 px-4 py-3 rounded-lg flex flex-row justify-between items-center cursor-grab active:cursor-grabbing hover:border-primary hover:bg-white/40 dark:hover:bg-white/15 transition-all shadow-sm"
                            draggable
                            onDragStart={(e) => onDragStart(e, field)}
                            onDragEnd={onDragEnd}
                            onClick={() => onAddField(field)}
                        >
                            <div className="flex flex-row items-center">
                                {createElement(field.icon, { size: 20, color: "hsl(var(--heroui-primary))" })}
                                <span className="font-medium pl-4">{field.name}</span>
                            </div>
                            <Plus size={16}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
