"use client"
import { useEffect } from "react"
import dingloIO from "@/dinglo"
import { DingloIOWidget } from "dingloio-chatwidget";

export const InitDingloIO = ({clientKey}:{clientKey: string}) =>{

    useEffect(()=>{
        dingloIO.initializeSocket(clientKey);
    },[]);

        return (
            <div>
                <DingloIOWidget dingloIO={dingloIO} contentClassname="bg-white" inputClassname="bg-white text-black"/>
            </div>
        )
   
}