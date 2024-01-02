import { CreateAnswer } from "./create-answers"

export const AnswersContainer = async () =>{
    return (
        <div className="flex items-center gap-2">
            <p className="font-bold text-[1.5em]">Set default answers</p>
            <CreateAnswer/>
        </div>
    )
}