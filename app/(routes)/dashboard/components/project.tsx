import { Project as ProjectDB } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps{
    project: ProjectDB;
}

export const Project = ({project}:ProjectProps) =>{
    return (
        <Link href={`/dashboard/${project.id}`} role="div" className="cursor-pointer bg-white dark:bg-softBlue dark:bg-transparent border-4 border-transparent hover:border-softBlue dark:border-softBlue duration-150 rounded-md p-2">
            <Image src={"/profile.jpg"} width={100} height={100} className="w-[100px] h-[100px] mx-auto rounded-full object-cover" priority quality={100} alt="project-image"/>
            <div>
                <p className="font-bold text-sm text-center">{project.projectName}</p>
            </div>
        </Link>
    )
}