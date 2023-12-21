import Link from "next/link"

export const ProjectSettings = () =>{
    return (
        <div className="space-x-4">
            <Link href={"/project"} className="text-sm border-b border-softBlue hover:border-transparent hover:text-softBlue font-semibold">Manage your project</Link>
            <Link href={"/project/create"} className="text-sm border-b border-softBlue hover:border-transparent hover:text-softBlue font-semibold">New project</Link>
        </div>
    )
}