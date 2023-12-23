import db from "@/lib/db";
import { Project } from "./project";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/authOptions";

interface ProjectFeedProps {
    userId: string;
}

export const ProjectFeed = async ({ userId }: ProjectFeedProps) => {
    const session = await getAuthSession();
    
    const projects = await db.project.findMany({
        where:{
            userId: userId,
        },
    });

    if(!projects || projects.length===0)
        redirect("/project/create");

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {projects.map((project, id) => (
        <Project
          key={id}
          project={project}
        />
      ))}
    </div>
  );
};
