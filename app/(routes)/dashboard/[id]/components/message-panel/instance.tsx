"use client";

import { revalidate } from "@/actions/revalidatePath";
import { Conversation } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

    const pathname = usePathname();
  return (
    <Link
    onClick={()=>{
      revalidate(`/dashboard/${convInstance.projectId}?conversation=${convInstance.connectionId}`)
      revalidate(`/dashboard/${convInstance.projectId}`);
      setSelectedConv(convInstance);
    }}
    href={`http://localhost:3000/${pathname}?conversation=${convInstance.connectionId}`}
      className={`font-bold text-lightBlue cursor-pointer hover:-translate-y-1 duration-100 flex items-center gap-1 ${
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
    </Link>
  );
};
