"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"

const ToasterProvider = () =>{
    const {theme} = useTheme();
    const [mounted,setMounted] = useState<boolean>(false);
        
    useEffect(()=>{
        setMounted(true);
    },[]);
    if(!mounted)
        return null;
    
    return (
        <Toaster position="bottom-right" toastOptions={{
            style:{
                background:theme==="dark" ? "#0b0b0d":"#4375e0",
                color:"white",
                boxShadow:"0px 0px 10px 2px rgba(126,154,234)"
              },
              iconTheme: {
                primary: '#000',
                secondary: '#3e77ff',
              },
        }}/>
    )
}

export default ToasterProvider;