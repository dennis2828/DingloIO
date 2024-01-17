"use client"
import { useEffect } from "react"
import dingloIO from "@/dinglo"
import { DingloIOWidget } from "dinglo-widget14";

export const InitDingloIO = () =>{

    useEffect(()=>{
        dingloIO.initializeSocket();
    },[]);

    return (
        <div>
            <DingloIOWidget dingloIO={dingloIO}/>
        </div>
    )
}