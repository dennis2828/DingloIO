"use client";

import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import { PredefinedAnswer } from "@prisma/client";
import { Answer } from "./answer";

interface CreateAnswerProps {
  projectId: string;
  initialAnswers: PredefinedAnswer[];
}

export const CreateAnswer = ({
  projectId,
  initialAnswers,
}: CreateAnswerProps) => {
  const createAnswerRef = useClickOutside(() => {
    setIsOpen(false);
  });

  // new answer instance
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newInstance, setNewInstance] = useState<Omit<PredefinedAnswer, "id">>({
    projectId,
    question: "",
    answer: "",
  });

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["predAnswers"],
    queryFn: async () => {
      const res = await axios.get(`/api/project/${projectId}/answers`);
      console.log("res",res);
      
      return res.data as PredefinedAnswer[];
    },
    initialData: initialAnswers || [],
  });

  const { mutate: createPredefinedAnswer, isPending } = useMutation({
    mutationFn: async (instance: Omit<PredefinedAnswer, "id">) => {
      const res = await axios.post(
        `/api/project/${projectId}/answers`,
        instance
      );
      return res.data;
    },
    onMutate: (variable) => {
      queryClient.setQueryData(["predAnswers"], (old: PredefinedAnswer[]) => {
        return [
          ...old,
          {
            question: variable.question,
            answer: variable.answer,
            projectId: variable.projectId,
          },
        ];

      });
    },
    onError: (err) => {
      console.log("ERROR",err);
      
      toast({
        toastType: "ERROR",
        title: "Something went wrong. Please try again later!",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["predAnswers"] });
      setNewInstance((prev) => ({
        ...prev,
        answer: "",
        question: "",
      }));
      setIsOpen(false);
    },
  });

  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="font-bold text-[1.5em]">Set default answers</p>
        <Button size={"sm"} onClick={() => setIsOpen((prev) => !prev)}>
          Add new field
        </Button>
      </div>
      {/* render all the predefined answers */}
      <div className="space-y-2 mt-6 max-h-[350px] overflow-y-scroll overflowContainer">
        {data.map((answ, i) => (
          <Answer key={i} answer={answ} projectId={projectId} />
        ))}
      </div>

      {isOpen ? (
        <form
          ref={createAnswerRef}
          className="flex mt-5"
          onSubmit={(e) => {
            e.preventDefault();

            if (
              newInstance &&
              newInstance.answer.trim() !== "" &&
              newInstance.question.trim() !== ""
            ) {
              //create new predefined answer
              createPredefinedAnswer({ ...newInstance });
            }
          }}
        >
          <Input
            value={newInstance.question}
            onChange={(e) =>
              setNewInstance((prev) => ({
                ...prev,
                question: e.target.value,
              }))
            }
            className="rounded-none rounded-l-md placeholder:text-center px-2"
            placeholder="Question"
          />
          <Input
            value={newInstance.answer}
            onChange={(e) =>
              setNewInstance((prev) => ({
                ...prev,
                answer: e.target.value,
              }))
            }
            className="rounded-none rounded-r-md placeholder:text-center px-2"
            placeholder="Answer to repond"
          />
          <FormSubmit className="ml-1">Add</FormSubmit>
        </form>
      ) : null}
    </div>
  );
};
