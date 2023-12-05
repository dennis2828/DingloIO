import { Input } from "@/components/ui/input";
import {ScrollTextIcon} from "lucide-react";

export const Newsletter = () =>{
    return  (
        <div className="flex items-center bg-white rounded-sm px-2 dark:bg-transparent dark:border-b dark:rounded-none dark:border-softBlue max-w-[500px] mx-auto">
            <Input placeholder="email address for newsletter" className="border-none bg-white dark:bg-transparent max-w-[500px]"/>
            <ScrollTextIcon className="w-4 h-4 cursor-pointer hover:text-softBlue duration-100"/>
        </div>
    )
}