import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react"

interface DataInfoProps extends HTMLAttributes<HTMLDivElement>{
    amount: number;
    label: string;
}

export const DataInfo = ({amount, label, className}:DataInfoProps) =>{
    return (
        <div className={cn("p-2 rounded-md text-white hover:text-black dark:hover:text-white bg-softBlue dark:bg-transparent border border-softBlue hover:bg-transparent dark:hover:bg-softBlue duration-150 cursor-pointer w-full max-w-[350px] mx-auto",className)}>
            <p className="text-[2em] font-bold text-center">{amount}</p>
            <p className="text-[1.2em] font-bold text-center">{label}</p>
        </div>
    )
}