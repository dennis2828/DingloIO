"use client"
import { useEffect } from "react"
import dingloIO from "@/dinglo"
import { DingloIOWidget } from "dingloio2";

export const InitDingloIO = () =>{

    useEffect(()=>{
        dingloIO.initializeSocket();
    },[]);

        return (
            <div>
                <DingloIOWidget dingloIO={dingloIO} contentClassname="bg-white" inputClassname="bg-white text-black"/>
            </div>
        )
   
}