import { 
    FileText, 
    Star, 
    Heart, 
    Bookmark, 
    Tag, 
    Clock, 
    User, 
    Settings, 
    Folder, 
    Image, 
    Music, 
    Video, 
    Download, 
    Upload, 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    Camera, 
    Calendar,
    CircleCheck
} from "lucide-react";

// All available icons for template selection
export const ALL_ICONS = [
    FileText, Star, Heart, Bookmark, Tag, Clock, Calendar, User, 
    Mail, Phone, MapPin, Image, Music, Video, Camera, Download, 
    Upload, Settings, Globe, Folder, CircleCheck
] as const;

// Icon name to component mapping
export const ICON_MAP = {
    FileText, Star, Heart, Bookmark, Tag, Clock, Calendar, User, 
    Mail, Phone, MapPin, Image, Music, Video, Camera, Download, 
    Upload, Settings, Globe, Folder, CircleCheck
} as const;

// Color options with hex values for storage
export const COLOR_OPTIONS = [
    { name: "Blue", value: "3B82F6", tailwind: "text-blue-500" },
    { name: "Green", value: "22C55E", tailwind: "text-green-500" },
    { name: "Red", value: "EF4444", tailwind: "text-red-500" },
    { name: "Purple", value: "A855F7", tailwind: "text-purple-500" },
    { name: "Orange", value: "F97316", tailwind: "text-orange-500" },
    { name: "Pink", value: "EC4899", tailwind: "text-pink-500" },
    { name: "Indigo", value: "6366F1", tailwind: "text-indigo-500" },
] as const;

export type ColorOption = typeof COLOR_OPTIONS[number];
export type IconKey = keyof typeof ICON_MAP;
