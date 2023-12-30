import db from "@/lib/db";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest, {params}:{params:{connectionId: string}}) {
    try {

      console.log("got cors");
      const data = await req.json();

       console.log("cors", data);


    //     if(!params.connectionId || params.connectionId.trim()==="") throw new Error("Connection id cannot be null");


    // //delete message within conversation
    //   const targetProject = await db.project.findUnique({
    //     where:{
    //         api_key: data.api_key,
    //     },
    //   });

    //   if(!targetProject) throw new Error("Cannot find any project.");

    //   const newMessage = await db.message.create({
    //     data:{
    //         id: data.id,
    //         conversationId: params.connectionId,
    //         message: data.message,
    //         messagedAt: data.messagedAt,
    //         isAgent: false,
    //     },
    //   });
    console.log("GOT HERE CORS");
    
  
      return NextResponse.json(
        { msg: "Message was successfully created!" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      
      if(error instanceof JsonWebTokenError)
          return new NextResponse("Invalid authorization token",{status:400})
      
      if (error instanceof ZodError)
        return new NextResponse(error.issues[0].message, { status: 500 });
      
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }
  }