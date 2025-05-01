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
          <Separator className="max-w-[400px] my-3 mx-auto h-[1px] bg-lightBlue" />
          <p className="leading-8">
            And the <InfoText>best</InfoText> part? It is fully <InfoText className="font-medium">customizable</InfoText> and you can get started
            in <InfoText className="font-medium">less</InfoText> than 5 minutes. You have complete <InfoText className="font-medium">control</InfoText> over how it looks
            and behaves—adapt it to perfectly match your website's style and
            flow. We <InfoText className="font-medium">provide</InfoText> the core message socket and <InfoText className="font-medium">event</InfoText> triggers, and all
            you have to do is <InfoText className="font-medium">listen</InfoText> for them and handle them however you want
            on your own <InfoText className="font-medium">app</InfoText>.
          </p>
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
