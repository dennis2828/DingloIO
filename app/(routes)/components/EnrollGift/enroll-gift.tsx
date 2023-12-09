import { InfoText } from "@/components/info-text"
import { Button } from "@/components/ui/button"
import { Invitation } from "./invitation"
import { getAuthSession } from "@/lib/authOptions"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'



export const EnrollGift = async ({inviter}:{inviter: string}) =>{
    const session = await getAuthSession();
    if(!session || !session.user){
      
        return null;
    };
    console.log(session);
    let inviterId=inviter;

    if(inviterId && inviterId.trim()!=="" && inviterId!==session.user.id){
        try{    
            const inviterUser = await db.user.findUnique({
                where:{
                    id:inviterId,
                }
            });
            if(inviterUser)
            {
                //update inviter invitations
                await db.user.update({
                    where:{
                        id:inviterId,
                    },
                    data:{
                        invitations:[...inviterUser.invitations, session.user.id],
                    },
                });

                 //invitated feature
                 await db.user.update({
                    where:{
                        id:session.user.id,
                    },
                    data:{
                        isInvited: true,
                        invitedBy:inviterId,
                    },
                });
            }
        }catch(err){}finally{
            revalidatePath("/");
        }
    }
   

    return (
        <div className="dark:shadow-[0px_0px_20px_1px_rgba(126,154,234)] py-5 px-2 dark:rounded-md">
            <p className="text-center font-bold text-[1.15em] xs:text-[1.3em] xsMd:text-[1.4em] sm:text-[1.5em] md:text-[2em] lg:text-[2.3em]">Enroll <InfoText>now</InfoText> for a unique <InfoText>feature</InfoText> for the first 200 users</p>
            <p className="text-center text-sm">Use your invite link for another special feature</p>
            <div className="flex flex-col items-center justify-center gap-8">
                <p className="text-center font-medium mt-3 xss:text-[1.1em] sm:text-[1.3em]">157 places <InfoText className="text-lightBlue">left</InfoText></p>
                <div className="flex flex-col-reverse md:flex-row gap-3">
                    <Invitation inviterId={session.user.id}/>
                    <Button aria-label="COLLECT UNIQUE FEATURE NOW" variant={"softDefault"} className="hover:scale-95 self-center dark:bg-transparent transition-[500ms] whitespace-break-spaces">COLLECT UNIQUE FEATURE NOW</Button>
                </div>
            </div>
        </div>
    )
}