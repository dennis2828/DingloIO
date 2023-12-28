"use client"

import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const InitSocket = ({id}:{id: string}) =>{
    const {socket, setSocket} = useSocket(state=>state);
    
    useEffect(()=>{

        if(!socket){
            const newSocket = io("http://localhost:3001",{query:{id}});
            setSocket(newSocket);
        }
        
    },[]);
    
    return null;
}