import { Container } from "@/components/container";
import { InitDingloIO } from "./components/init-dingloIO";
import { DingloWrapper } from "./components/dinglo-wrapper";


const DashboardTestPage = async () =>{

    return (
        <div>
            <Container>
                <h1 className="font-bold text-[1.5em] text-center">
                This simulates a real scenario between a client and the admin. <br/>
                Make sure that you have also the dashboard open. You should see a new connection instance
                </h1>
            </Container>
            <DingloWrapper/>
        </div>
    )
}

export default DashboardTestPage;
