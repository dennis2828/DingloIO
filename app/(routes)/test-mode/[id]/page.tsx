import { Container } from "@/components/container";
import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { InitDingloIO } from "./components/init-dingloIO";


const DashboardTestPage = async ({params, searchParams}:{params:{id: string}, searchParams:{conversation: string}}) =>{
    const session = await getAuthSession();

    const targetProject = await db.project.findUnique({
        where:{
            id:params.id,
            userId: session!.user!.id!,
        },
    });

    if(!targetProject) redirect("/dashboard");

    return (
        <div>
            <Container>
                <h1 className="font-bold text-[1.5em] text-center">
                This simulates a real scenario between a client and the admin. <br/>
                Make sure that you have also the dashboard open
                </h1>
            </Container>
            <InitDingloIO/>
        </div>
    )
}

export default DashboardTestPage;
