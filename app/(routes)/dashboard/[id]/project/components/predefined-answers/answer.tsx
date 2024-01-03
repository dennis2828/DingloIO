"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PredefinedAnswer } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AnswerValues } from "./answer-values";

interface AnswerProps{
    answer: PredefinedAnswer;
    projectId: string;
    initialAnswers: PredefinedAnswer[];
    setPredefinedAnswers: Dispatch<SetStateAction<Array<PredefinedAnswer>>>;
}

export const Answer = ({ answer, projectId, initialAnswers, setPredefinedAnswers }:AnswerProps) => {
  
    const {mutate: deletePredefinedAnswer, isPending} = useMutation({
        mutationFn: async(id: string)=>{
            console.log('ANSWER',answer, "inmitiasvl", initialAnswers);
            
            const res = await axios.delete(`/api/project/${projectId}/answers/${id}`);
            return res.data;
        },
       
        onError:(err)=>{
            console.log("ERRROR",err);
            
            setPredefinedAnswers(initialAnswers);
            toast({toastType:'ERROR', title:"Error!"});
        },
        onMutate:(variable)=>{
            setPredefinedAnswers(prev=>prev.filter(answ=>answ.id!==variable));
        }
    });
  
    return (
    <div className="flex items-center">
        {answer.answer}
        <AnswerValues projectId={projectId} answer={answer} initialAnswers={initialAnswers} setPredefinedAnswers={setPredefinedAnswers}/>
        <Trash onClick={()=>deletePredefinedAnswer(answer.id)} role="button" className="text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 duration-150" />
    </div>
  );
};
