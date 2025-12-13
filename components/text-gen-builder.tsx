import { Button } from "@heroui/button";
import { useState } from "react";
import { Template } from "./text-gen-builder/types";
import StepBuilder from "./text-gen-builder/steps/builder";
import StepFilters from "./text-gen-builder/steps/filters";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Step = 'builder' | 'filters';

const STEPS: { key: Step; title: string }[] = [
    { key: 'builder', title: 'Build Template' },
    { key: 'filters', title: 'Filters' },
];

export default function TemplateBuilder() {
    const [currentStep, setCurrentStep] = useState<Step>('builder');
    const [template, setTemplate] = useState<Template>({
        name: "Untitled Template",
        fields: [],
    });

    const currentStepIndex = STEPS.findIndex(s => s.key === currentStep);
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === STEPS.length - 1;

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
        // Reset template and go back to first step
        setTemplate({ name: "Untitled Template", fields: [] });
        setCurrentStep('builder');
    };

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log('Saving template:', template);
    };

    return (
        <div className="flex flex-col dark:bg-zinc-900 bg-zinc-100 px-8 py-8 rounded-2xl">
            {/* Header */}
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-2xl font-semibold">Template Builder</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Step {currentStepIndex + 1} of {STEPS.length}: {STEPS[currentStepIndex].title}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button 
                        color="default" 
                        variant="flat"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    {!isFirstStep && (
                        <Button 
                            color="default" 
                            variant="flat"
                            onClick={handleBack}
                            startContent={<ChevronLeft size={16} />}
                        >
                            Back
                        </Button>
                    )}
                    {isLastStep ? (
                        <Button 
                            color="primary" 
                            variant="flat"
                            onClick={handleSave}
                            isDisabled={template.fields.length === 0}
                        >
                            Save Template
                        </Button>
                    ) : (
                        <Button 
                            color="primary" 
                            variant="flat"
                            onClick={handleNext}
                            endContent={<ChevronRight size={16} />}
                            isDisabled={template.fields.length === 0}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>

            {/* Step indicator */}
            <div className="flex flex-row gap-2 mt-4">
                {STEPS.map((step, index) => (
                    <div 
                        key={step.key}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                            index <= currentStepIndex 
                                ? 'bg-primary' 
                                : 'bg-zinc-300 dark:bg-zinc-700'
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
                <StepFilters template={template} />
            )}
        </div>
    );
}