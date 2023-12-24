"use client"

interface InstanceProps {
    chatId: string;
    handleClick: () => void;
}

export const Instance = ({chatId, handleClick}: InstanceProps) =>{
    return (
        <div role="button" onClick={handleClick} className="font-bold text-lightBlue cursor-pointer hover:-translate-y-1 duration-100">{chatId}</div>
    )
}