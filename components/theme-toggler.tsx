"use client"
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import {Sun, MoonStar} from "lucide-react";
import { cn } from '@/lib/utils';

export const ThemeToggler = () =>{
    const {theme, setTheme } = useTheme();

    return (
        <Button aria-labelledby={"theme-icon"} aria-pressed={true} size={"sm"} variant={"empty"} className={cn(theme==="dark" && "text-yellow-400 bg-transparent")} onClick={()=>{

            if(theme==="light")
                setTheme("dark");
            else setTheme("light");  
        }}>
            {theme==="light" ? <MoonStar id='theme-icon' className='w-5 h-5 text-softBlue'/>:<Sun id='theme-icon' className='w-5 h-5'/>}
        </Button>
    )
}