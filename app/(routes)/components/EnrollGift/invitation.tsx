"use client"

import toast from "react-hot-toast"
import { absoluteURL, cn, copyText } from "@/lib/utils"
import { Copy, CopyCheck } from "lucide-react"
import { useEffect, useState } from "react"

export const Invitation = ({inviterId, invitations}:{inviterId: string, invitations: string[]}) =>{
    const [copied, setCopied] = useState<boolean>(false);

    const invitationLink = absoluteURL(`?inviter=${inviterId}`)
    
    async function handleCopyInvitationLink(){
        try {
            await copyText(invitationLink);
            setCopied(true);
            toast.success("Copied to clipboard.")
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        }
    }

    useEffect(()=>{
        if(copied)
            setTimeout(()=>{
                setCopied(false);
            },3000);
    },[copied]);

    return (
        <>
            <div role="input" className="bg-softBlue cursor-pointer p-2 rounded-md group text-sm flex flex-col xss:flex-row justify-center">
                <div role="button" onClick={handleCopyInvitationLink} className="flex text-xs whitespace-break-spaces items-center px-1 text-muted dark:text-gray-100 text-center group-hover:text-gray-300 font-medium truncate">
                    {invitationLink}
                </div>
                <div className="flex items-center justify-center group bg-softBlue px-3 rounded-r-md">
                    {!copied ? 
                        <Copy className="w-4 h-4 group-hover:text-gray-200 dark:text-gray-100 text-muted duration-100"/>
                        :
                        <CopyCheck className="w-4 h-4 group-hover:text-gray-200 dark:text-gray-100 text-muted duration-100"/>
                    }
                </div>
            </div>
            <p className={cn("mr-2 font-bold text-center", invitations.length >= 5 && "font-bold text-softBlue")}>{invitations.length <=5 ? <span>{invitations.length}</span>:<span className="text-softBlue">5</span>} / 5</p>
        </>
       
    )
}