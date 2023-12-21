"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const SelectProject = () =>{
    return (
        <Select>
            <SelectTrigger className="bg-tranparent border-softBlue">
                <SelectValue className="bg-softBlue" placeholder="Select project"/>
            </SelectTrigger>
            <SelectContent className="bg-transparent">
                <SelectGroup className="cursor-pointer">
                    <SelectItem value="TrelloDev" className="">TrelloDev</SelectItem>
                    <SelectItem value="DingloIO">DingloIO</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}