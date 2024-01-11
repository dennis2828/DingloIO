import Image from "next/image";
import { DocumentationSectionLink } from "../components/documentation-section-link";
import { ArrowRight, File, FileBadge, FileBox, FolderArchive, Text, Waves } from "lucide-react";

const AgentCustomizationPage = () => {
  return (
    <div>
      <h1 className="font-bold text-[2.3em]">Workflow</h1>
      <p className="text-sm font-medium dark:text-gray-300">
        This is a simplificated version that showcase the workflow behind the widget
      </p>
      <div className="mt-6">
        <Image
          src={"/workflow.png"}
          width={2406}
          height={2202}
          className="w-full h-full mx-auto max-h-[600px] rounded-md object-cover"
          priority
          quality={100}
          alt="Agent Customization"
        />

        <div>
            <p className="font-bold">
                How it works?
            </p>
            <p className="text-sm font-medium dark:text-gray-300">
                When a new message is created, the payload is sent to the server which is proccessing it, and based on that is emitting, to the specific client. All events are following this flow as is
                flexibble and more easy to handle.
            </p>
        </div>
        <div className="mt-4">
            <p className="font-bold">
                What if there is some error?
            </p>
            <p className="text-sm font-medium dark:text-gray-300">
                We care about your relationships with your users, that's why we have implemented alongside chat widget itself, an internal error handling which enusures that the conversation is in sync even if there is an error.

                <br/>For example let's say that you responded to your user, and while processing it's being thrown an error for any reason, the message will not be delivered or if it is, it is taken out from the client, by the server, ensuring that no buggy or short-lifetime messages are in.
            </p>
        </div>
        
      </div>
      <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
      <DocumentationSectionLink path={"/docs/customization"} icon={<FileBox className="w-6 h-6 text-softBlue"/>} title="Widget Customization" label="Learn how to customize your chat widget"/>

                <DocumentationSectionLink path={"/docs"} icon={<Text className="w-6 h-6 text-softBlue"/>} title="Introduction" label="Back to introduction"/>
            </div>
    </div>
  );
};

export default AgentCustomizationPage;
