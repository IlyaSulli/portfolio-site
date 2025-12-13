import { Template } from "../types";

interface StepFiltersProps {
    template: Template;
}

export default function StepFilters({ template }: StepFiltersProps) {
    return (
        <div className="mt-8 flex flex-col w-full">
            <div className="bg-zinc-200 dark:bg-zinc-800 p-6 rounded-lg min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <span className="text-zinc-500 dark:text-zinc-400 text-lg">
                        Filters coming soon...
                    </span>
                </div>
            </div>
        </div>
    );
}
