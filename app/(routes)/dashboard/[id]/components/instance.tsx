"use client"

interface InstanceProps {
    selectedChat: string;
    chatId: string;
    handleClick: () => void;
}

export const Instance = ({chatId, handleClick, selectedChat}: InstanceProps) =>{
    return (
        <div role="button" onClick={handleClick} className={`font-bold text-lightBlue cursor-pointer hover:-translate-y-1 duration-100 ${chatId===selectedChat ? "text-softBlue":null}`}>{chatId}</div>
    )
}