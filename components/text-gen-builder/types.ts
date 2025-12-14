import { LucideIcon } from "lucide-react";

export interface TemplateField {
    id: string;
    name: string;
    originalName: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
}

export interface FilterValue {
    filterKey: string;
    value: string | string[] | number | boolean;
}

export interface FieldFilters {
    [fieldId: string]: FilterValue[];
}

export interface Template {
    name: string;
    fields: TemplateField[];
    filters?: FieldFilters;
}

export interface ScrollState {
    atTop: boolean;
    atBottom: boolean;
}
