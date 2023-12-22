import { ProjectManager } from "./components/project-manager";
import { ProjectStatistics } from "./components/project-statistics";
import { Header } from "../../../../components/header";

const DashboardProjectPage = () =>{
    return (
        <div className="min-h-[300vh]">
            <Header/>
            <div>
                <div className="mt-16">
                    <ProjectManager/>
                </div>
                <div className="mt-14">
                    <ProjectStatistics/>
                </div>
            </div>
        </div>
    )
}

export default DashboardProjectPage;