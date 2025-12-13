import { Input } from "@heroui/input";
import { Plus, Search } from "lucide-react";
import { TextGenField } from "@/config/textGenField";
import { useRef, useEffect, useCallback, useState, DragEvent } from "react";
import { TemplateField, ScrollState } from "./types";

interface AvailableFieldsListProps {
    onAddField: (field: typeof TextGenField[keyof typeof TextGenField]) => void;
    onDragStart: (e: DragEvent<HTMLDivElement>, field: typeof TextGenField[keyof typeof TextGenField]) => void;
    onDragEnd: () => void;
}

export default function AvailableFieldsList({
    onAddField,
    onDragStart,
    onDragEnd,
}: AvailableFieldsListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [scrollState, setScrollState] = useState<ScrollState>({ atTop: true, atBottom: false });
    const listRef = useRef<HTMLDivElement>(null);

    // Filter available fields based on search query
    const filteredFields = Object.values(TextGenField).filter(field =>
        field.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
    }, [filteredFields.length, checkScrollPosition]);

    return (
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
                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${scrollState.atTop ? 'opacity-0' : 'opacity-100'}`} />
                {/* Bottom fade gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${scrollState.atBottom ? 'opacity-0' : 'opacity-100'}`} />
                <div ref={listRef} className="flex flex-col gap-y-2 h-full overflow-y-auto py-2 pr-3 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600">
                    {filteredFields.map(field => (
                        <div 
                            key={field.name} 
                            className="bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 border-2 px-4 py-3 rounded-lg flex flex-row justify-between items-center cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, field)}
                            onDragEnd={onDragEnd}
                            onClick={() => onAddField(field)}
                        >
                            <div className="flex flex-row items-center">
                                <field.icon size={20} color="hsl(var(--heroui-primary))"/>
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
