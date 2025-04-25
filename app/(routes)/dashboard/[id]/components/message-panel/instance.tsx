"use client";

import { Conversation } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation"; // ✅

interface InstanceProps {
  selectedConv: Conversation | undefined;
  convInstance: Conversation;
  projectId: string;
  setSelectedConv: Dispatch<SetStateAction<Conversation | undefined>>;
}

export const Instance = ({
  convInstance,
  selectedConv,
  projectId,
  setSelectedConv
}: InstanceProps) => {
  const router = useRouter(); // ✅

  const handleClick = () => {
    setSelectedConv(convInstance);
    router.push(`/dashboard/${projectId}?conversation=${convInstance.connectionId}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`font-bold whitespace-nowrap text-lightBlue cursor-pointer hover:-translate-y-1 duration-100 mx-auto sm:mx-0 flex items-center gap-1 ${
        convInstance.connectionId === selectedConv?.connectionId
          ? "text-softBlue"
          : ""
      }`}
    >
      <div
        className={`w-[10px] h-[10px] rounded-full ${
          convInstance.online ? "bg-green-600" : "bg-red-600"
        }`}
      />
      {convInstance.connectionId}
    </div>
  );
};
