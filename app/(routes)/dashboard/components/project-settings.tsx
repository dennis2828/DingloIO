import { StyledLink } from "@/components/ui/link"

export const ProjectSettings = () =>{
    return (
        <div className="space-x-4">
            <StyledLink href="/project">
                Manage your project
            </StyledLink>
            <StyledLink href="/project/create">
                New project
            </StyledLink>
        </div>
    )
}