import { LucideIcon } from "lucide-react";

export interface TemplateField {
    id: string;
    name: string;
    originalName: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
}

export interface Template {
    name: string;
    fields: TemplateField[];
}

export interface ScrollState {
    atTop: boolean;
    atBottom: boolean;
}
