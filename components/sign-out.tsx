import { Profile } from "./profile"
import { SignOutButton } from "./sign-out-btn"


interface SignOutProps{
    profileImage: string;
    profileName: string;
}

export const SignOut = ({profileName, profileImage}: SignOutProps) =>{
    

    return (
        <div className="flex items-center gap-1">
            <Profile image={profileImage} name={profileName}/>
            <SignOutButton/>
        </div>
    )
}