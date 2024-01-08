import { Container } from "@/components/container";
import { Header } from "./components/header";
import { LeftSide } from "./components/left-side";
import { DocumentationTypes } from "./components/documentation-types";

const DocumentationPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container className="py-6">
      <Header />
      <div className="mt-16">
        <DocumentationTypes/>
      </div>
      <div className="flex mt-10 gap-5">
        <LeftSide/>
        <div className="w-full">{children}</div>
      </div>
    </Container>
  );
};

export default DocumentationPageLayout;
