"use client";
import { InfoText } from "@/components/info-text";
import { Button } from "@/components/ui/button";
import { Invitation } from "./invitation";
import { useEffect, useState } from "react";
import { inviteUser } from "@/actions/invite";
import { collectFeature } from "@/actions/collectFeature";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const EnrollGift = ({
  userId,
  invitations,
  uniqueFeature,
  collected,
}: {
  userId: string;
  invitations: string[];
  uniqueFeature: boolean;
  collected: boolean;
}) => {
    const router = useRouter();
    const [collecting, setCollecting] = useState<boolean>(false);

  useEffect(() => {
    async function handleInvite() {
      const inviter = localStorage.getItem("inviterId");

      if (inviter && inviter.trim() !== "") {
        await inviteUser(inviter);
      }
    }

    handleInvite();
    return () => localStorage.removeItem("inviterId");
  }, []);

  return (
    <div className="flex justify-center">
      <div className="dark:shadow-[0px_0px_20px_1px_rgba(126,154,234)] py-5 px-2 dark:rounded-md">
        <p className="text-center font-bold text-[1.15em] xs:text-[1.3em] xsMd:text-[1.4em] sm:text-[1.5em] md:text-[2em] lg:text-[2.3em]">
          Invite <InfoText>your</InfoText> team <InfoText>to</InfoText> unlock a
          special feature
        </p>
        <div className="flex flex-col-reverse md:items-center md:flex-row justify-center gap-3 mt-5">
          <Invitation inviterId={userId} invitations={invitations} />
          <Button
          disabled={invitations.length<5 || collected}
            isLoading={collecting}
            onClick={async () => {
              setCollecting(true);
              const { collected, msg } = await collectFeature();
          
              if(collected) toast.success(msg);
              else toast.error(msg);

              setCollecting(false);
              router.refresh();
            }}
            aria-label="COLLECT UNIQUE FEATURE NOW"
            variant={"softDefault"}
            className={cn(
              "hover:scale-95 self-center dark:bg-transparent transition-[500ms] whitespace-break-spaces",
              uniqueFeature &&
                "dark:bg-lightBlue text-gray-300 pointer-events-none"
            )}
          >
            {uniqueFeature ? <Check className="w-4 h-4 mr-2" /> : null}{" "}
            {uniqueFeature
              ? "UNIQUE FEATURE WAS COLLECTED"
              : "COLLECT UNIQUE FEATURE NOW"}
          </Button>
        </div>
      </div>
    </div>
  );
};
