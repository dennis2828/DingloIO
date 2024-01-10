import Image from "next/image";
import { DocumentationSectionLink } from "../components/documentation-section-link";
import { MessageCircle, User } from "lucide-react";

const DashboardInterfacePage = () => {
  return (
    <div>
      <h1 className="font-bold text-[2.3em]">Dashboard Interface</h1>
      <p className="text-sm font-medium dark:text-gray-300">
        Explore our super lightweight and intuitive dashboard interface!
      </p>
      <div className="mt-6">
        <Image
          src={"/dashboard-interface.png"}
          width={2295}
          height={1263}
          className="w-full h-full mx-auto max-h-[600px] rounded-md object-cover"
          priority
          quality={100}
          alt="Dashboard interface"
        />
        <p className="text-sm font-medium dark:text-gray-300 mt-5">
          Reach to your users marked as a connection string on the left side and
          start elevating your profit !
        </p>
        <p className="text-sm font-medium dark:text-gray-300 mt-5">
          New connections string will appear as a new user is visting your
          website having a unique identifier attached to them. You can also
          delete a conversation represented by the connection string and the
          changes will also reflect to the client. This means that on a new visit, the same user will have the same identifier, which is the connection string.
        </p>
        <p className="text-sm font-medium dark:text-gray-300 mt-5"></p>
      </div>
      <div className="mt-12 flex flex-col md:flex-row justify-between gap-10">
                <DocumentationSectionLink path={"/agent-customization"} icon={<User className="w-6 h-6 text-softBlue"/>} title="Agent customization" label="Customize what your users see"/>
                <DocumentationSectionLink path={"/api-reference"} icon={<MessageCircle className="w-6 h-6 text-softBlue"/>} title="Workflow" label="Learn our chat widget flow"/>
            </div>
    </div>
  );
};

export default DashboardInterfacePage;
