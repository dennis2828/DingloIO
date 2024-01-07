import { Container } from "@/components/container";
import { Header } from "./components/header";
import { LeftSide } from "./components/left-side";

const DocumentationPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container className="py-6">
      <Header />
      <div className="flex mt-10 gap-5">
        <LeftSide/>
        <div>{children}</div>
      </div>
    </Container>
  );
};

export default DocumentationPageLayout;
