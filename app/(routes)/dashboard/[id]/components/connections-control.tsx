"use client"
import { toast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { X } from "lucide-react"

interface ConnectionsControlProps{
    connections: Array<string>;
    projectId: string;
}

export const ConnectionsControl = ({connections, projectId}:ConnectionsControlProps) =>{

    const {mutate: deleteConversation, isPending} = useMutation({
        mutationFn: async(conversationId: string)=>{
            const res = await axios.delete(`/api/project/${projectId}/conversation/${conversationId}`);

            return res.data;
        },
        onSuccess(data){
            window.location.reload();
            toast({toastType:"SUCCESS", title:"Conversation was successfully deleted !"});
        },
        onError(error){
            if(error instanceof AxiosError)
                toast({toastType:"ERROR", title:error.response?.data || "Something went wrong. Please try again later."});
            else toast({toastType:"ERROR",title:"Something went wrong. Please try again later."});
        }
    })
    
    return (
        <div>
            <p className="font-bold text-[1.5em] mb-4">Manage connections</p>

            <div className="space-y-2">
                {connections.map((cn, idx)=>(
                    <div key={idx} className={`flex items-center ${isPending ? "text-gray-400":null}`}>
                        <p>{cn}</p>
                        <X type="submit" onClick={()=>deleteConversation(cn)} className={`w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 duration-100 ${isPending ? "pointer-events-none":null}`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}