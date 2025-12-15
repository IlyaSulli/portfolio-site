import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { ComponentType, createElement, useState } from "react";
import { ALL_ICONS, ICON_MAP, COLOR_OPTIONS, ColorOption, IconKey } from "./constants";

interface IconColorPickerProps {
    selectedIcon: string;
    selectedColor: string;
    onIconChange: (icon: string) => void;
    onColorChange: (color: string) => void;
}

export default function IconColorPicker({
    selectedIcon,
    selectedColor,
    onIconChange,
    onColorChange,
}: IconColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const getCurrentIconComponent = () => {
        return ICON_MAP[selectedIcon as IconKey] || ICON_MAP.FileText;
    };

    const getCurrentColor = () => {
        return COLOR_OPTIONS.find(color => color.value === selectedColor) || COLOR_OPTIONS[0];
    };

    const handleIconSelect = (IconComponent: ComponentType<{ size?: number }>) => {
        const iconName = Object.keys(ICON_MAP).find(key => 
            ICON_MAP[key as IconKey] === IconComponent
        );
        if (iconName) {
            onIconChange(iconName);
        }
        setIsOpen(false);
    };

    const handleColorSelect = (color: ColorOption) => {
        onColorChange(color.value);
    };

    return (
        <Popover 
            isOpen={isOpen} 
            onOpenChange={setIsOpen}
            placement="bottom-start"
        >
            <PopoverTrigger>
                <Button
                    isIconOnly
                    variant="flat"
                    size="lg"
                    className="hover:scale-105 transition-all"
                    style={{ color: `#${selectedColor}` }}
                    aria-label="Select template icon"
                >
                    {createElement(getCurrentIconComponent(), { size: 24 })}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="px-2 py-3">
                    <h4 className="text-lg font-semibold mb-3">Choose Icon</h4>
                    
                    {/* Color Selection */}
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                            {COLOR_OPTIONS.map((color) => (
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
                                        } as React.CSSProperties)
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
                                        backgroundColor: getCurrentIconComponent() === IconComponent ? `#${selectedColor}` : undefined,
                                        color: getCurrentIconComponent() === IconComponent ? 'white' : `#${selectedColor}`
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
    );
}
