"use client"

import { FormInput } from "@/components/forms/form-input"
import { FormSubmit } from "@/components/forms/form-submit"
import { Separator } from "@/components/ui/separator"
import { LucideMails, Shield } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {SignInAccountValidator, SignInAccountRequest } from "@/validators/account"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import {signIn} from "next-auth/react";
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"


export const SignInForm = ({errorMessage}:{errorMessage: string}) =>{
    const router = useRouter();
    const {theme} = useTheme();

    const [authErrorMessage,setAuthErrorMessage] = useState<string>();
    const [showErrors, setShowErrors] = useState<boolean>(false);

    const {handleSubmit ,register, formState:{errors}, setValue} = useForm<SignInAccountRequest>({
        resolver:zodResolver(SignInAccountValidator),
    });

  

    const {mutate: SignIn, isPending} = useMutation({
        mutationFn: async (account: SignInAccountRequest) =>{
            signIn("credentials",{...account, callbackUrl:"/"});
        },
        
        onError:(error)=>{
            toast({toastType:"ERROR",title:"Something went wrong. Please try again later."});
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

    //Next-Auth error handling
    useEffect(()=>{
        if(errorMessage && errorMessage.trim()!==''){
            router.push("/account");
            setAuthErrorMessage(errorMessage);
        }
      },[errorMessage]);
      
    useEffect(()=>{
        
        if(authErrorMessage && authErrorMessage.trim()!==''){
            toast({toastType:"ERROR", title:authErrorMessage || "Something went wrong. Please try again later."});
        }
    },[authErrorMessage]);

    function resetForm(){
        setValue("email","");
        setValue("password","");
    }

    return (
        <div>
            <h1 className="font-bold text-[1.15em] xss:text-[1.19em] xs:text-[1.25em] xsMd:text-[1.4em] xsBig:text-[1.45em] sm:tet-[1.5em] md:text-[2em] lg:text-[2.5em]">Sign in</h1>
            <p>Authenticate and unleash the power of <span className="font-bold">Dinglo.<span className="text-softBlue">IO</span></span></p>
            <form className="mt-4" onSubmit={handleSubmit((data)=>{
                SignIn(data);
            })}>
                <div className="flex flex-col gap-2">
                    <FormInput register={register} registerName={"email"} id="email" errorMessage={showErrors ? errors.email?.message:undefined} icon={<LucideMails className="w-5 h-5 text-softBlue"/>} placeholder="email" className="border-none px-2"/>
                    <FormInput register={register} registerName={"password"} id="password" errorMessage={showErrors ? errors.password?.message:undefined} icon={<Shield className="w-5 h-5 text-softBlue"/>} placeholder="password" className="border-none px-2"/>
                </div>
                <div className="mt-3 flex items-center justify-center gap-3">
                    <FcGoogle onClick={()=>signIn("google",{callbackUrl:"/"})} className="text-[1.4em] cursor-pointer"/>
                    <span className="text-xs">or</span>
                    <Image role="button" onClick={()=>signIn("github",{callbackUrl:"/"})} src={theme==="light" ? "/github-mark.svg":"/github-mark-white.svg"} className="cursor-pointer" width={28} height={28} alt="github login"/>
                </div>
                <Separator className="h-[1px] bg-lightBlue mb-5 mt-1"/>
                <div className="flex flex-col gap-2 xsM:flex-row xsM:gap-0 items-center">
                    <FormSubmit isLoading={isPending} label="Sign in"/>
                    <Link href={"/account/new"} className="text-xs flex-1 text-center cursor-pointer hover:underline text-softBlue">I do not have an account</Link>
                </div>
            </form>
        </div>
    )
}