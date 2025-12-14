import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useState } from "react";
import { Template, FieldFilters } from "./text-gen-builder/types";
import StepBuilder from "./text-gen-builder/steps/builder";
import StepFilters from "./text-gen-builder/steps/filters";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Step = 'builder' | 'filters';

const STEPS: { key: Step; title: string }[] = [
    { key: 'builder', title: 'Build Template' },
    { key: 'filters', title: 'Filters' },
];

interface TemplateBuilderProps {
    onCancel?: () => void;
}

export default function TemplateBuilder({ onCancel }: TemplateBuilderProps) {
    const [currentStep, setCurrentStep] = useState<Step>('builder');
    const [template, setTemplate] = useState<Template>({
        name: "Untitled Template",
        fields: [],
        filters: {},
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const currentStepIndex = STEPS.findIndex(s => s.key === currentStep);
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === STEPS.length - 1;

    const handleFiltersChange = (filters: FieldFilters) => {
        setTemplate(prev => ({ ...prev, filters }));
    };

    const handleNext = () => {
        if (!isLastStep) {
            setCurrentStep(STEPS[currentStepIndex + 1].key);
        }
    };

    const handleBack = () => {
        if (!isFirstStep) {
            setCurrentStep(STEPS[currentStepIndex - 1].key);
        }
    };

    const handleCancel = () => {
        // Show confirmation modal
        setShowConfirmModal(true);
    };

    const handleConfirmCancel = () => {
        // Close modal and call the onCancel callback to go back to templates page
        setShowConfirmModal(false);
        if (onCancel) {
            onCancel();
        }
    };

    const handleCancelModal = () => {
        // Just close the modal without canceling
        setShowConfirmModal(false);
    };

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log('Saving template:', template);
    };

    return (
        <div className="flex flex-col backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 px-2 md:px-8 py-6 md:py-8 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex flex-col px-2 md:px-0">
                    <span className="text-xl md:text-2xl font-semibold">Template Builder</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Step {currentStepIndex + 1} of {STEPS.length}: {STEPS[currentStepIndex].title}
                    </span>
                </div>
                {/* Desktop buttons */}
                <div className="hidden md:flex gap-2">
                    <Button 
                        color="default" 
                        variant="flat"
                        onPress={handleCancel}
                    >
                        Cancel
                    </Button>
                    {!isFirstStep && (
                        <Button 
                            color="default" 
                            variant="flat"
                            onPress={handleBack}
                            startContent={<ChevronLeft size={16} />}
                        >
                            Back
                        </Button>
                    )}
                    {isLastStep ? (
                        <Button 
                            color="success" 
                            variant="flat"
                            onPress={handleSave}
                            isDisabled={template.fields.length === 0}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button 
                            color="primary" 
                            variant="flat"
                            onPress={handleNext}
                            endContent={<ChevronRight size={16} />}
                            isDisabled={template.fields.length === 0}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>

            {/* Step indicator */}
            <div className="flex flex-row gap-2 mt-4 px-2 md:px-0">
                {STEPS.map((step, index) => (
                    <div 
                        key={step.key}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                            index <= currentStepIndex 
                                ? 'bg-primary' 
                                : 'bg-white/20 dark:bg-white/10'
                        }`}
                    />
                ))}
            </div>

            {/* Step content */}
            {currentStep === 'builder' && (
                <StepBuilder 
                    template={template} 
                    onTemplateChange={setTemplate} 
                />
            )}
            {currentStep === 'filters' && (
                <StepFilters 
                    template={template} 
                    onFiltersChange={handleFiltersChange}
                />
            )}

            {/* Mobile bottom buttons */}
            <div className="flex md:hidden gap-2 mt-6">
                <Button 
                    color="default" 
                    variant="flat"
                    onPress={handleCancel}
                    className="flex-1"
                >
                    Cancel
                </Button>
                {!isFirstStep && (
                    <Button 
                        color="default" 
                        variant="flat"
                        onPress={handleBack}
                        startContent={<ChevronLeft size={16} />}
                        className="flex-1"
                    >
                        Back
                    </Button>
                )}
                {isLastStep ? (
                    <Button 
                        color="success" 
                        variant="flat"
                        onPress={handleSave}
                        isDisabled={template.fields.length === 0}
                        className="flex-1"
                    >
                        Save
                    </Button>
                ) : (
                    <Button 
                        color="primary" 
                        variant="flat"
                        onPress={handleNext}
                        endContent={<ChevronRight size={16} />}
                        isDisabled={template.fields.length === 0}
                        className="flex-1"
                    >
                        Next
                    </Button>
                )}
            </div>

            {/* Confirmation Modal */}
            <Modal isOpen={showConfirmModal} onOpenChange={setShowConfirmModal} backdrop="blur" hideCloseButton>
                <ModalContent className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-lg">
                    <ModalHeader className="flex flex-col gap-1 text-white">
                        Discard Template?
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-white/90">
                            Are you sure you want to leave without saving? All your changes to the template will be lost.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="light" onPress={handleCancelModal}>
                            Keep Editing
                        </Button>
                        <Button color="danger" onPress={handleConfirmCancel}>
                            Discard
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}