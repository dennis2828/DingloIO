import { AppApiKey } from "./api-key"
import { DataInfo } from "./data-info"
import { ClientProject } from "@/types";

interface ProjectStatisticsProps {
    project: ClientProject;
}

export const ProjectStatistics = ({project}: ProjectStatisticsProps) =>{
    return (
        <div>
            <div className="flex flex-col gap-3 sm:flex-row items-center">
                <DataInfo className="order-2 sm:order-none" amount={5} label="new messages"/>
                <div className="order-1 sm:order-none">
                    <AppApiKey project={project}/>
                </div>
                <DataInfo className="order-3 sm:order-none" amount={15} label="online agents"/>
            </div>
        </div>
    )
}