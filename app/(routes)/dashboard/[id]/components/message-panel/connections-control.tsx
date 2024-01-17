"use client"
import toast from "react-hot-toast"
import { useSocket } from "@/hooks/useSocket"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface ConnectionsControlProps{
    connections: Array<{connectionId: string, online: boolean}>;
    projectId: string;
}

export const ConnectionsControl = ({connections, projectId}:ConnectionsControlProps) =>{
    const {socket} = useSocket(state=>state);

    
    const [currentConnections, setCurrentConnections] = useState<Array<{connectionId: string, online: boolean}>>(connections);
    useEffect(()=>{
        if(!socket) return;
        
        socket.on("DingloClient-NewConnection",(connectionId: string)=>{
            
            setCurrentConnections(prev=>{
                const findConn = prev.find(conn=>conn.connectionId===connectionId);
                if(!findConn)
                    return [{connectionId, online:true}, ...prev];
                else{
                    return prev.map(conn=>{
                        if(conn.connectionId===connectionId){
                            return {...conn, online: true};
                        }
                        return conn;
                    });
                }
            });
        });

        return ()=>{
            socket.off("DingloClient-NewConnection");
        }
    },[socket]);
    
    
    const {mutate: deleteConversation, isPending} = useMutation({
        mutationFn: async(conversationId: string)=>{
            const res = await axios.delete(`/api/project/${projectId}/conversation/${conversationId}`);

            return res.data;
        },
        onSuccess(data){
            toast.success("Conversation was successfully deleted !");
            window.location.reload();
        },
        onError(error){
            if(error instanceof AxiosError)
            toast.error(error.response?.data || "Something went wrong. Please try again later.")
            else toast.error("Something went wrong. Please try again later.");
        }
    })
    
    return (
        <div>
            <p className="font-bold text-[1.5em] mb-4">Manage connections</p>

            <div className="space-y-2">
                {currentConnections.map((cn, idx)=>(
                    <div key={idx} className={`flex items-center ${isPending ? "text-gray-400":null}`}>
                        <p>{cn.connectionId}</p>
                        <X type="submit" onClick={()=>deleteConversation(cn.connectionId)} className={`w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 duration-100 ${isPending ? "pointer-events-none":null}`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}