import { InfoText } from "@/components/info-text";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const About = () => {
  return (
    <>
      <h2 className="font-bold text-center sm:text-left text-[1.05em] xs:text-[1.1em] xsMd:text-[1.3em] sm:text-[1.4em]">
        What is Dinglo.<InfoText>IO</InfoText> ?
      </h2>
      <div className="mt-4 flex flex-col-reverse md:flex-row gap-4">
        <div className="flex-1">
            <p className="leading-8">
            We are a <InfoText className="font-medium">chat widget</InfoText>{" "}
            provider ready-to-use for{" "}
            <InfoText className="font-medium">production</InfoText> to give your
            users an <InfoText className="font-medium">enhanced</InfoText>{" "}
            experience on your platform. And the{" "}
            <InfoText className="font-medium">coolest</InfoText> thing about{" "}
            <span className="bg-lightBlue text-white p-0.5 rounded-sm font-bold">
                Dinglo
            </span>{" "}
            ? We <InfoText className="font-medium">offer</InfoText> the majority
            of the premium <InfoText className="font-medium">features</InfoText>{" "}
            of others providers for absolutley{" "}
            <InfoText className="font-medium">free</InfoText>.
            </p>
            <Separator className="max-w-[400px] my-3 mx-auto h-[1px] bg-lightBlue"/>
            {/* 
            <div>
                <p className="text-center font-bold">Interactive Chat Widget</p>
                <p className="text-sm font-medium text-gray-500 my-3">Sign up for an account and try our experimental mode, without installing it on your machine</p>
                <Link className={buttonVariants({variant:"outline"}) + " group"} href={"/dashboard"}>Try now <ArrowRightFromLineIcon className="ml-2 text-softBlue group-hover:text-white"/></Link>

            </div> */}
        </div>
        
        <div className="flex-1">
          <Image
            src={"/smartphone.jpg"}
            width={1500}
            height={1136}
            className="rounded-md max-w-full max-h-full"
            alt="smartphone-chat"
          />
        </div>
      </div>
    </>
  );
};