"use client";

import { copyText } from "@/lib/utils";
import { ClientProject } from "@/types";
import toast from "react-hot-toast";

interface AppApiKeyProps{
  project: ClientProject;
}

export const AppApiKey = ({project}: AppApiKeyProps) => {
  return (
    <div
      role="button"
      onClick={() => {
        copyText(project.api_key);
        toast.success("API KEY was copied.")
      }}
      className="group text-gray-800 dark:text-gray-300 sm:flex-col sm:items-center sm:gap-1 cursor-pointer hover:text-gray-700 duration-150"
    >
        <p className="text-sm text-center">api_key:</p>
        <p className="text-sm text-center">{project.api_key}</p>
    </div>
  );
};
