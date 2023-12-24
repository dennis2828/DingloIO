"use client"
import { useEffect, useState } from "react"
import { Messages } from "./messages"
import { useSocket } from "@/hooks/useSocket"
import { Instance } from "./instance"
import { NewMessage } from "@/types"
import { prefix } from "@/constants/literals"

export const MessagesControl = () =>{
    const {socket} = useSocket(state=>state);
    
    const [currentChats, setCurrentChats] = useState<Array<string>>([]);
    
    const [chatWithId, setChatWithId] = useState<string>("re");
    const [chatWithIdMessages, setChatWithIdMessages] = useState<Array<NewMessage>>([]);
    

    // handle incoming messages
    useEffect(()=>{ 
        if(!socket) return;
        socket.off("DingloClient-DashboardMessage");

        socket.on("DingloClient-DashboardMessage",(message: NewMessage)=>{

                //check existing conversation
                const isConversation = localStorage.getItem(`${prefix}${message.connectionId}`);
                
                if(!isConversation || isConversation.trim()==="" || isConversation==="undefined"){
                    //create conversation
                    
                    localStorage.setItem(`${prefix}${message.connectionId}`,JSON.stringify([message]));
                }else{
                    
                    //update conversation
                    const conversation: Array<NewMessage> = JSON.parse(isConversation);
                    conversation.push(message);

                    localStorage.setItem(`${prefix}${message.connectionId}`, JSON.stringify(conversation));
                }

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

    // get select chatId messages
    useEffect(()=>{
        
        if(chatWithId && chatWithId.trim()!==""){
            const conversation = localStorage.getItem(`${prefix}${chatWithId}`)
            if(conversation && conversation!=="undefined"){
                setChatWithIdMessages(JSON.parse(conversation));
            }
        }
    },[chatWithId]);



    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                {currentChats.map((chatInstance, idx)=>(
                    <Instance key={idx} handleClick={()=>setChatWithId(chatInstance)} chatId={chatInstance}/>
                ))}
            </div>
           
            <Messages setMessages={setChatWithIdMessages} messages={chatWithIdMessages} chatId={chatWithId}/>
        </div>
    )
}