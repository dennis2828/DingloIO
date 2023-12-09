"use client"

import { toast } from "@/components/ui/use-toast"
import { absoluteURL, copyText } from "@/lib/utils"
import { Copy, CopyCheck } from "lucide-react"
import { useEffect, useState } from "react"

export const Invitation = ({inviterId}:{inviterId: string}) =>{
    const [copied, setCopied] = useState<boolean>(false);

    const invitationLink = absoluteURL(`?inviter=${inviterId}`)
    
    async function handleCopyInvitationLink(){
        try {
            await copyText(invitationLink);
            setCopied(true);
            toast({title:"Copied to clipboard.",toastType:"COPY"})
        } catch (error) {
            toast({title:"Something went wrong.", toastType:"DANGER"})
        }
    }

    useEffect(()=>{
        if(copied)
            setTimeout(()=>{
                setCopied(false);
            },3000);
    },[copied]);

    return (
        <div role="input" className="bg-softBlue cursor-pointer p-2 rounded-md group text-sm flex flex-col xss:flex-row justify-center">
            <div role="button" onClick={handleCopyInvitationLink} className="flex text-xs whitespace-break-spaces items-center px-1 text-muted dark:text-gray-100 text-center group-hover:text-gray-300 font-medium truncate">
                {invitationLink}
            </div>
            <div className="flex items-center justify-center group bg-softBlue px-3rounded-r-md">
                {!copied ? 
                    <Copy className="w-4 h-4 group-hover:text-gray-200 dark:text-gray-100 text-muted duration-100"/>
                    :
                    <CopyCheck className="w-4 h-4 group-hover:text-gray-200 dark:text-gray-100 text-muted duration-100"/>
                }
            </div>
        </div>
    )
}