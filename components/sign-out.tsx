import { Profile } from "./profile"
import { SignOutButton } from "./sign-out-btn"

export const SignOut = () =>{
    return (
        <div className="flex items-center gap-1">
            <Profile image="/profile.jpg" name="Moldovan Dennis"/>
            <SignOutButton/>
        </div>
    )
}