import { Logo } from "@/components/logo"
import { SignOut } from "@/components/sign-out"
import { ThemeToggler } from "@/components/theme-toggler"

export const Header = () =>{
    return (
        <div className="py-3 flex items-center justify-between">
            <Logo/>
            <div className="flex items-center">
                <SignOut profileName="dns" profileImage="/workflow.png"/>
                <ThemeToggler/>
            </div>
        </div>
    )
}