import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import {Tabs, Tab} from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import TextGenTemplateList from "@/components/text-gen-template-list";
import TextGenFilter from "@/components/text-gen-filter";
import { templates } from "@/config/textGenTemplates";
import TemplateBuilder from "@/components/text-gen-builder";


export default function TextGenerator(){
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [useAdvancedBuilder, setUseAdvancedBuilder] = useState(false);
    const selectedTemplate = selectedIndex !== null ? templates[selectedIndex] : null;

    return(
        <DefaultLayout>
            <>
                <div className="flex-col flex align-middle">
                    <h1 className={`${title()} text-center`}>Text Generator</h1>
                    <span className="mt-4 text-center">Create high quality text, names and more for your designs.</span>
                </div>
                <Tabs aria-label="Generator Types" className="mt-16 p-2">
                    <Tab key="templates" title="Templates">
                        {!useAdvancedBuilder ? (
                            <div className="flex flex-col dark:bg-zinc-900 bg-zinc-100 px-8 py-8 rounded-2xl">
                                <div className="justify-between flex pb-4">
                                    <span className="text-2xl font-semibold">Templates</span>
                                    <Button 
                                        color="primary" 
                                        variant="flat" 
                                        startContent={<Plus size={16} />}
                                        onClick={() => setUseAdvancedBuilder(true)}
                                    >
                                        New Template
                                    </Button>
                                </div>
                                <TextGenTemplateList selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex} />
                            </div>
                        ) : (
                            <TemplateBuilder />
                        )}
                    </Tab>
                    
                    <Tab key="output" title="Output">
                        <p>Output here</p>
                    </Tab>
                </Tabs>
            </>
        </DefaultLayout>
    )
}