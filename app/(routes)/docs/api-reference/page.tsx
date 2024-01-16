import { DocumentationSectionLink } from "../components/documentation-section-link";
import { Text } from "lucide-react";
import { InfoText } from "@/components/info-text";
import { SyntaxHighlighterPreview } from "../components/syntax-highlighter";
import {
  codeExample,
  createMessage,
  events,
  offEvent,
  onEvent,
  packageSetup,
  respondMessage,
  saveMessage,
  tailwindGlobal,
  tailwindInit,
} from "../constants";
import { NPMPackage } from "../../components/Npm/npm-package";

const ApiReferencePage = () => {
  return (
    <div>
      <h1 className="font-bold text-[2.3em]">API Reference</h1>
      <p className="text-sm font-medium dark:text-gray-300 mb-4">
        Explore our object methods in order to get started !
      </p>
      <NPMPackage/>
      <div className="mt-6">
        <SyntaxHighlighterPreview codeHeader="dinglo-io.ts" code={packageSetup}/>
      </div>
      <div className="mt-6">
        <SyntaxHighlighterPreview codeHeader="tailwind.config.ts" code={tailwindInit}/>
      </div>
      <div className="mt-6">
        <SyntaxHighlighterPreview codeHeader="globals.css" code={tailwindGlobal}/>
      </div>
   
      <div className="mt-6">
        <div>
          <p className="font-bold">
            dingloIO.<InfoText>respond&#40;&#41;</InfoText>
          </p>
          <p className="text-sm font-medium mb-2 dark:text-gray-300">
            This function enables you to send a response to the client,
            essentially creating a new message. The object passed to this
            function should contain the necessary information about the message.
            To ensure proper communication, we have defined a straightforward
            structure that must be adhered to. The rest will be taken care of by
            the system.
          </p>
          <SyntaxHighlighterPreview code={respondMessage} />
        </div>
        <div className="mt-6">
          <p className="font-bold">
            dingloIO.<InfoText>save&#40;&#41;</InfoText> - asynchronous
          </p>
          <p className="text-sm font-medium mb-2 dark:text-gray-300">
          Calling the save method ensures that the provided message object will be created in our database, guaranteeing data persistence. It is recommended to use this method in conjunction with the respond() method to ensure the message is properly persisted.

          </p>
          <SyntaxHighlighterPreview code={saveMessage} />
        </div>
        <div className="mt-6">
          <p className="font-bold">
            dingloIO.<InfoText>on&#40;&#41;</InfoText>
          </p>
          <p className="text-sm font-medium mb-2 dark:text-gray-300">
            The on&#40;&#41; method is allowing you to listen for a specific
            event
          </p>
          <SyntaxHighlighterPreview code={onEvent} />
        </div>
        <div className="mt-6">
          <p className="font-bold">Events</p>
          <p className="text-sm font-medium mb-2 dark:text-gray-300">
            All possible events
          </p>
          <SyntaxHighlighterPreview code={events} />
        </div>
        <div className="mt-6">
          <p className="font-bold">
            dingloIO.<InfoText>off&#40;&#41;</InfoText>
          </p>
          <p className="text-sm font-medium mb-2 dark:text-gray-300">
            This will disable a specific event.
          </p>
          <SyntaxHighlighterPreview code={offEvent} />
        </div>
        <div className="mt-6 space-y-6 ">
                    <SyntaxHighlighterPreview codeHeader="messages.tsx" code={codeExample}/>
                    <SyntaxHighlighterPreview codeHeader="create-message.tsx" code={createMessage}/>
                </div>      </div>
      <div className="mt-12 flex justify-center">
        <DocumentationSectionLink
          path={"/docs"}
          icon={<Text className="w-6 h-6 text-softBlue" />}
          title="Introduction"
          label="Back to introduction"
        />{" "}
      </div>
    </div>
  );
};

export default ApiReferencePage;
