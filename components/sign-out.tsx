import { getAuthSession } from "@/lib/authOptions"
import { Profile } from "./profile"
import { SignOutButton } from "./sign-out-btn"

export const SignOut = async () =>{
    

    return (
        <div className="flex items-center gap-1">
            {/* <Profile image={session.user?.image} name={session.user.name}/> */}
            <SignOutButton/>
        </div>
    )
}