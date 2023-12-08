import { Container } from "@/components/container";
import { getAuthSession } from "@/lib/authOptions";
import Image from "next/image";

const AccountPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  
  return (
    <Container className="">
      <div className="flex justify-center items-center gap-20 min-h-screen">
        <div>{children}</div>
        <Image
          src={"/speech-bubble.jpg"}
          width={2000}
          height={1500}
          className="max-w-[500px] hidden lg:block max-h-[500px] object-cover h-screen rounded-md"
          alt="speech image"
        />
      </div>
    </Container>
  );
};

export default AccountPageLayout;
