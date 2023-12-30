import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { InfoText } from "@/components/info-text";
import { getAuthSession } from "@/lib/authOptions";
import { Separator } from "@/components/ui/separator";
import { ProjectFeed } from "./components/project-feed";


const DashboardPage = async () =>{
    
    const session = await getAuthSession();

    return (
        <Container>
            <Header/>
            <div className="mt-16">
                <h1 className="font-bold text-[1.15em] xss:text-[1.19em] xs:text-[1.25em] xsMd:text-[1.4em] xsBig:text-[1.45em] sm:tet-[1.5em] md:text-[2em] lg:text-[2.5em]">Your <InfoText>projects</InfoText> (2)</h1>
            </div>
            <Separator className="h-[1.5px] mt-5 w-full bg-softBlue"/>
            <div className="mt-10">
                <ProjectFeed userId={session!.user!.id}/>
            </div>
        </Container>
    )
}

export default DashboardPage;