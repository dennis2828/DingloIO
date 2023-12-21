import { AppWindow } from "lucide-react";
import { PageInfo } from "../components/page-info";

const CreateProjectPage = () =>{
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <PageInfo label="Create a new project" icon={<AppWindow className="w-5 h-5 text-white dark:text-softBlue"/>}/>
               
            </div>
        </div>
    )
}

export default CreateProjectPage;