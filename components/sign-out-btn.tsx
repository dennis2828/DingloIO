"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { DoorOpen } from "lucide-react"

export const SignOutButton = () =>{
    return (
        <Button variant={"empty"} onClick={()=>signOut()} className="text-softBlue hover:text-lightBlue duration-150">
            <DoorOpen className="w-5 h-5"/>
        </Button>
    )
}