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
import { useCallback, useEffect, useState } from "react";

interface SelectProjectsProps {
  projects: Project[];
}

export const SelectProject = ({ projects }: SelectProjectsProps) => {
    const router = useRouter();


    const [selectedProject, setSelectedProject] = useState<Project>();

    const selectedProjectId = useCallback(()=>{
      return localStorage.getItem("selectedProject");
    },[selectedProject]); 

    useEffect(()=>{
      const targetProject = projects.find(project=>project.id===selectedProjectId());

      if(targetProject)
        setSelectedProject(targetProject);
      else{
        setSelectedProject(projects[0])
        router.push(`/dashboard/${projects[0].id}`);
      }
    },[]);


  return (
    <Select onValueChange={(projectId)=>{
      const findProject = projects.find(project=>project.id===projectId);
      localStorage.setItem("selectedProject", findProject!.id);
      router.push(`/dashboard/${findProject!.id}`);

      }}>
      <SelectTrigger className="bg-tranparent border-softBlue">
        <SelectValue className="bg-softBlue" placeholder={selectedProject?.projectName} />
      </SelectTrigger>
      <SelectContent defaultValue={"DingoDEV"} className="bg-transparent">
        {projects && projects.length > 0 ? (
          <SelectGroup className="cursor-pointer">
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
