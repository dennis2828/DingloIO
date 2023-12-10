"use client"

import { FormInput } from "@/components/forms/form-input"
import { FormSubmit } from "@/components/forms/form-submit"
import { Separator } from "@/components/ui/separator"
import { User, LucideMails, Shield, ShieldCheck } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccountRequest, AccountValidator } from "@/validators/account"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import {signIn} from "next-auth/react";
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

export const CreateAccountForm = () =>{
    const router = useRouter();

    const {theme} = useTheme();

    const [showErrors, setShowErrors] = useState<boolean>(false);

    const {handleSubmit ,register, formState:{errors}, setValue} = useForm<AccountRequest>({
        resolver:zodResolver(AccountValidator),
    });

  

    const {mutate: createAccount, isPending} = useMutation({
        mutationFn:async (account: AccountRequest) =>{
            const res = await axios.post("/api/account",account);

            return res;
        },
        onSuccess:(res)=>{
            toast({toastType:"SUCCESS",title:res.data.msg});
            router.push("/account");
            
            setTimeout(()=>{
                resetForm();
            },2500);
        },
        onError:(error)=>{
            if(error instanceof AxiosError)
                toast({toastType:"ERROR", title:error.response?.data || "Something went wrong. Please try again later."});
            else toast({toastType:"ERROR",title:"Something went wrong. Please try again later."});
        }
    });
    //Form error handling
    useEffect(()=>{
        if(errors && Object.keys(errors).length>0){
            setShowErrors(true);
            setTimeout(()=>{
                setShowErrors(false)
            },3000);
        }
    },[errors]);

    function resetForm(){
        setValue("username","");
        setValue("email","");
        setValue("password","");
        setValue("confirmPassword","");
    }

    return (
        <div>
            <h1 className="font-bold text-[1.15em] xss:text-[1.19em] xs:text-[1.25em] xsMd:text-[1.4em] xsBig:text-[1.45em] sm:tet-[1.5em] md:text-[2em] lg:text-[2.5em]">Create an account</h1>
            <p>Authenticate and unleash the power of <span className="font-bold">Dinglo.<span className="text-softBlue">IO</span></span></p>
            <form className="mt-4" onSubmit={handleSubmit((data)=>{
                createAccount(data);
            })}>
                <div className="flex flex-col gap-2">
                    <FormInput register={register} registerName={"username"} id="username" errorMessage={showErrors ? errors.username?.message:undefined} icon={<User className="w-5 h-5 text-softBlue"/>} placeholder="username" className="border-none px-2"/>
                    <FormInput register={register} registerName={"email"} id="email" errorMessage={showErrors ? errors.email?.message:undefined} icon={<LucideMails className="w-5 h-5 text-softBlue"/>} placeholder="email" className="border-none px-2"/>
                    <FormInput register={register} registerName={"password"} id="password" errorMessage={showErrors ? errors.password?.message:undefined} icon={<Shield className="w-5 h-5 text-softBlue"/>} placeholder="password" className="border-none px-2"/>
                    <FormInput register={register} registerName={"confirmPassword"} id="confirmPassword" errorMessage={showErrors ? errors.confirmPassword?.message:undefined} icon={<ShieldCheck className="w-5 h-5 text-softBlue"/>} placeholder="confirm password" className="border-none px-2"/>
                </div>
                <div className="mt-3 flex items-center justify-center gap-3">
                    <FcGoogle onClick={()=>signIn("google",{callbackUrl:"/"})} className="text-[1.4em] cursor-pointer"/>
                    <span className="text-xs">or</span>
                    <Image role="button" onClick={()=>signIn("github",{callbackUrl:"/"})} src={theme==="light" ? "/github-mark.svg":"/github-mark-white.svg"} className="cursor-pointer" width={28} height={28} alt="github login"/>
                </div>
                <Separator className="h-[1px] bg-lightBlue mb-5 mt-1"/>
                <div className="flex flex-col gap-2 xsM:flex-row xsM:gap-0 items-center">
                    <FormSubmit isLoading={isPending} label="Create my account"/>
                    <Link href={"/account"} className="text-xs flex-1 text-center cursor-pointer hover:underline text-softBlue">I already have an account</Link>
                </div>
            </form>
        </div>
    )
}