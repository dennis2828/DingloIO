"use client";

import { toast } from "@/components/ui/use-toast";
import { PredefinedAnswer } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AnswerValues } from "./answer-values";

interface AnswerProps{
    answer: PredefinedAnswer;
    projectId: string;
}

export const Answer = ({ answer, projectId}:AnswerProps) => {
    const queryClient = useQueryClient();

    const {mutate: deletePredefinedAnswer, isPending} = useMutation({
        mutationFn: async(id: string)=>{
            
            const res = await axios.delete(`/api/project/${projectId}/answers/${id}`);
            return res.data;
        },
        onMutate:(variable)=>{
            queryClient.setQueryData(["predAnswers"], (old: PredefinedAnswer[]) =>{
                return old.filter(answ=>answ.id!==variable)
            });
        },
        onError:(err)=>{
            //{toastType:'ERROR', title:"Error!"});
        },
        onSettled:()=>{
            queryClient.invalidateQueries({ queryKey: ["predAnswers"] });
        }
    });
  
    return (
    <div className="flex items-center">
        <AnswerValues projectId={projectId} answer={answer}/>
        <Trash onClick={()=>deletePredefinedAnswer(answer.id)} role="button" className={`text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 duration-150 ${isPending ? "text-red-800":null}`} />
    </div>
  );
};
