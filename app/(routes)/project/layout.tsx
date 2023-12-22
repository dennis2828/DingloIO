import { Container } from "@/components/container";
import { Header } from "@/components/header"
import { Footer } from "../components/Footer/footer";

const ProjectPageLayout = ({children}:{children: React.ReactNode}) =>{
    return (
        <Container>
            <div className="min-h-screen flex flex-col">
                <Header/>
                <div className="flex-1">
                    {children}
                </div>
                <section className="mt-32">
                    <Footer/>
                </section>
            </div>
        </Container>
    )
}

export default ProjectPageLayout;