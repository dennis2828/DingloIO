import Image from "next/image";
import { DocumentationSectionLink } from "../components/documentation-section-link";
import {
  ArrowRight,
  File,
  FileBadge,
  FileBox,
  FolderArchive,
  Text,
  Waves,
} from "lucide-react";

const AgentCustomizationPage = () => {
  return (
    <div>
      <h1 className="font-bold text-[2.3em]">Workflow</h1>
      <p className="text-sm font-medium dark:text-gray-300">
        This is a simplified version that showcases the workflow behind the
        widget.{" "}
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

        <div className="mt-4">
          <p className="font-bold">How it works?</p>
          <p className="text-sm font-medium dark:text-gray-300">
            When a new message is created, the payload is sent to the server
            which is proccessing it, and based on that is emitting, to the
            specific client. All events are following this flow as is flexibble
            and more easy to handle.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-bold">What if there is some error?</p>
          <p className="text-sm font-medium dark:text-gray-300">
            We prioritize the quality of your interactions with users, which is
            why we have seamlessly integrated an internal error-handling
            mechanism alongside the chat widget itself. This ensures that the
            conversation remains synchronized, even in the event of an error.
            <br />
            For instance, if you provide a response to a user and an error
            occurs during processing, the message will either not be delivered,
            or if it has been delivered, it will be promptly removed from the
            client by the server. This meticulous error-handling approach
            guarantees the exclusion of any problematic or short-lived messages,
            preserving the integrity of your communication process.
          </p>
        </div>
      </div>
      <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
        <DocumentationSectionLink
          path={"/docs/api-reference"}
          icon={<FileBox className="w-6 h-6 text-softBlue" />}
          title="API Reference"
          label="Learn how to use our methods"
        />
        <DocumentationSectionLink
          path={"/docs"}
          icon={<Text className="w-6 h-6 text-softBlue" />}
          title="Introduction"
          label="Back to introduction"
        />
      </div>
    </div>
  );
};

export default AgentCustomizationPage;
