import { Container } from "@/components/container";
import db from "@/lib/db";


const DashboardTestPage = async ({params, searchParams}:{params:{id: string}, searchParams:{conversation: string}}) =>{
    
    return (
        <Container>
            <h1 className="font-bold text-[1.5em] text-center">
            This simulates a real scenario between a client and the admin. <br/>
            Make sure that you have also the dashboard open
            </h1>
        </Container>
    )
}

export default DashboardTestPage;
