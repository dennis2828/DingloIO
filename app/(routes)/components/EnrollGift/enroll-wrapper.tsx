import { getAuthSession } from "@/lib/authOptions"
import { EnrollGift } from "./enroll-gift";
import { SaveInviter } from "./save-inviter";
import db from "@/lib/db";

export const EnrollWrapper = async ({inviter}:{inviter: string}) =>{
    const session = await getAuthSession();
    
    if(!session || !session.user)
       return <SaveInviter inviter={inviter}/>

    const user = await db.user.findUnique({
        where:{
            id: session?.user.id,
        },
        select:{
            invitations:true,
            uniqueFeature:true,
        },
    });
    
    return (
        <EnrollGift userId={session.user.id} collected={user?.uniqueFeature!} invitations={user?.invitations || []} uniqueFeature={user!.uniqueFeature}/>
    )
}