"use client"
import { useEffect, useState } from "react"
import { Messages } from "./messages"
import { useSocket } from "@/hooks/useSocket"
import { Instance } from "./instance"
import { NewMessage } from "@/types"
import { Message } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { revalidate } from "@/actions/revalidatePath"

interface MessageControlProps{
    projectId: string
    connections: Array<{connectionId: string, online: boolean}>;
    conversationsMessages: Array<Message>;
}

export const MessagesControl = ({projectId, connections, conversationsMessages}:MessageControlProps) =>{
    const {socket} = useSocket(state=>state);

    const [currentChats, setCurrentChats] = useState<Array<{connectionId: string, online: boolean}>>(connections);
    
    const [curentConversationsMessages, setCurrentConversationsMessages] = useState(conversationsMessages);

    const [chatWithId, setChatWithId] = useState<{connectionId: string, online: boolean}>(connections[0] || "");
    const [chatWithIdMessages, setChatWithIdMessages] = useState<Array<NewMessage>>([]);
    

    useEffect(()=>{ 
        if(!socket) return;


        socket.on("DingloClient-NewConnection",(connectionId: string)=>{
            setChatWithId(prev=>{
                if(!prev || prev.connectionId.trim()==="")
                    return {connectionId, online:true};
                return prev;
            });
            setCurrentChats(prev=>{
                const findChat = prev.find(chat=>chat.connectionId===connectionId);
                if(!findChat)
                    return [{connectionId, online:true}, ...prev];
                else{
                    return prev.map(chat=>{
                        if(chat.connectionId===connectionId){
                            return {...chat, online: true};
                        }
                        return chat;
                    });
                }
            });
            revalidate(`/dashboard/${projectId}`);
        });

        socket.on("DingloClient-Disconnect",(connectionId: string)=>{
            
            setCurrentChats(prev=>{
                return prev.map(chat=>{
                    if(chat.connectionId===connectionId){
                        return {
                            ...chat,
                            online: false,
                        }
                    }
                    return chat;
                });
            });
        });

        socket.on("DingloClient-DashboardMessage",(message: NewMessage)=>{
            // select the chat if not selected
            setChatWithId(prev=>{
                if(!prev || prev.connectionId==="")
                    return {connectionId:message.connectionId, online:true};
                return prev;
            });
      
            // add new chatId related messages
            setCurrentConversationsMessages(prev=>[...prev, {id:message.id, isAgent: message.isAgent, conversationId: message.connectionId, message:message.message, messagedAt:message.messagedAt}]);

            // update the current conversation if needed
            if(message.connectionId===chatWithId.connectionId){
                setChatWithIdMessages(prev=>[...prev, message]);
            }
            revalidate(`/dashboard/${projectId}/project`);

        });

        return ()=>{
            socket.off("DingloClient-DashboardMessage");
            socket.off("DingloClient-NewConnection");
        }

    },[socket, chatWithId]);

    useEffect(()=>{
        
        if(!chatWithId || chatWithId.connectionId.trim()==="") return;
        //filter conversations messages
        const filteredMessages: Array<NewMessage> = [];
        
        for(const cm of curentConversationsMessages){
            if(cm.conversationId===chatWithId.connectionId){
            
                filteredMessages.push({
                    id: cm.id,
                    connectionId: cm.conversationId,
                    isAgent: cm.isAgent,
                    message: cm.message,
                    messagedAt: cm.messagedAt,
                });
            }
        }
      
        
        setChatWithIdMessages(filteredMessages);
    },[chatWithId]); 
    
    useEffect(()=>{
        console.log("cim", chatWithIdMessages);
        
    },[chatWithIdMessages]);


    return (
        <div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
                {currentChats.map((chatInstance, idx)=>(
                    <Instance key={idx} handleClick={()=>setChatWithId(chatInstance)} selectedChat={chatWithId} chatInstance={chatInstance}/>
                ))}
            </div>
            <Separator className="w-full h-[1.1px] bg-softBlue mb-6"/>
            {currentChats && currentChats.length> 0 ? (
                <div className="shadow-[0px_0px_10px_1px_rgb(67,117,224)] rounded-t-sm rounded-b-sm">
                <div className="flex justify-center bg-softBlue p-2 rounded-t-sm">
                    <p className="font-bold text-center text-white">Realtime conversation</p>
                </div>
                <div className="bg-transparent dark:bg-[#0d0d0f] p-3 rounded-b-sm">
                    <Messages projectId={projectId} setMessages={setChatWithIdMessages} messages={chatWithIdMessages} chatId={chatWithId.connectionId}/>
                </div>
            </div>
            ):null}
        </div>
    )
}