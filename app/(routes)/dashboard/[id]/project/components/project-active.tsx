"use client"

import { Button } from "@/components/ui/button"
import { Power } from "lucide-react"

export const ProjectActive = () =>{
    return (
        <Button variant={"destructive"}>Turn off project <Power className="ml-2 w-4 h-4 text-white"/></Button>
    )
}