import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import {Tabs, Tab} from "@heroui/tabs";
import { Button } from "@heroui/button";
import { GitCompare } from "lucide-react";
import TextGenTemplateList from "@/components/text-gen-template-list";


export default function TextGenerator(){
    return(
        <DefaultLayout>
            <>
                <div className="flex-col flex">
                    <h1 className={title()}>Text Generator</h1>
                    <span className="mt-4">Create high quality text, names and more for your designs.</span>
                </div>
                <Tabs aria-label="Generator Types" className="mt-16 p-2">
                    <Tab key="builder" title="Builder">
                        <div className="flex flex-col dark:bg-zinc-900 bg-zinc-100 px-8 py-8 rounded-2xl">
                            <div className="justify-between flex pb-4">
                                <span className="text-2xl font-semibold">Templates</span>
                                <Button color="primary" variant="flat" startContent={<GitCompare size={16} />}>Advanced Builder</Button>
                            </div>
                            <TextGenTemplateList />
                        </div>
                    </Tab>
                    <Tab key="filter" title="Filter">
                        <p>Filter here</p>
                    </Tab>
                    <Tab key="output" title="Output">
                        <p>Output here</p>
                    </Tab>
                </Tabs>
            </>
        </DefaultLayout>
    )
}