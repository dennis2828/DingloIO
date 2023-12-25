"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/useSocket";
import { NewMessage } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

interface MessagesProps {
    chatId: string;
    messages: Array<NewMessage>;
    setMessages: Dispatch<SetStateAction<Array<NewMessage>>>;
}

export const Messages = ({chatId, messages, setMessages}: MessagesProps) =>{
    const {socket} = useSocket(state=>state);
    
    const [agentMessage, setAgentMessage] = useState<string>("");

    return (
        <div>
            <p>active: {chatId}</p>
            <div>
                {messages.map((msg, index)=>(
                    <p key={index} className={`${msg.isAgent ? "text-end":"text-start"}`}>{msg.message}</p>
                ))}
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                
            }} className="mt-2 mb-1">
                <Input value={agentMessage} onChange={(e)=>setAgentMessage(e.target.value)} className="bg-transparent mb-1 border-lightBlue px-1" placeholder="Write your message"/>
                <Button type="submit" onClick={()=>{
                    if(!socket) return;

                    socket.emit("DingloServer-DashboardMessage",{...messages[0], message:agentMessage, isAgent: true})
                    setMessages(prev=>[...prev, {connectionId:chatId, message:agentMessage, isAgent: true, messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}])
                }}>send back</Button>
            </form>
        </div>
    )
}