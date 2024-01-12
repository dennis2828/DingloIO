import { DocumentationSectionLink } from "../components/documentation-section-link";
import { Text } from "lucide-react";
import { InfoText } from "@/components/info-text";
import { SyntaxHighlighterPreview } from "../components/syntax-highlighter";
import { events, offEvent, onEvent, respondMessage, saveMessage } from "../constants";

const ApiReferencePage = () => {
  return (
    <div>
      <h1 className="font-bold text-[2.3em]">API Reference</h1>
      <p className="text-sm font-medium dark:text-gray-300">
        Explore our object methods in order to get started !
      </p>
      <div className="mt-6">
      <div>
            <p className="font-bold">
                dingloIO.<InfoText>respond&#40;&#41;</InfoText>
            </p>
            <p className="text-sm font-medium mb-2 dark:text-gray-300">
                Allows you to send back a reponse to the client, basically a new message. The object that is being passed should contain the necessary information about the message, that's why we have defined
                a very simple structure that must be respected. The rest is on us.
            </p>
            <SyntaxHighlighterPreview code={respondMessage}/>
        </div>
        <div className="mt-6">
            <p className="font-bold">
                dingloIO.<InfoText>save&#40;&#41;</InfoText> - async
            </p>
            <p className="text-sm font-medium mb-2 dark:text-gray-300">
                By calling the save method, will make sure that the message object passed, will also be created in our database and this will ensure the data to persist.
                <br/>This should be used alongside the respond&#40;&#41; method, so the message will persist.
            </p>
            <SyntaxHighlighterPreview code={saveMessage}/>
        </div>
        <div className="mt-6">
            <p className="font-bold">
                dingloIO.<InfoText>on&#40;&#41;</InfoText>
            </p>
            <p className="text-sm font-medium mb-2 dark:text-gray-300">
                The on&#40;&#41; method is allowing you to listen for a specific event
            </p>
            <SyntaxHighlighterPreview code={onEvent}/>
        </div>
        <div className="mt-6">
            <p className="font-bold">
                Events
            </p>
            <p className="text-sm font-medium mb-2 dark:text-gray-300">
                All possible events
            </p>
            <SyntaxHighlighterPreview code={events}/>
        </div>
        <div className="mt-6">
            <p className="font-bold">
                dingloIO.<InfoText>off&#40;&#41;</InfoText>
            </p>
            <p className="text-sm font-medium mb-2 dark:text-gray-300">
                This will disable a specific event.
            </p>
            <SyntaxHighlighterPreview code={offEvent}/>
        </div>
        <p className="text-sm font-medium dark:text-gray-300 mt-5"></p>
      </div>
      <div className="mt-12 flex justify-center">
      <DocumentationSectionLink
          path={"/docs"}
          icon={<Text className="w-6 h-6 text-softBlue" />}
          title="Introduction"
          label="Back to introduction"
        />            </div>
    </div>
  );
};

export default ApiReferencePage;
