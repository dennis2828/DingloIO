import Image from "next/image";
import { DocumentationSectionLink } from "../components/documentation-section-link";
import { FileBox, MessageCircle, User, Waves } from "lucide-react";
import Link from "next/link";

const AgentCustomizationPage = () => {
  return (
    <div>
      <h1 className="font-bold text-[2.3em]">Agent Customization</h1>
      <p className="text-sm font-medium dark:text-gray-300">
        Change your profile, visible on the chat widget to fit your app requirements!
      </p>
      <div className="mt-6">
        <Image
          src={"/predefined-answers.png"}
          width={2242}
          height={1230}
          className="w-full h-full mx-auto max-h-[600px] rounded-md object-cover"
          priority
          quality={100}
          alt="Agent Customization"
        />

        <div>
            <p className="font-bold">
                Profile appeareance
            </p>
            <p className="text-sm font-medium dark:text-gray-300">
            Change your default profile image and name into something that matches your website requirements by clicking on them
            </p>
        </div>

        <div className="mt-4">
            <p className="font-bold">
                Default answers
            </p>
            <p className="text-sm font-medium dark:text-gray-300">
                Define a question - answer structure that will be automatically triggered if the user intended to. This will create a section on your chat widget with all the questions that you&apos;ve defined allowing users to select them, making a better UX for asking common questions.<br/>
            </p>
        </div>
       
        <div className="mt-4">
            <p className="font-bold">
                Manage connections
            </p>
            <p className="text-sm font-medium dark:text-gray-300">
                By deleting a connection you will delete all the messages related to that conversation and also the <Link href={`/docs/interface`} className="text-softBlue border-b border-softBlue hover:border-none">unique identifier</Link>
            </p>
        </div>

        <div className="mt-4">
            <p className="font-bold">
                Project status
            </p>
            <p className="text-sm font-medium dark:text-gray-300">
                You can toggle the chat widget status by interacting with the turn off button, which will trigger an event that will shut down the project, making it unusable until your reboot it again. This can be useful if you want to disable it for some reasons like, a security breach, experimenting, etc.
            </p>
        </div>
      </div>
      <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
                <DocumentationSectionLink path={"/docs/workflow"} icon={<Waves className="w-6 h-6 text-softBlue"/>} title="Workflow" label="See how Dinglo.IO works"/>
                <DocumentationSectionLink path={"/docs/customization"} icon={<FileBox className="w-6 h-6 text-softBlue"/>} title="Widget Customization" label="Learn how to customize your chat widget"/>
            </div>
    </div>
  );
};

export default AgentCustomizationPage;
