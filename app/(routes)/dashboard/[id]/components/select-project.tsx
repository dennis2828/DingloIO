"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SelectProjectsProps {
  projects: Project[];
}

export const SelectProject = ({ projects }: SelectProjectsProps) => {
    const router = useRouter();

    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

    useEffect(()=>{
        console.log(selectedProject);
        
        router.push(`/dashboard/${selectedProject.id}`);
    },[selectedProject, router]);

  return (
    <Select onValueChange={(projectId)=>{
      const findProject = projects.find(project=>project.id===projectId);
      setSelectedProject(findProject!);
    }}>
      <SelectTrigger className="bg-tranparent border-softBlue">
        <SelectValue className="bg-softBlue" placeholder={selectedProject.projectName} />
      </SelectTrigger>
      <SelectContent onSelect={()=>console.log("clocked, sc")} defaultValue={"DingoDEV"} className="bg-transparent">
        {projects && projects.length > 0 ? (
          <SelectGroup onSelect={()=>console.log("clicked sg")} className="cursor-pointer">
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.projectName}
              </SelectItem>
            ))}
          </SelectGroup>
        ) : (
          <SelectLabel>No current projects</SelectLabel>
        )}
      </SelectContent>
    </Select>
  );
};
