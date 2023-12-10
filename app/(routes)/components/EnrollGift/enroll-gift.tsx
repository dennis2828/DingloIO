"use client"
import { InfoText } from "@/components/info-text"
import { Button } from "@/components/ui/button"
import { Invitation } from "./invitation"
import { useEffect } from "react"
import { inviteUser } from "@/actions/invite"
import { toast } from "@/components/ui/use-toast"


export const EnrollGift = ({userId, invitations}:{userId: string, invitations: string[]}) =>{

    useEffect(()=>{
        async function handleInvite(){
            const inviter = localStorage.getItem("inviterId");

            if(inviter && inviter.trim()!==""){
                
               const {invited, msg} = await inviteUser(inviter);
                
                if(!invited)
                    toast({title:msg, toastType:"ERROR"});
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
                    <Button aria-label="COLLECT UNIQUE FEATURE NOW" variant={"softDefault"} className="hover:scale-95 self-center dark:bg-transparent transition-[500ms] whitespace-break-spaces">COLLECT UNIQUE FEATURE NOW</Button>
                </div>
            </div>
        </div>
    )
}