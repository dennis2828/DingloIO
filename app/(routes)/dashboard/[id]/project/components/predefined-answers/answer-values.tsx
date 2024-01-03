"use client";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PredefinedAnswer } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface AnswerValuesProps {
  answer: PredefinedAnswer;
  projectId: string;
  initialAnswers: PredefinedAnswer[];
  setPredefinedAnswers: Dispatch<SetStateAction<Array<PredefinedAnswer>>>;
}

export const AnswerValues = ({ answer, projectId, initialAnswers, setPredefinedAnswers }: AnswerValuesProps) => {
    const [answerData, setAnswerData] = useState<PredefinedAnswer>(answer);

    const {mutate: editPredefinedAnswer, isPending} = useMutation({
        mutationFn: async(id: string)=>{
            const res = await axios.patch(`/api/project/${projectId}/answers/${id}`,{question: answerData.question, answer: answerData.answer});
            return res.data;
        },
        onError:(err)=>{
            
            setPredefinedAnswers(initialAnswers);
            toast({toastType:'ERROR', title:"Error!"});
        },
        onMutate:(variable)=>{
            setPredefinedAnswers(prev=>{
                return prev.map(answ=>{
                    return {
                        ...answ,
                        question: answ.id===variable ? answerData.question: answ.question,
                        answer: answ.id===variable ? answerData.answer: answ.answer,
                    }
                });
            });
        }
    });

    return (
    <div  className="flex items-center">
      <Input
        value={answerData.question}
        onChange={(e)=>setAnswerData(prev=>{
            return {
                ...prev,
                question:e.target.value,
            }
        })}
        className="rounded-none bg-[#f3f4f6] text-[#747881] rounded-l-md placeholder:text-center px-2"
        placeholder="Question"
      />
      <Input
        value={answerData.answer}
        onChange={(e)=>setAnswerData(prev=>{
            return {
                ...prev,
                answer:e.target.value,
            }
        })}
        className="rounded-none bg-[#f3f4f6] text-[#747881] rounded-r-md placeholder:text-center px-2"
        placeholder="Answer to repond"
      />
        <Check onClick={()=>editPredefinedAnswer(answer.id)} role="button" className="text-green-500 w-5 h-5 cursor-pointer hover:text-green-600 duration-150" />
    </div>
  );
};
