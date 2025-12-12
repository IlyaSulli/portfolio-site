import { useState } from "react";
import { templates } from "../config/textGenTemplates";
import TextGenTemplate from "./text-gen-template";
import * as Icons from "lucide-react";

export default function TextGenTemplateList() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{templates.map((template, idx) => {
				const Icon = (Icons[template.icon as keyof typeof Icons] || Icons.User) as typeof Icons.User;
				const isSelected = selectedIndex === idx;
				return (
					<button
						key={template.name}
						type="button"
						onClick={() => setSelectedIndex(idx)}
						className={`rounded-xl border transition-colors text-left ${isSelected ? 'border-primary shadow-lg bg-primary-50' : 'border-gray-300 dark:border-gray-700'} focus:outline-none focus:ring-2 focus:ring-primary`}
						style={{ boxShadow: isSelected ? '0 0 0 2px var(--tw-shadow-color, #3b82f6)' : undefined }}
					>
						<TextGenTemplate
							Icon={Icon}
							iconHexColor={`#${template.color}`}
							name={template.name}
							description={template.description}
						/>
					</button>
				);
			})}
		</div>
	);
}