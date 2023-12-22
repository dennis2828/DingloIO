import { ProjectManager } from "./components/project-manager";
import { ProjectStatistics } from "./components/project-statistics";
import { Header } from "../../../components/header";

const DashboardPage = () =>{
    return (
        <div>
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

export default DashboardPage;