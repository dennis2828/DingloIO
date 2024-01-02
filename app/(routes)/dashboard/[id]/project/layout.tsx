import { Container } from "@/components/container";
import { Header } from "@/components/header"

const ProjectPageLayout = ({children}:{children: React.ReactNode}) =>{
    return (
        <Container>
            <div className="min-h-screen flex flex-col">
                <Header/>
                <div>
                    {children}
                </div>
                </div>
        </Container>
    )
}

export default ProjectPageLayout;