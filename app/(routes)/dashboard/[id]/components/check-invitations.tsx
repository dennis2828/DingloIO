"use client"

import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export const CheckInvitations = ({invitations}: {invitations: string[]}) =>{
    
    useEffect(()=>{
        if(invitations.length>=5){
            const featureNotification = localStorage.getItem("DingloIO-FeatureNotify");

            if(!featureNotification){
                toast({toastType:"SUCCESS", title:"You've unlocked the special feature, MAIL NOTIFICATION while you are offline"});
                localStorage.setItem("DingloIO-FeatureNotify", JSON.stringify(true));
            }
    
        }
    },[]);

    return null;
}