import { AppWindow } from "lucide-react"
import { ProjectName } from "./project-name"
import { ProjectActive } from "./project-active"
import { PageInfo } from "./page-info"
export const Hero = () =>{
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <PageInfo label="Manage your project" icon={<AppWindow className="w-5 h-5 text-white dark:text-softBlue"/>}/>
                <div className="flex flex-col xsBig:flex-row xsBig:items-center justify-center mt-10 md:mt-0 gap-4">
                    <ProjectName/>
                    <ProjectActive/>
                </div>
            </div>
        </div>
    )
}