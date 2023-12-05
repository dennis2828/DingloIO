import db from "@/lib/db";
import { AccountValidator } from "@/validators/account";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
    try{
        const res = await req.json();
        const {password, confirmPassword, ...accountData} = AccountValidator.parse(res);

        if(password){
            if(password.trim()!==confirmPassword.trim())
                return new NextResponse("Password doesn't match",{status:400});
        }

        const newAccount = await db.user.create({
            data:{
                password,
                ...accountData,
            },
        });

        return NextResponse.json({account:newAccount, msg:"Your account was successfully created !"},{status:200});

    }catch(error){
        console.log();
        
        if(error instanceof ZodError)
            return new NextResponse(error.issues[0].message,{status:500});

        return new NextResponse("Something went wrong. Please try again later.",{status:500});
    }
}