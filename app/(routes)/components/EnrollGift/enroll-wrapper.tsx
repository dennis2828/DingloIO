import { getAuthSession } from "@/lib/authOptions"
import { EnrollGift } from "./enroll-gift";
import { SaveInviter } from "./save-inviter";

export const EnrollWrapper = async ({inviter}:{inviter: string}) =>{
    const session = await getAuthSession();
    
    
    if(!session || !session.user)
       return <SaveInviter inviter={inviter}/>

    return (
        <EnrollGift userId={session.user.id}/>
    )
}