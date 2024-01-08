import { InfoText } from "@/components/info-text";
import { DocumentationSectionLink } from "../components/documentation-section-link";
import { Code, Rocket } from "lucide-react";

const QuickstartPage = () =>{
    return (
        <div>
        <h1 className="font-bold text-[2.3em]">Quickstart</h1>
        <p className="text-sm font-medium dark:text-gray-300">
            Get started in minutes!
        </p>
        <div className="mt-12">
           
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
            <DocumentationSectionLink path={"/docs/interface"} icon={<Rocket className="w-6 h-6 text-softBlue"/>} title="Interface" label="Explore our built-in dashboard"/>
            <DocumentationSectionLink path={"/docs/message-panel"} icon={<Code className="w-6 h-6 text-softBlue"/>} title="Message Panel" label="Your conversation with users"/>
        </div>
    </div>
    )
}

export default QuickstartPage;