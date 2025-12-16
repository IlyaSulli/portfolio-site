import { useState, useCallback, useRef, useEffect } from "react";
import { Template } from "@/components/text-gen-builder/types";
import { GeneratedRow, generateRows, regenerateField } from "@/lib/textgen/generators";
import { 
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem 
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { Spinner } from "@heroui/spinner";
import { 
    Download, 
    RefreshCw, 
    MoreHorizontal, 
    Copy, 
    Trash2, 
    RotateCcw,
    Check,
    FileJson,
    FileText,
    Table,
    Sparkles,
    ArrowLeft
} from "lucide-react";
import { ICON_MAP } from "../builder/constants";
import { createElement } from "react";

interface StepGeneratorProps {
    template: Template;
}

type ExportFormat = 'json' | 'csv' | 'txt';

export default function StepGenerator({ template, onBack }: StepGeneratorProps & { onBack?: () => void }) {
    const [rows, setRows] = useState<GeneratedRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
    const [generateCount, setGenerateCount] = useState(10);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [editingCell, setEditingCell] = useState<{ rowId: string; fieldId: string } | null>(null);
    const [editValue, setEditValue] = useState("");
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    // Initial generation
    useEffect(() => {
        if (template.fields.length > 0 && rows.length === 0 && isInitialLoad) {
            handleInitialGenerate();
        }
    }, [template.fields]);

    // Check scroll position for fades
    const checkScroll = useCallback(() => {
        const container = tableContainerRef.current;
        if (!container) return;
        
        setShowLeftFade(container.scrollLeft > 0);
        setShowRightFade(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 1
        );
    }, []);

    useEffect(() => {
        const container = tableContainerRef.current;
        if (!container) return;
        
        checkScroll();
        container.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        
        return () => {
            container.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [checkScroll, rows]);

    const handleGenerate = async (count: number) => {
        setIsLoading(true);
        try {
            const newRows = await generateRows(template, count);
            setRows(newRows);
        } catch (error) {
            console.error('Generation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInitialGenerate = async () => {
        setIsLoading(true);
        try {
            const newRows = await generateRows(template, 5);
            setRows(newRows);
        } catch (error) {
            console.error('Initial generation failed:', error);
        } finally {
            setIsLoading(false);
            setIsInitialLoad(false);
        }
    };

    const handleGenerateMore = async () => {
        setIsLoading(true);
        try {
            const newRows = await generateRows(template, generateCount);
            setRows(prev => [...prev, ...newRows]);
        } catch (error) {
            console.error('Generation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerateRow = async (rowId: string) => {
        const rowIndex = rows.findIndex(r => r.id === rowId);
        if (rowIndex === -1) return;
        
        try {
            const newRow = (await generateRows(template, 1))[0];
            newRow.id = rowId; // Keep same ID for React key
            setRows(prev => {
                const updated = [...prev];
                updated[rowIndex] = newRow;
                return updated;
            });
        } catch (error) {
            console.error('Regeneration failed:', error);
        }
    };

    const handleDeleteRow = (rowId: string) => {
        setRows(prev => prev.filter(r => r.id !== rowId));
    };

    const handleCopyRow = async (row: GeneratedRow) => {
        const values = template.fields.map(f => row.values[f.id]?.displayValue || '').join('\n');
        await navigator.clipboard.writeText(values);
        setCopiedField(`row-${row.id}`);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleCopyField = async (value: string, fieldKey: string) => {
        await navigator.clipboard.writeText(value);
        setCopiedField(fieldKey);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleStartEdit = (rowId: string, fieldId: string, currentValue: string) => {
        setEditingCell({ rowId, fieldId });
        setEditValue(currentValue);
    };

    const handleSaveEdit = () => {
        if (!editingCell) return;
        
        setRows(prev => prev.map(row => {
            if (row.id === editingCell.rowId) {
                return {
                    ...row,
                    values: {
                        ...row.values,
                        [editingCell.fieldId]: {
                            value: editValue,
                            displayValue: editValue,
                        }
                    }
                };
            }
            return row;
        }));
        
        setEditingCell(null);
        setEditValue("");
    };

    const handleCancelEdit = () => {
        setEditingCell(null);
        setEditValue("");
    };

    const handleExport = async (format: ExportFormat) => {
        setIsExporting(true);
        
        try {
            let content: string;
            let filename: string;
            let mimeType: string;
            
            const headers = template.fields.map(f => f.name);
            const data = rows.map(row => 
                template.fields.map(f => row.values[f.id]?.displayValue || '')
            );
            
            switch (format) {
                case 'json':
                    const jsonData = rows.map(row => {
                        const obj: Record<string, any> = {};
                        template.fields.forEach(f => {
                            obj[f.name] = row.values[f.id]?.value ?? '';
                        });
                        return obj;
                    });
                    content = JSON.stringify(jsonData, null, 2);
                    filename = `${template.name || 'export'}.json`;
                    mimeType = 'application/json';
                    break;
                    
                case 'csv':
                    const csvRows = [
                        headers.map(h => `"${h}"`).join(','),
                        ...data.map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
                    ];
                    content = csvRows.join('\n');
                    filename = `${template.name || 'export'}.csv`;
                    mimeType = 'text/csv';
                    break;
                    
                case 'txt':
                default:
                    const txtRows = [
                        headers.join('\t'),
                        ...data.map(row => row.join('\t'))
                    ];
                    content = txtRows.join('\n');
                    filename = `${template.name || 'export'}.txt`;
                    mimeType = 'text/plain';
                    break;
            }
            
            // Simulate delay for UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Download file
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const IconComponent = ICON_MAP[template.icon as keyof typeof ICON_MAP] || ICON_MAP.FileText;

    // Initial loading state - show a nice loading design
    if (isInitialLoad && isLoading) {
        return (
            <div className="flex flex-col w-full items-center justify-center py-20">
                <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 animate-pulse"
                    style={{ backgroundColor: `#${template.color || '3B82F6'}20` }}
                >
                    {createElement(IconComponent, { 
                        size: 36, 
                        color: `#${template.color || '3B82F6'}` 
                    })}
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <Spinner size="sm" color="primary" />
                    <span className="text-lg font-medium">Generating data...</span>
                </div>
                <p className="text-sm text-zinc-500">
                    Creating {template.fields.length} fields for your template
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <div className="mb-6">
                {/* On desktop: icon, name, and buttons all inline. On mobile: buttons stack below. */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                        {onBack && (
                            <Button
                                isIconOnly
                                variant="flat"
                                color="default"
                                onPress={onBack}
                                aria-label="Back to templates"
                                className="mr-1"
                            >
                                <ArrowLeft size={18} />
                            </Button>
                        )}
                        <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `#${template.color || '3B82F6'}20` }}
                        >
                            {createElement(IconComponent, { 
                                size: 20, 
                                color: `#${template.color || '3B82F6'}` 
                            })}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{template.name || 'Untitled Template'}</h2>
                            <p className="text-sm text-zinc-500">{rows.length} entries generated</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 mt-2 sm:mt-0 sm:items-center">
                        <Button
                            variant="flat"
                            startContent={<RefreshCw size={16} />}
                            onPress={() => handleGenerate(5)}
                            isLoading={isLoading}
                            className="w-full sm:w-auto"
                        >
                            Regenerate
                        </Button>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    color="primary"
                                    startContent={!isExporting && <Download size={16} />}
                                    isLoading={isExporting}
                                    className="w-full sm:w-auto"
                                >
                                    Export
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Export options">
                                <DropdownItem
                                    key="json"
                                    startContent={<FileJson size={16} />}
                                    onPress={() => handleExport('json')}
                                >
                                    Export as JSON
                                </DropdownItem>
                                <DropdownItem
                                    key="csv"
                                    startContent={<Table size={16} />}
                                    onPress={() => handleExport('csv')}
                                >
                                    Export as CSV
                                </DropdownItem>
                                <DropdownItem
                                    key="txt"
                                    startContent={<FileText size={16} />}
                                    onPress={() => handleExport('txt')}
                                >
                                    Export as TXT
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="relative backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-lg shadow-lg overflow-hidden">
                {/* Left fade */}
                {showLeftFade && (
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/30 dark:from-black/30 to-transparent z-10 pointer-events-none" />
                )}
                {/* Right fade */}
                {showRightFade && (
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/30 dark:from-black/30 to-transparent z-10 pointer-events-none" />
                )}
                
                <div 
                    ref={tableContainerRef}
                    className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600"
                >
                    <table className="w-full min-w-max">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="px-2 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider w-12">
                                    {/* Actions column */}
                                </th>
                                {template.fields.map(field => (
                                    <th 
                                        key={field.id}
                                        className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        <div className="flex items-center gap-2">
                                            {createElement(field.icon, { size: 14 })}
                                            {field.name}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {rows.map(row => (
                                <tr 
                                    key={row.id}
                                    className="hover:bg-white/10 transition-colors"
                                >
                                    <td className="px-2 py-3">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    className="min-w-8 w-8 h-8"
                                                >
                                                    <MoreHorizontal size={14} />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Row actions">
                                                <DropdownItem
                                                    key="copy"
                                                    startContent={<Copy size={14} />}
                                                    onPress={() => handleCopyRow(row)}
                                                >
                                                    Copy Entry
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="regenerate"
                                                    startContent={<RotateCcw size={14} />}
                                                    onPress={() => handleRegenerateRow(row.id)}
                                                >
                                                    Regenerate
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="delete"
                                                    startContent={<Trash2 size={14} />}
                                                    className="text-danger"
                                                    color="danger"
                                                    onPress={() => handleDeleteRow(row.id)}
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </td>
                                    {template.fields.map(field => {
                                        const cellValue = row.values[field.id];
                                        const fieldKey = `${row.id}-${field.id}`;
                                        const isEditing = editingCell?.rowId === row.id && editingCell?.fieldId === field.id;
                                        const isCopied = copiedField === fieldKey;
                                        
                                        return (
                                            <td 
                                                key={field.id}
                                                className="px-4 py-3"
                                            >
                                                {isEditing ? (
                                                    <Input
                                                        size="sm"
                                                        value={editValue}
                                                        onValueChange={setEditValue}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleSaveEdit();
                                                            if (e.key === 'Escape') handleCancelEdit();
                                                        }}
                                                        onBlur={handleSaveEdit}
                                                        autoFocus
                                                        className="min-w-[100px]"
                                                    />
                                                ) : (
                                                    <Tooltip
                                                        content={isCopied ? "Copied!" : "Click to copy"}
                                                        placement="top"
                                                        showArrow
                                                        isOpen={isCopied ? true : undefined}
                                                    >
                                                        <span
                                                            className="cursor-pointer hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
                                                            onClick={() => handleCopyField(
                                                                cellValue?.displayValue || '', 
                                                                fieldKey
                                                            )}
                                                            onDoubleClick={() => handleStartEdit(
                                                                row.id, 
                                                                field.id, 
                                                                cellValue?.displayValue || ''
                                                            )}
                                                        >
                                                            {cellValue?.displayValue || '-'}
                                                            {isCopied && <Check size={12} className="text-green-500" />}
                                                        </span>
                                                    </Tooltip>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Generate more */}
            <div className="flex items-center gap-3 mt-4">
                <span className="text-sm">Generate</span>
                <Input
                    type="number"
                    min={1}
                    max={100}
                    value={String(generateCount)}
                    onValueChange={(v) => setGenerateCount(Math.min(100, Math.max(1, parseInt(v) || 1)))}
                    className="w-20"
                    size="sm"
                />
                <span className="text-sm">more</span>
                <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={handleGenerateMore}
                    isLoading={isLoading}
                >
                    Generate
                </Button>
            </div>
        </div>
    );
}
