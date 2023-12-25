import { Container } from "@/components/container";
import { Footer } from "../../components/Footer/footer";

const DashboardLayout = ({children}:{children: React.ReactNode}) =>{
    return (
        <div>
            {children}
            <Container className="mt-32">
                <Footer/>
            </Container>
        </div>
    )
}

export default DashboardLayout;