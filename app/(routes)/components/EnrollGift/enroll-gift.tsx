"use client"
import { InfoText } from "@/components/info-text"
import { Button } from "@/components/ui/button"
import { Invitation } from "./invitation"
import { useEffect, useState } from "react"
import { inviteUser } from "@/actions/invite"
import { toast } from "@/components/ui/use-toast"
import { collectFeature } from "@/actions/collectFeature"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"


export const EnrollGift = ({userId, invitations, uniqueFeature}:{userId: string, invitations: string[], uniqueFeature: boolean}) =>{
    const [collecting, setCollecting] = useState<boolean>(false);

    useEffect(()=>{
        async function handleInvite(){
            const inviter = localStorage.getItem("inviterId");

            if(inviter && inviter.trim()!==""){
                
               await inviteUser(inviter);
            }
        }
        
        handleInvite();
        return () => localStorage.removeItem("inviterId");
    },[]);
    

    return (
        <div className="dark:shadow-[0px_0px_20px_1px_rgba(126,154,234)] py-5 px-2 dark:rounded-md">
            <p className="text-center font-bold text-[1.15em] xs:text-[1.3em] xsMd:text-[1.4em] sm:text-[1.5em] md:text-[2em] lg:text-[2.3em]">Enroll <InfoText>now</InfoText> for a unique <InfoText>feature</InfoText> for the first 200 users</p>
            <p className="text-center text-sm">Use your invite link for another special feature</p>
            <div className="flex flex-col items-center justify-center gap-8">
                <p className="text-center font-medium mt-3 xss:text-[1.1em] sm:text-[1.3em]">157 places <InfoText className="text-lightBlue">left</InfoText></p>
                <div className="flex flex-col-reverse md:items-center md:flex-row gap-3">
                    <Invitation inviterId={userId} invitations={invitations}/>
                    <Button isLoading={collecting} onClick={async ()=>{
                        setCollecting(true);
                        const {collected, msg} = await collectFeature();
                        toast({toastType:collected ? "SUCCESS":"DANGER", title:msg});
                        setCollecting(false);
                    }} aria-label="COLLECT UNIQUE FEATURE NOW" variant={"softDefault"} className={cn("hover:scale-95 self-center dark:bg-transparent transition-[500ms] whitespace-break-spaces",uniqueFeature && "dark:bg-lightBlue text-gray-300 pointer-events-none")}>{uniqueFeature ? <Check className="w-4 h-4 mr-2"/>:null} {uniqueFeature ? "UNIQUE FEATURE WAS COLLECTED":"COLLECT UNIQUE FEATURE NOW"}</Button>
                </div>
            </div>
        </div>
    )
}