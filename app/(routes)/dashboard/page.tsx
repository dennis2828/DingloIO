import { AppStatistics } from "./components/app-statistics";
import { Header } from "./components/header";

const DashboardPage = () =>{
    return (
        <div>
            <Header/>
            <div>
                <div>left panel</div>
                <div className="mt-20">
                    <AppStatistics/>
                </div>
            </div>
           
        </div>
    )
}

export default DashboardPage;