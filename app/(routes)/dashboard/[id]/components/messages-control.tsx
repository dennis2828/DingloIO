"use client"
import { useEffect, useState } from "react"
import { Messages } from "./messages"
import { useSocket } from "@/hooks/useSocket"
import { Instance } from "./instance"
import { NewMessage } from "@/types"
import { Message } from "@prisma/client"
import { Separator } from "@/components/ui/separator"

interface MessageControlProps{
    connections: string[];
    conversationsMessages: Array<Message>;
}

export const MessagesControl = ({connections, conversationsMessages}:MessageControlProps) =>{
    const {socket} = useSocket(state=>state);
    
    const [currentChats, setCurrentChats] = useState<Array<string>>(connections);
    
    const [curentConversationsMessages, setCurrentConversationsMessages] = useState(conversationsMessages);

    const [chatWithId, setChatWithId] = useState<string>(connections[0] || "");
    const [chatWithIdMessages, setChatWithIdMessages] = useState<Array<NewMessage>>([]);
    

    // handle incoming messages
    useEffect(()=>{ 
        if(!socket) return;
        socket.off("DingloClient-DashboardMessage");

        socket.on("DingloClient-DashboardMessage",(message: NewMessage)=>{

                setCurrentChats(prev=>{
                    const findChat = prev.find(chat=>chat===message.connectionId);
                    if(!findChat)
                        return [message.connectionId, ...prev];
                    return prev;
                });
                //select the chat
                setChatWithId(prev=>{
                    if(!prev || prev.trim()==="")
                        return message.connectionId;
                    return prev;
                });
      
            // add new chatId related messages
            setCurrentConversationsMessages(prev=>[...prev, {id:"test", message:message.message, isAgent:false, conversationId:message.connectionId, messagedAt:new Date(Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}])
            if(message.connectionId===chatWithId){
                setChatWithIdMessages(prev=>[...prev, message]);
            }
            
        });

        return ()=>{
            socket.off("DingloClient-DashboardMessage");
        }

    },[socket, chatWithId]);

    useEffect(()=>{
        
        if(!chatWithId || chatWithId.trim()==="") return;
        //filter conversations messages
        const filteredMessages: Array<NewMessage> = [];
        
        for(const cm of curentConversationsMessages){
            if(cm.conversationId===chatWithId){

                filteredMessages.push({
                    connectionId: cm.conversationId,
                    isAgent: cm.isAgent,
                    message: cm.message,
                    messagedAt: cm.messagedAt,
                });
            }
        }
      
        
        setChatWithIdMessages(filteredMessages);
    },[chatWithId]);    


    return (
        <div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
                {currentChats.map((chatInstance, idx)=>(
                    <Instance key={idx} handleClick={()=>setChatWithId(chatInstance)} selectedChat={chatWithId} chatId={chatInstance}/>
                ))}
            </div>
            <Separator className="w-full h-[1.1px] bg-softBlue mb-6"/>
            {currentChats && currentChats.length> 0 ? (
                <div className="shadow-[0px_0px_10px_1px_rgb(67,117,224)] rounded-t-sm rounded-b-sm">
                <div className="flex justify-center bg-softBlue p-2 rounded-t-sm">
                    <p className="font-bold text-center text-white">Realtime conversation</p>
                </div>
                <div className="bg-transparent dark:bg-[#0d0d0f] p-3 rounded-b-sm">
                    <Messages setMessages={setChatWithIdMessages} messages={chatWithIdMessages} chatId={chatWithId}/>
                </div>
            </div>
            ):null}
        </div>
    )
}