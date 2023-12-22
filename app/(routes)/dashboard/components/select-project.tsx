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
import { useEffect, useState } from "react";

interface SelectProjectsProps {
  projects: Project[];
}

export const SelectProject = ({ projects }: SelectProjectsProps) => {
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

    useEffect(()=>{
        console.log(selectedProject);
        
    },[selectedProject]);

  return (
    <Select>
      <SelectTrigger className="bg-tranparent border-softBlue">
        <SelectValue className="bg-softBlue" placeholder="Select project" />
      </SelectTrigger>
      <SelectContent defaultValue={"DingoDEV"} className="bg-transparent">
        {projects && projects.length > 0 ? (
          <SelectGroup className="cursor-pointer">
            {projects.map((project) => (
              <SelectItem onClick={()=>setSelectedProject(project)} key={project.id} value={project.projectName}>
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
