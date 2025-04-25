"use client";

import { Conversation } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface InstanceProps {
  selectedConv: Conversation | undefined;
  convInstance: Conversation;
  setSelectedConv: Dispatch<SetStateAction<Conversation | undefined>>;
}

export const Instance = ({
  convInstance,
  selectedConv,
  setSelectedConv
}: InstanceProps) => {
  return (
    <a
    onClick={()=>{
      setSelectedConv(convInstance);
    }}
    href={`localhost:3000/dashboard?conversation=${convInstance.connectionId}`}
      className={`font-bold whitespace-nowrap text-lightBlue cursor-pointer hover:-translate-y-1 duration-100 mx-auto sm:mx-0 flex items-center gap-1 ${
        convInstance.connectionId === selectedConv?.connectionId
          ? "text-softBlue"
          : null
      }`}
    >
      <div
        className={`w-[10px] h-[10px] rounded-full ${
          convInstance.online ? "bg-green-600" : "bg-red-600"
        }`}
      />
      {convInstance.connectionId}
    </a>
  );
};
