import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Search, Plus } from "lucide-react";
import { TextGenField } from "@/config/textGenField";
import { createElement, useState } from "react";

interface AddFieldModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onAddField: (field: typeof TextGenField[keyof typeof TextGenField]) => void;
}

export default function AddFieldModal({ isOpen, onOpenChange, onAddField }: AddFieldModalProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFields = Object.values(TextGenField).filter(field =>
        field.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddField = (field: typeof TextGenField[keyof typeof TextGenField]) => {
        onAddField(field);
        onOpenChange(false);
        setSearchQuery("");
    };

    const handleClose = () => {
        onOpenChange(false);
        setSearchQuery("");
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
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
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                    />
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[30vh] pb-2">
                        {filteredFields.map(field => (
                            <div 
                                key={field.name} 
                                className="backdrop-blur-sm bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20 px-4 py-3 rounded-lg flex flex-row justify-between items-center hover:border-primary hover:bg-white/40 dark:hover:bg-white/15 transition-all shadow-sm cursor-pointer"
                                onClick={() => handleAddField(field)}
                            >
                                <div className="flex flex-row items-center">
                                    {createElement(field.icon, { size: 20, color: "hsl(var(--heroui-primary))" })}
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
                        onPress={handleClose}
                        className="w-full"
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
