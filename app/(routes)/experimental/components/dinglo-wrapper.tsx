import { getAuthSession } from "@/lib/authOptions"
import { InitDingloIO } from "./init-dingloIO";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export const DingloWrapper = async () =>{
    const session = await getAuthSession();

    const defaultProject = await db.project.findFirst({
        where:{
            userId: session?.user!.id!,
            projectName:"default_app",
        },
    });
    

    if(!defaultProject) redirect("/create");

    return (
        <InitDingloIO clientKey={defaultProject.api_key}/>
    )
}