"use client"

import { Button } from "@/components/ui/button"
import { HTMLAttributes } from "react";

interface FormSubmitProps extends HTMLAttributes<HTMLButtonElement>{
    label?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

export const FormSubmit = ({label,disabled,isLoading, ...props}:FormSubmitProps) =>{
    return (
        <Button disabled={disabled} isLoading={isLoading} type="submit" {...props}>{label ? label:"Submit"}</Button>
    )
}