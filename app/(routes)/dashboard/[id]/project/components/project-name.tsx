"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react"
import { useClickOutside } from '@mantine/hooks';
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { revalidate } from "@/actions/revalidatePath";


export const ProjectName = ({project}:{project: {id: string, projectName: string}})=>{
    const editForm = useClickOutside(()=>{
        if(project.projectName!==projectName)
            editProject(projectName);
        else setIsEditing(false);
    });

    const [projectName, setProjectName] = useState<string>(project.projectName);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const {mutate: editProject, isPending} = useMutation({
        mutationFn: async(projectName: string)=>{
            const res = await axios.patch(`/api/project/${project.id}`,{projectName});

            return res.data;
        },
        onMutate:()=>{
            setIsEditing(false);
        },
        onSuccess:(data)=>{
            toast({toastType:"SUCCESS", title: data.msg});
        },
        onError:(error)=>{
            if(error instanceof AxiosError)
                toast({toastType:"ERROR", title:error.response?.data || "Something went wrong. Please try again later."});
            else toast({toastType:"ERROR",title:"Something went wrong. Please try again later."});
        },
        onSettled:()=>{
            revalidate(`/dashboard/${project.id}/project`);
        }
    })


    if(isEditing)
        return (
            <form ref={editForm} onSubmit={(e)=>{
                e.preventDefault();
                if(project.projectName!==projectName)
                    editProject(projectName);
                else setIsEditing(false);
            }}>
                <Input className="bg-transparent p-2" autoFocus value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
            </form>    
        )

    return (
        <div onClick={()=>setIsEditing(true)} className="flex w-full flex-col items-center cursor-pointer rounded-md p-2">
            <p className="text-[1.125em] xsM:text-[1.2em] font-medium">{projectName}</p>
            <small className="text-gray-500">click to edit</small>
        </div>
    )
}