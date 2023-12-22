import { AppWindow } from "lucide-react";
import { PageInfo } from "../components/page-info";
import { ProjectAmount } from "./components/project-amount";
import { StyledLink } from "@/components/ui/link";
import { CreateProjectForm } from "./components/form/create-project-form";
import Image from "next/image";

const CreateProjectPage = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col items-center md:flex-row justify-between">
        <PageInfo
          label="Create a new project"
          icon={<AppWindow className="w-5 h-5 text-white dark:text-softBlue" />}
        />
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <ProjectAmount />
          <StyledLink href="/projects/more">More projects</StyledLink>
        </div>
      </div>
      <div className="mt-16 flex gap-20 justify-center lg:justify-between">
        <CreateProjectForm />
        <div className="relative">
            <Image
            src={"/user-chat.jpg"}
            width={2000}
            height={1333}
            className="hidden lg:block w-full h-full max-w-[600px] max-h-[700px] rounded-md object-cover"
            quality={100}
            priority
            alt="user-chat image"
            />
            <div className="dark:absolute top-0 bottom-0 left-0 right-0 bg-black/5"></div>
        </div>
        
      </div>
    </div>
  );
};

export default CreateProjectPage;
