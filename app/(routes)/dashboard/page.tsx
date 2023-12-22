import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import { redirect } from "next/navigation";


const DashboardPage = async () =>{
    
    const session = await getAuthSession();

    if(session && session.user){
        const user = await db.user.findUnique({
            where:{
                id: session.user.id,
            },
            include:{
                projects: true,
            },
        });

        if(user && user.projects.length>0)
            redirect(`/dashboard/${user.projects[0].id}`);
        else redirect("/project/create");
    }else{
        redirect("/project/create");
    }

    return null;
}

export default DashboardPage;