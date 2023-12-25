import { StyledLink } from "@/components/ui/link"

export const ProjectSettings = ({projectId}:{projectId: string}) =>{
    return (
        <div className="space-x-4">
            <StyledLink href={`/dashboard/${projectId}/project`}>
                Manage your project
            </StyledLink>
            <StyledLink href="/create">
                New project
            </StyledLink>
        </div>
    )
}