import { Message } from "@prisma/client"

export const AllMessages = ({messages}:{messages: Array<Message>})=>{
    
    return (
        <div>
            <p className="font-bold text-[1.5em] mb-4">Total Messages: {messages.length}</p>
        </div>
    )
}