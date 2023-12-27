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
    const [placeholderMessage, setPlaceholderMessage] = useState<string>("Write your message");

    return (
        <div>
            <div className="space-y-6 max-h-[500px] overflow-y-scroll overflowContainer">
                {messages.map((msg, index)=>(
                    <div key={index} className={`${msg.isAgent ? "bg-softBlue ml-auto text-white":"bg-white mr-auto text-softBlue"} px-2 py-.5 max-w-full w-fit font-medium rounded-md`}>
                        <p className={`text-sm ${msg.isAgent ? "text-gray-300":"text-gray-400"} font-normal text-center`}>{msg.isAgent ? "admin":"client"}</p>
                        <p className={`${msg.isAgent ? "text-end":"text-start"}`}>{msg.message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                
            }} className="mt-2 mb-1">
                <Input value={agentMessage} onChange={(e)=>setAgentMessage(e.target.value)} className="bg-transparent mb-1 border-lightBlue px-1" placeholder={placeholderMessage}/>
                <div className="flex justify-start xsBig:justify-center">
                    <Button type="submit" onClick={()=>{
                        if(!socket) return;

                        if(agentMessage && agentMessage.trim()!==""){
                            socket.emit("DingloServer-DashboardMessage",{connectionId:chatId, message:agentMessage, isAgent: true, messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})
                            setMessages(prev=>[...prev, {connectionId:chatId, message:agentMessage, isAgent: true, messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}]);
                        }else{
                            setPlaceholderMessage("Cannot sent empty messages");
                        }


                    }} className="sm:w-[350px] font-bold sm:text-[1em] mt-1">Send</Button>
                </div>
                
            </form>
        </div>
    )
}