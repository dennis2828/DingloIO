"use server"

import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";

export async function inviteUser(inviterId: string){

    try{
        const session = await getAuthSession();
        
        if(!session || !session.user)
            throw new Error("You are not authorized");
        
        if(session.user.id===inviterId)
            throw new Error("You cannot invite yourself");

        const alreadyInvited = await db.user.findMany({
            where:{
                invitations:{
                    has:session.user.id,
                }
            }
        });

        if(alreadyInvited)
            throw new Error("You are already invited.");

        const currentUser = await db.user.findUnique({
            where:{
                id: session.user.id,
            },
        });
        if(currentUser?.isInvited)
            throw new Error("You are already invited");

        const inviter = await db.user.findUnique({
            where:{
                id: inviterId,
            },
        });

        
        if(!inviter)
            throw new Error("Cannot find any inviters");

        //update inviter
        await db.user.update({
            where:{
                id: inviterId,
            },
            data:{
                invitations:[...inviter.invitations, session.user.id],
            },
        });
        //update invitated
        await db.user.update({
            where:{
                id: session.user.id,
            },
            data:{
                isInvited: true,
                invitedBy:inviterId,
            },
        });

        return {invited: true, msg:"You was successfully invited."};

    }catch(err){
        return {invited: false, msg:(err as Error).message};
    }
}