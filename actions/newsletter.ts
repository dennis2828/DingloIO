"use server"

import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import { isEmail } from "@/lib/utils";

export async function subscribeNewsletter(email: string){
    try{

        const session = await getAuthSession();

        if(!session || !session.user)
            throw new Error("You are not authorized");

        if(!isEmail(email))
            return {subscribed: false, msg:"Email is invalid"};
        
            await db.user.update({
            where:{
                id: session.user.id,
            },
            data:{
                newsletter: email,
            },
        });
        return {subscribed: true, msg:"You subscribed to DingloIO newsletter."};
    }catch(err){
        return {subscribed: false, msg:(err as Error).message};
    }
}

export async function unsubscribeNewsletter(){
    try{

        const session = await getAuthSession();

        if(!session || !session.user)
            throw new Error("You are not authorized");

        
            await db.user.update({
            where:{
                id: session.user.id,
            },
            data:{
                newsletter: null,
            }});

        return {unsubscribed: true, msg:"You unsubscribed from DingloIO's newsletter."};
    }catch(err){
        return {unsubscribed: false, msg:(err as Error).message};
    }
}