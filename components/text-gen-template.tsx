import { LucideIcon } from "lucide-react";

interface TextGenTemplateProps {
    Icon: LucideIcon;
    iconHexColor: string;
    name: string;
    description: string;
    compact?: boolean;
}

export default function TextGenTemplate({
    Icon, iconHexColor, name, description, compact = false
}: TextGenTemplateProps){
    if (compact || !description) {
        return (
            <div className="flex flex-col p-4 align-top">
                <div>
                    <div className="inline-flex p-3 rounded-lg" style={{ backgroundColor: iconHexColor }}>
                        <Icon size={24} color="white"/>
                    </div>
                </div>
                
                <span className="font-semibold text-lg pt-4 line-clamp-2">{name}</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-4 align-top">
            <div>
                <div className="inline-flex p-3 rounded-lg" style={{ backgroundColor: iconHexColor }}>
                    <Icon size={24} color="white"/>
                </div>
            </div>
            
            <span className="font-semibold text-lg pt-4 pb-2 line-clamp-2">{name}</span>
            <span className="font-regular text-medium opacity-70">{description}</span>
        </div>
    );
}