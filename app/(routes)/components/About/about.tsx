import { InfoText } from "@/components/info-text";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { InteractiveChatWidget } from "./interactive-chat-widget";

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
            <div>
                <p className="text-center font-bold">Interactive Chat Widget</p>
                <div className="flex flex-col md:flex-row mt-2 gap-4">
                    <div className="flex-1">
                        <p className="font-light">Try out our <InfoText>presentational</InfoText>  widget to make a <InfoText>brief</InfoText> feedback on our <InfoText>system</InfoText>.</p>
                        <small className="text-slate-600">* note that this is a presenation version of our chat widget to test *</small>
                    </div>
                    <div className="flex-1">
                        <InteractiveChatWidget/>
                    </div>
                </div>
            </div>
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