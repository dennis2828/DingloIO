import { InfoText } from "@/components/info-text";
import { DocumentationSectionLink } from "./components/documentation-section-link";
import { Code, Rocket } from "lucide-react";

const DocumentationPage = () =>{
    return (
        <div>
            <h1 className="font-bold text-[2.3em]">Introduction</h1>
            <p className="text-sm font-medium dark:text-gray-300">
                Welcome to the Dinglo.IO documentation! The target of Dinglo.IO is to provide you a way to reach and connect with your users and potential customers.
                We have developed a modern ready-to-use chat widget which allows you to engage and recept messages from any user active on your website.
            </p>
            <div className="mt-12">
                <p className="font-bold mb-4">
                    Dinglo.<InfoText>IO</InfoText> key-features:
                </p>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <div className="w-[5px] h-[5px] rounded-full bg-softBlue"/>
                        <p className="text-[.85em]">real time <InfoText>communication</InfoText></p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-[5px] h-[5px] rounded-full bg-softBlue"/>
                        <p className="text-[.85em]">mail alert when <InfoText>receiving</InfoText> receiving messages while offline</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-[5px] h-[5px] rounded-full bg-softBlue"/>
                        <p className="text-[.85em]">change <InfoText>your</InfoText> profile to match your app design</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-[5px] h-[5px] rounded-full bg-softBlue"/>
                        <p className="text-[.85em]"><InfoText>100%</InfoText> widget customizability</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
                <DocumentationSectionLink path={"/docs/quickstart"} icon={<Rocket className="w-6 h-6 text-softBlue"/>} title="Quickstart" label="Get started in a few minutes"/>
                <DocumentationSectionLink path={"/docs/api-reference"} icon={<Code className="w-6 h-6 text-softBlue"/>} title="API Reference" label="Learn how you can interact with our server"/>
            </div>
        </div>
    )
}

export default DocumentationPage;