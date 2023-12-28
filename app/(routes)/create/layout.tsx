import { Container } from "@/components/container";
import { Header } from "@/components/header"
import { Footer } from "../components/Footer/footer";

const CreateLayoutPage = ({children}:{children: React.ReactNode}) =>{
    return (
        <Container>
            <Header/>
            {children}
            <div className="mt-32">
                <Footer/>
            </div>
        </Container>
    )
}

export default CreateLayoutPage;