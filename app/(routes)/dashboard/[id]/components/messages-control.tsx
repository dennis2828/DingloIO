"use client"
import { useEffect, useState } from "react"
import { Messages } from "./messages"
import { useSocket } from "@/hooks/useSocket"
import { Instance } from "./instance"
import { NewMessage } from "@/types"
import { Message } from "@prisma/client"

interface MessageControlProps{
    connections: string[];
    conversationsMessages: Array<Message>;
}

export const MessagesControl = ({connections, conversationsMessages}:MessageControlProps) =>{
    const {socket} = useSocket(state=>state);
    
    const [currentChats, setCurrentChats] = useState<Array<string>>(connections);
    
    const [chatWithId, setChatWithId] = useState<string>("");
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
      
            // add new chatId related messages
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
        console.log(conversationsMessages);
        
        for(const cm of conversationsMessages){
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
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {currentChats.map((chatInstance, idx)=>(
                    <Instance key={idx} handleClick={()=>setChatWithId(chatInstance)} chatId={chatInstance}/>
                ))}
            </div>
           
            <Messages setMessages={setChatWithIdMessages} messages={chatWithIdMessages} chatId={chatWithId}/>
        </div>
    )
}