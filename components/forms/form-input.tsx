"use client"

import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends HTMLAttributes<HTMLInputElement>{
    icon?: React.ReactNode;
    errorMessage?: string;
    register:any;
    registerName: string;
};

export const FormInput = ({errorMessage, register, registerName, className, placeholder, id, icon, ...props}:FormInputProps) =>{
    const isPrivateInput = id==="password" || id==="confirmPassword";
    const [hiddenChars, setHiddenChars] = useState<boolean>(isPrivateInput);
    return (
        <div>
            <div className="flex items-center gap-1 px-2  bg-white rounded-md">
                {icon}
                <Input {...register(registerName)} id={id} type={hiddenChars ? "password":"text"} className={cn("placeholder:text-xs bg-white text-black",className)} placeholder={placeholder} {...props}/>
                {isPrivateInput ? 
                    hiddenChars ? <EyeOff onClick={()=>setHiddenChars(false)} className="w-5 h-5 text-softBlue cursor-pointer"/>:<Eye onClick={()=>setHiddenChars(true)} className="w-5 h-5 text-softBlue cursor-pointer"/>
                    :
                    null
                }
            </div>
            {errorMessage && errorMessage.trim()!=='' ? <p className="text-red-500 text-xs mt-1">{errorMessage}</p>:null}
        </div>
    )
}