"use client"
import { Button } from "@/components/ui/button"
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export const Messages = () =>{
    const {socket} = useSocket(state=>state);

    const [messages, setMessages] = useState<Array<string>>([]);

    useEffect(()=>{
        if(!socket) return;

        socket.on("DingloClient-DashboardMessage",(msg)=>{
            setMessages(prev=>[...prev, msg.message])
            socket.emit("DingloServer-DashboardMessage",{...msg, isAgent: true, message:"raspuns din dashboard"});
        });
        return ()=>{
            socket?.off("DingloClient-DashboardMessage");
        }
    },[socket]);


    return (
        <div>
            <div>
                {messages.map((msg, index)=>(
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <div>
                <Button>send back</Button>
            </div>
        </div>
    )
}