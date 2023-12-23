"use client";

import { toast } from "@/components/ui/use-toast";
import { copyText } from "@/lib/utils";
import { ClientProject } from "@/types";

interface AppApiKeyProps{
  project: ClientProject;
}

export const AppApiKey = ({project}: AppApiKeyProps) => {
  return (
    <div
      role="button"
      onClick={() => {
        copyText(project.api_key);
        toast({ toastType: "SUCCESS", title: "API KEY was copied." });
      }}
      className="group text-gray-800 dark:text-gray-300 sm:flex-col sm:items-center sm:gap-1 cursor-pointer hover:text-gray-700 duration-150"
    >
      <p className="text-[1.7em] font-semibold text-center dark:text-white dark:group-hover:text-gray-200">
        {project.projectName}
      </p>
      <div>
        <p className="text-sm text-center">api_key:</p>
        <span className="text-xs text-center">{project.api_key}</span>
      </div>
    </div>
  );
};
