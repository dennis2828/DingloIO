"use client"
import { useMenu } from "@/hooks/useMenu";

export const HamburgerMenu = () =>{
    const {isActive, setIsActive} = useMenu(state=>state);
    return (
        <div className="md:hidden">
            <div className="cursor-pointer" role="button" onClick={()=>setIsActive(!isActive)}>
                <div className={`w-[20px] line line1 h-[2px] bg-softBlue ${isActive ? "active":null}`}/>
                <div className={`w-[20px] line line2 h-[2px] bg-softBlue mt-1.5 ${isActive ? "active":null}`}/>
            </div>
        </div>
    )
}