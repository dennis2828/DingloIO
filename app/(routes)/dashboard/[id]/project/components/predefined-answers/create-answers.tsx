"use client"

import { Button } from "@/components/ui/button"
import { PredefinedAnswer } from "@/types";
import { useState } from "react"

export const CreateAnswer = () =>{
    const [predefinedAnswers, setPredefinedAnswers] = useState<Array<PredefinedAnswer>>([]);
    const [newInstance, setNewInstance] = useState<PredefinedAnswer>();

    
    return (
        <div>
            <Button size={"sm"}>Add new field</Button>
            {/* render all the predefined answers */}

        </div>
    )
}