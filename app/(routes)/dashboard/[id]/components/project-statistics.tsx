import { formatCreatedAt } from "@/lib/utils";
import { AppApiKey } from "./api-key"
import { ClientProject } from "@/types";

interface ProjectStatisticsProps {
    project: ClientProject;
    invitations: string[];
}

export const ProjectStatistics = ({project, invitations}: ProjectStatisticsProps) =>{
    
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center order-3 sm:order-none">
                <p className="font-medium text-sm">Status:</p>
                <div className={`ml-2 w-[10px] h-[10px] rounded-full ${project.disabled ? "bg-red-500":"bg-green-500"}`}/>
                <p className={`ml-1 text-sm ${project.disabled ? "text-red-500":"text-green-600"}`}>{project.disabled ? "offline":"active"}</p>
            </div>
            <div className="">
                <p className="text-[1.7em] font-semibold text-center dark:text-white dark:group-hover:text-gray-200">
                    Project:  <span className="text-softBlue">{project.projectName}</span>
                </p>
                <AppApiKey project={project}/>
            </div>
            <div>
                <p className="text-gray-500 font-medium text-sm mt-4 sm:mt-0">{formatCreatedAt(project.createdAt)}</p>
                <p className={`text-sm font-medium ${invitations.length>=5 ? "text-gray-400":null}`}>Invitations: <span className={`${invitations.length >=5 ? "font-bold text-softBlue":null}`}>{invitations.length}/5</span></p>
                <small className="text-gray-500">get mail notification while offline</small>
            </div>
            
        </div>
    )
}