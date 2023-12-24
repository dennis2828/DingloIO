import { MessagesControl } from "./messages-control"

export const MessagesContainer = () =>{
    return (
        <div>
            <p className="font-bold text-[1.5em] mb-4">Active connections (3)</p>
            <MessagesControl/>
        </div>
    )
}