"use client"

interface InstanceProps {
    selectedChat: {connectionId: string, online: boolean};
    chatInstance: {connectionId: string, online: boolean}
    handleClick: () => void;
}

export const Instance = ({chatInstance, handleClick, selectedChat}: InstanceProps) =>{
    return (
        <div role="button" onClick={handleClick} className={`font-bold text-lightBlue cursor-pointer hover:-translate-y-1 duration-100 flex items-center gap-1 ${chatInstance.connectionId===selectedChat.connectionId ? "text-softBlue":null}`}>
        <div className={`w-[10px] h-[10px] rounded-full ${chatInstance.online ? "bg-green-600":"bg-red-600"}`}/>
        {chatInstance.connectionId}
        </div>
    )
}