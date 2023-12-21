import { Container } from "@/components/container";
import { Header } from "@/components/header"

const ProjectPageLayout = ({children}:{children: React.ReactNode}) =>{
    return (
        <Container>
            <Header/>
            <div className="mt-20">
                {children}
            </div>
        </Container>
    )
}

export default ProjectPageLayout;