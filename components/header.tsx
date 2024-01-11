import { Logo } from "@/components/logo"
import { SignOut } from "@/components/sign-out"
import { ThemeToggler } from "@/components/theme-toggler"
import { getAuthSession } from "@/lib/authOptions"

export const Header = async () =>{

    const session = await getAuthSession();



    return (
        <div className="py-3 flex items-center justify-between">
            <Logo/>
            <div className="flex items-center">
                <SignOut profileName={"your_username"} profileImage={"/default-user-profile.png"}/>
                <ThemeToggler/>
            </div>
        </div>
    )
}