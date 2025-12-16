import { templates } from "../config/textGenTemplates";
import TextGenTemplate from "./text-gen-template";
import * as Icons from "lucide-react";
import { useState, useEffect } from "react";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Trash2, Edit3 } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";

interface TextGenTemplateListProps {
	selectedIndex: number | null;
	onSelectIndex: (index: number) => void;
	selectedUserTemplate: string | null;
	onSelectUserTemplate: (templateId: string) => void;
	onEditTemplate?: (template: UserTemplate) => void;
}

interface UserTemplate {
	id: string;
	name: string;
	description: string;
	category: string[];
	icon: string;
	color: string;
	fields: any[];
	filters: any;
	isUserTemplate: true;
	createdAt: string;
}

export default function TextGenTemplateList({ selectedIndex, onSelectIndex, selectedUserTemplate, onSelectUserTemplate, onEditTemplate }: TextGenTemplateListProps) {
	const [userTemplates, setUserTemplates] = useState<UserTemplate[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

	useEffect(() => {
		// Load user templates from localStorage
		const stored = localStorage.getItem('textGenUserTemplates');
		if (stored) {
			setUserTemplates(JSON.parse(stored));
		}
	}, []);

	// Calculate category counts
	const getCategoryCount = (category: string) => {
		if (category === "All") {
			return templates.length + userTemplates.length;
		}
		const predefinedCount = templates.filter(t => t.category.includes(category)).length;
		const userCount = userTemplates.filter(t => t.category.includes(category)).length;
		return predefinedCount + userCount;
	};

	// Get all unique categories
	const allCategories = Array.from(
		new Set([...templates.flatMap(t => t.category), ...userTemplates.flatMap(t => t.category)])
	).sort((a, b) => {
		const countA = getCategoryCount(a);
		const countB = getCategoryCount(b);
		return countB - countA; // Sort by count descending
	});

	// Filter templates based on selected category
	const filteredTemplates = selectedCategory === "All" 
		? templates 
		: templates.filter(t => t.category.includes(selectedCategory));

	const filteredUserTemplates = selectedCategory === "All"
		? userTemplates
		: userTemplates.filter(t => t.category.includes(selectedCategory));

	const handleDeleteClick = (templateId: string) => {
		setTemplateToDelete(templateId);
		setShowDeleteModal(true);
	};

	const handleEditClick = (template: UserTemplate) => {
		if (onEditTemplate) {
			onEditTemplate(template);
		}
	};

	const confirmDelete = () => {
		if (templateToDelete) {
			const updated = userTemplates.filter(t => t.id !== templateToDelete);
			setUserTemplates(updated);
			localStorage.setItem('textGenUserTemplates', JSON.stringify(updated));
			setShowDeleteModal(false);
			setTemplateToDelete(null);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Category Filter Chips */}
			<div className="flex flex-wrap gap-2">
				<Chip
					variant={selectedCategory === "All" ? "solid" : "bordered"}
					color={selectedCategory === "All" ? "primary" : "default"}
					onClick={() => setSelectedCategory("All")}
					className="cursor-pointer"
				>
					All ({getCategoryCount("All")})
				</Chip>
				{allCategories.map((category) => (
					<Chip
						key={category}
						variant={selectedCategory === category ? "solid" : "bordered"}
						color={selectedCategory === category ? "primary" : "default"}
						onClick={() => setSelectedCategory(category)}
						className="cursor-pointer"
					>
						{category} ({getCategoryCount(category)})
					</Chip>
				))}
			</div>

			{/* Default Templates Section */}
			{filteredTemplates.length > 0 && (
				<div>
					<h3 className="text-lg font-semibold mb-4">Presets</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{filteredTemplates.map((template, idx) => {
							const Icon = (Icons[template.icon as keyof typeof Icons] || Icons.User) as typeof Icons.User;
							const isSelected = selectedIndex === idx;
							return (
								<button
									key={template.name}
									type="button"
									onClick={() => {
										onSelectIndex(idx);
										// Clear user template selection when selecting predefined template
										onSelectUserTemplate("");
									}}
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
				</div>
			)}

			{/* Your Templates Section */}
			{filteredUserTemplates.length > 0 && (
				<div>
					<h3 className="text-lg font-semibold mb-4">Custom Templates</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{filteredUserTemplates.map((template, idx) => {
							const Icon = (Icons[template.icon as keyof typeof Icons] || Icons.User) as typeof Icons.User;
							const isSelected = selectedUserTemplate === template.id;
							return (
								<div
									key={template.id}
									className={`relative rounded-xl border transition-colors group ${isSelected ? 'border-primary shadow-lg bg-primary-50' : 'border-gray-300 dark:border-gray-700 hover:border-primary'}`}
									style={{ boxShadow: isSelected ? '0 0 0 2px var(--tw-shadow-color, #3b82f6)' : undefined }}
								>
									<button
										type="button"
										onClick={() => {
											onSelectUserTemplate(template.id);
											// Clear predefined template selection when selecting user template
											onSelectIndex(-1);
										}}
										className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
									>
										<TextGenTemplate
											Icon={Icon}
											iconHexColor={`#${template.color}`}
											name={template.name}
											description={template.description}
											compact={true}
										/>
									</button>
								<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<Button
										isIconOnly
										size="sm"
										variant="light"
										className="text-primary"
										onPress={() => handleEditClick(template)}
										aria-label="Edit template"
									>
										<Edit3 size={18} />
									</Button>
									<Button
										isIconOnly
										size="sm"
										variant="light"
										className="text-danger"
										onPress={() => handleDeleteClick(template.id)}
										aria-label="Delete template"
									>
										<Trash2 size={18} />
									</Button>
								</div>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{filteredTemplates.length === 0 && filteredUserTemplates.length === 0 && (
				<div className="text-center py-8 text-zinc-500">
					No templates found for the selected category
				</div>
			)}

			{/* Delete Confirmation Modal */}
			<Modal isOpen={showDeleteModal} onOpenChange={setShowDeleteModal} backdrop="blur" hideCloseButton>
				<ModalContent className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-lg">
					<ModalHeader className="flex flex-col gap-1 text-white">
						Delete Template?
					</ModalHeader>
					<ModalBody>
						<p className="text-white/90">
							Are you sure you want to delete this template? This action cannot be undone.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button color="default" variant="light" onPress={() => setShowDeleteModal(false)}>
							Cancel
						</Button>
						<Button color="danger" onPress={confirmDelete}>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}