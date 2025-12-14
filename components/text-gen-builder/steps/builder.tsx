import { TextGenField } from "@/config/textGenField";
import { useState, DragEvent } from "react";
import { TemplateField, Template } from "./../types";
import AvailableFieldsList from "./../available-fields-list";
import TemplateFieldsList from "./../template-fields-list";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Search, Plus } from "lucide-react";

interface StepBuilderProps {
    template: Template;
    onTemplateChange: (template: Template) => void;
}

export default function StepBuilder({ template, onTemplateChange }: StepBuilderProps) {
    const [draggedField, setDraggedField] = useState<TemplateField | null>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [showAddFieldModal, setShowAddFieldModal] = useState(false);
    const [modalSearchQuery, setModalSearchQuery] = useState("");

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

    // Handle add field from modal (mobile)
    const handleAddFieldFromModal = (field: typeof TextGenField[keyof typeof TextGenField]) => {
        handleAddField(field);
        setShowAddFieldModal(false);
        setModalSearchQuery("");
    };

    // Filter available fields based on search query for modal
    const filteredFieldsForModal = Object.values(TextGenField).filter(field =>
        field.name.toLowerCase().includes(modalSearchQuery.toLowerCase())
    );

    // Handle template name change
    const handleTemplateNameChange = (name: string) => {
        onTemplateChange({ ...template, name });
    };

    return (
        <div className="mt-8 gap-8 flex flex-col md:flex-row w-full">
            <AvailableFieldsList
                onAddField={handleAddField}
                onDragStart={handleDragStartFromAvailable}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOverAvailable}
                onDrop={handleDropOnAvailable}
                className="hidden md:flex md:w-1/3"
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
                onAddFieldClick={() => setShowAddFieldModal(true)}
            />

            {/* Mobile Add Field Modal */}
            <Modal 
                isOpen={showAddFieldModal} 
                onOpenChange={setShowAddFieldModal} 
                placement="bottom"
                backdrop="blur"
                hideCloseButton
                classNames={{
                    wrapper: "items-end",
                    base: "rounded-b-none rounded-t-2xl m-0 max-h-[60vh]",
                }}
            >
                <ModalContent className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-lg">
                    <ModalHeader className="flex flex-col gap-1">
                        Add Field
                    </ModalHeader>
                    <ModalBody className="pb-0">
                        <Input 
                            placeholder="Search fields..." 
                            variant="bordered" 
                            isClearable 
                            startContent={<Search size={16} />} 
                            className="mb-4"
                            value={modalSearchQuery}
                            onValueChange={setModalSearchQuery}
                        />
                        <div className="flex flex-col gap-2 overflow-y-auto max-h-[30vh] pb-2">
                            {filteredFieldsForModal.map(field => (
                                <div 
                                    key={field.name} 
                                    className="backdrop-blur-sm bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20 px-4 py-3 rounded-lg flex flex-row justify-between items-center hover:border-primary hover:bg-white/40 dark:hover:bg-white/15 transition-all shadow-sm cursor-pointer"
                                    onClick={() => handleAddFieldFromModal(field)}
                                >
                                    <div className="flex flex-row items-center">
                                        <field.icon size={20} color="hsl(var(--heroui-primary))"/>
                                        <span className="font-medium pl-4">{field.name}</span>
                                    </div>
                                    <Plus size={16}/>
                                </div>
                            ))}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="default" 
                            variant="flat" 
                            onPress={() => {
                                setShowAddFieldModal(false);
                                setModalSearchQuery("");
                            }}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
