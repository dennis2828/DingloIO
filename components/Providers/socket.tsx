"use client"

import { useSocket } from "@/hooks/useSocket"
import { useEffect } from "react"

export const SocketProvider = ()=>{
    const {socket, initializeSocket, disconnectSocket} = useSocket();
    
    useEffect(()=>{
        initializeSocket();

        return ()=>{
            if(socket)
                disconnectSocket();
        }
    },[]);

    return null;
}