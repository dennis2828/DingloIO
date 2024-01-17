"use client"

import { subscribeNewsletter, unsubscribeNewsletter } from "@/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { NewsletterValidator } from "@/validators/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import {ScrollTextIcon} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Newsletter = ({newsletter}:{newsletter: string}) =>{
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {handleSubmit, register, formState:{errors}} = useForm({
        resolver: zodResolver(NewsletterValidator),
    });

    return  (
        <>
          <form onSubmit={handleSubmit(async (data)=>{
                setIsLoading(true);
                const {subscribed, msg} = await subscribeNewsletter(data.email);
                setIsLoading(false);
                if(subscribed)
                toast.success(msg);
                    else 
                toast.error(msg);

            })} className="flex items-center bg-white rounded-sm px-2 dark:bg-transparent dark:border-b dark:rounded-none dark:border-softBlue max-w-[500px] mx-auto">
                <Input {...register("email")} placeholder={errors && errors.email && errors.email.message ? errors.email.message as string:"email address for newsletter"} className="border-none bg-white dark:bg-transparent max-w-[500px]"/>
                <Button variant={"empty"} disabled={isLoading}>
                    <ScrollTextIcon className="w-4 h-4 cursor-pointer hover:text-softBlue duration-100"/>
                </Button>
            </form>
            {newsletter && newsletter.trim()!=="" ? <div className="flex justify-center">
            <Button disabled={isLoading} variant={"empty"} size={"sm"} onClick={async()=>{
                setIsLoading(true);
                const {unsubscribed, msg} = await unsubscribeNewsletter();
                setIsLoading(false)
                if(unsubscribed)
                    toast.success(msg);
                else
                    toast.error(msg);

            }} className="text-xs underline cursor-pointer text-gray-100 hover:text-softBlue">unsubscribe from newsletter</Button>
            </div> :null}
        </>
    )
}