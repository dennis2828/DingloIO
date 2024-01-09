import { DocumentationSectionLink } from "../components/documentation-section-link";
import { Code, Rocket } from "lucide-react";
import { Step } from "../components/step";
import { NPMPackage } from "../../components/Npm/npm-package";
import { SyntaxHighlighterPreview } from "../components/syntax-highlighter";
import { codeExample, createMessage, packageSetup } from "../constants";

const QuickstartPage = () =>{
    return (
        <div>
        <h1 className="font-bold text-[2.3em]">Quickstart</h1>
        <p className="text-sm font-medium dark:text-gray-300">
            Get started in minutes by following our few steps!
        </p>
        <div className="mt-12 space-y-4">
            <Step stepNumber={1} title="Installation">
                <NPMPackage/>
            </Step>
            <Step stepNumber={2} title="Setup">
                <p className="text-sm font-medium mb-3 dark:text-gray-300">
                    Create your widget instance
                </p>
                <SyntaxHighlighterPreview codeHeader="dinglo-io.ts" code={packageSetup}/>
            </Step>
            <Step stepNumber={3} title="Engage on your users">
                <p className="text-sm font-medium mb-3 dark:text-gray-300">
                    Listen and respond to your users
                </p>
                <div className="space-y-3">
                    <SyntaxHighlighterPreview codeHeader="messages.tsx" code={codeExample}/>
                    <SyntaxHighlighterPreview codeHeader="create-message.tsx" code={createMessage}/>
                </div>
            </Step>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
            <DocumentationSectionLink path={"/docs/interface"} icon={<Rocket className="w-6 h-6 text-softBlue"/>} title="Interface" label="Explore our built-in dashboard"/>
            <DocumentationSectionLink path={"/docs/message-panel"} icon={<Code className="w-6 h-6 text-softBlue"/>} title="Message Panel" label="Your conversation with users"/>
        </div>
    </div>
    )
}

export default QuickstartPage;