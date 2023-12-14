"use client"

import { subscribeNewsletter, unsubscribeNewsletter } from "@/actions/newsletter";
import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { NewsletterValidator } from "@/validators/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import {ScrollTextIcon} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Newsletter = ({newsletter}:{newsletter: string}) =>{
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {handleSubmit, register, formState:{errors}} = useForm({
        resolver: zodResolver(NewsletterValidator),
    });

    useEffect(()=>{
        console.log(errors.email);
        
    },[errors]);



    return  (
        <>
          <form onSubmit={handleSubmit(async (data)=>{
                setIsLoading(true);
                const {subscribed, msg} = await subscribeNewsletter(data.email);
                setIsLoading(false);

                toast({toastType:subscribed ? "SUCCESS":"ERROR", title: msg});
            })} className="flex items-center bg-white rounded-sm px-2 dark:bg-transparent dark:border-b dark:rounded-none dark:border-softBlue max-w-[500px] mx-auto">
                <Input {...register("email")} placeholder={errors && errors.email && errors.email.message ? errors.email.message as string:"email address for newsletter"} className="border-none bg-white dark:bg-transparent max-w-[500px]"/>
                <FormSubmit disabled={isLoading}>
                    <ScrollTextIcon className="w-4 h-4 cursor-pointer hover:text-softBlue duration-100"/>
                </FormSubmit>
            </form>
            {newsletter && newsletter.trim()!=="" ? <div className="flex justify-center">
            <Button disabled={isLoading} variant={"empty"} size={"sm"} onClick={async()=>{
                setIsLoading(true);
                const {unsubscribed, msg} = await unsubscribeNewsletter();
                setIsLoading(false)
                toast({toastType:unsubscribed ? "SUCCESS":"ERROR", title: msg});
            }} className="text-xs underline cursor-pointer text-gray-100 hover:text-softBlue">unsubscribe from newsletter</Button>
            </div> :null}
        </>
    )
}