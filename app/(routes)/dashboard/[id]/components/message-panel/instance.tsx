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
  const router = useRouter();
    const pathname = usePathname();
  return (
    <a
    onClick={()=>{
      setSelectedConv(convInstance);
    }}
    href={`https://dinglo-io.vercel.app/${pathname}?conversation=${convInstance.connectionId}`}
      className={`font-bold whitespace-nowrap text-lightBlue cursor-pointer hover:-translate-y-1 duration-100 flex items-center gap-1 ${
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
