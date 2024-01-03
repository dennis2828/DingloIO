"use client"

import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"
import { useClickOutside } from "@mantine/hooks";
import { PredefinedAnswer } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Answer } from "./answer";

interface CreateAnswerProps{
    projectId: string;
    initialAnswers: PredefinedAnswer[];
}

export const CreateAnswer = ({projectId, initialAnswers}: CreateAnswerProps) =>{
    const createAnswerRef = useClickOutside(()=>{
        setIsOpen(false);
    });

    const [predefinedAnswers, setPredefinedAnswers] = useState<Array<PredefinedAnswer>>(initialAnswers);

    // new answer instance
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newInstance, setNewInstance] = useState<PredefinedAnswer>({id:"", projectId, question:"", answer:""});
    
    const {mutate: createPredefinedAnswer, isPending} = useMutation({
        mutationFn: async(instance: PredefinedAnswer)=>{
            const res = await axios.post(`/api/project/${projectId}/answers`,instance);
            return res.data;
        },
        onSuccess:()=>{
            setNewInstance({
                id:"",
                projectId,
                question:"",
                answer:"",
            });
        },
        onError:(err)=>{
            console.log("ERRROR",err);
            
            setPredefinedAnswers(initialAnswers);
            toast({toastType:'ERROR', title:"Error!"});
        },
        onMutate:(variable)=>{
            setPredefinedAnswers(prev=>[...prev, variable]);
        }
    });

    return (
        <div>
            <div className="flex items-center gap-2">
                <p className="font-bold text-[1.5em]">Set default answers</p>
                <Button size={"sm"} onClick={()=>setIsOpen(prev=>!prev)}>Add new field</Button>
            </div>
            {/* render all the predefined answers */}
            <div className="space-y-2">
                {predefinedAnswers.map(answ=>(
                    <Answer answer={answ} projectId={projectId} initialAnswers={initialAnswers} setPredefinedAnswers={setPredefinedAnswers}/>
                ))}
            </div>
          
            {isOpen ? (
                <form ref={createAnswerRef} className="flex" onSubmit={(e)=>{
                    e.preventDefault();
                    console.log("subbmitnigngs");
                    
                    if(newInstance && newInstance.answer.trim()!=="" && newInstance.question.trim()!==""){
                        //create new predefined answer
                        createPredefinedAnswer({...newInstance, id:uuidv4()});
                    }
                }}>
                    <Input value={newInstance.question} onChange={(e)=>setNewInstance(prev=>({
                        ...prev,
                        question: e.target.value,
                    }))} className="rounded-none rounded-l-md placeholder:text-center px-2" placeholder="Question"/>
                    <Input value={newInstance.answer} onChange={(e)=>setNewInstance(prev=>({
                        ...prev,
                        answer: e.target.value,
                    }))} className="rounded-none rounded-r-md placeholder:text-center px-2" placeholder="Answer to repond"/>
                    <FormSubmit>Crete</FormSubmit>
                </form>
            ):null}
        </div>
    )
}