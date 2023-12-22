import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const DashboardPage = async ({searchParams}:{searchParams:{appId: string}}) =>{
    console.log(searchParams);
    
    if(!searchParams.appId || searchParams.appId.trim()==="" || Object.keys(searchParams).length===0){
        const session = await getAuthSession();
        const user = await db.user.findUnique({
            where:{
                id: session!.user!.id,
            },
            include:{
                projects:true,
            },
        });

        if(user!.projects.length>0){
            redirect(`/dashboard/${user!.projects[0].id}`);
        }else{
            redirect(`/project/create`)
        }
    }else {
        redirect(`/dashboard/${searchParams.appId}`);

    }
    
    return null;
}

export default DashboardPage;