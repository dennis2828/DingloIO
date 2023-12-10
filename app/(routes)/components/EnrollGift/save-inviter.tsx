"use client"

import { useEffect } from "react";

export const SaveInviter = ({inviter}:{inviter: string}) =>{

    useEffect(()=>{
        if(inviter && inviter.trim()!=='')
        localStorage.setItem("inviterId",inviter);
    },[]);

    return null;
}