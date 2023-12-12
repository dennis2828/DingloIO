"use server"
import { getAuthSession } from "@/lib/authOptions"
import db from "@/lib/db";

export async function collectFeature(){
    try{
        const session = await getAuthSession();

        if(!session || !session.user)
            throw new Error("You are not authorized");

        await db.user.update({
            where:{
                id: session.user.id,
            },
            data:{
                uniqueFeature:true,
            },
        });
        return {collected: true, msg:"You successfully collected the unique feature. Check the dashboard."}
    }catch(err){
        return {collected: false, msg:(err as Error).message}
    }
}