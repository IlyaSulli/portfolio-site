import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Check } from "lucide-react";

interface Template {
    name: string;
    description: string;
    icon: string;
    color: string;
    parameters: Array<{
        key: string;
        filters: Record<string, any>;
    }>;
}

interface TextGenFilterProps {
    template: Template;
}

export default function TextGenFilter({ template }: TextGenFilterProps) {
    const [customizations, setCustomizations] = useState<Record<string, any>>({});

    const handleInputChange = (key: string, value: any) => {
        setCustomizations(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleApplyFilters = () => {
        console.log("Applied filters:", customizations);
    };

    const renderFilterInput = (param: any) => {
        const { key, filters } = param;
        
        if (filters.options) {
            return (
                <Select
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full"
                    value={customizations[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                >
                    {filters.options.map((option: string) => (
                        <SelectItem key={option}>
                            {option}
                        </SelectItem>
                    ))}
                </Select>
            );
        }

        if (filters.gender) {
            return (
                <Select
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full"
                    value={customizations[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                >
                    {filters.gender.map((option: string) => (
                        <SelectItem key={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                    ))}
                </Select>
            );
        }

        if (filters.type) {
            return (
                <Select
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full"
                    value={customizations[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                >
                    {filters.type.map((option: string) => (
                        <SelectItem key={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                    ))}
                </Select>
            );
        }

        return (
            <Input
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full"
                value={customizations[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder={`Enter ${key}`}
            />
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="dark:bg-zinc-900 bg-zinc-100">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-2xl font-semibold">{template.name}</p>
                        <p className="text-sm opacity-70">{template.description}</p>
                    </div>
                </CardHeader>
                <CardBody className="gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {template.parameters.map((param) => renderFilterInput(param))}
                    </div>
                    <Button
                        color="primary"
                        className="mt-4 w-full"
                        startContent={<Check size={16} />}
                        onPress={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
