import db from "@/lib/db"
import { CreateAnswer } from "./create-answers"

export const AnswersContainer = async ({projectId}:{projectId: string}) =>{
    
    const predefinedAnswers = await db.predefinedAnswer.findMany({
        where:{
            projectId,
        },
    });

    return (
        <div className="flex items-center gap-2">
            <CreateAnswer projectId={projectId} initialAnswers={predefinedAnswers}/>
        </div>
    )
}