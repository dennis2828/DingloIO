import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import AuthorizationToken from "@/lib/verifyToken";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest, {params}:{params:{id: string, conversationId: string}}) {
    try {
      const session = await getAuthSession();
      if(!session || !session.user)
          throw new Error("Unauthorized here");

        const data = await req.json();

  
      //verify session intergrity
      const user = AuthorizationToken(session.user.accessToken);

      if(!params.id || !params.conversationId || params.id.trim()==="" || params.conversationId.trim()==="")
        throw new Error("Params are invalid");

    //delete message within conversation
      const targetProject = await db.project.findUnique({
        where:{
            id: params.id,
            userId: user.userId,
        },
      });

      if(!targetProject) throw new Error("Cannot find any project.");
      
      const newMessage = await db.message.create({
        data:{
            conversationId: params.conversationId,
            message: data.message,
            messagedAt: data.messagedAt,
            isAgent: data.isAgent,
        },
      });
  
      return NextResponse.json(
        { message: newMessage,msg: "Message was successfully created!" },
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


  export async function GET(req: NextRequest, {params}:{params:{id: string, conversationId: string}}) {
    try {
      const session = await getAuthSession();
      if(!session || !session.user)
          throw new Error("Unauthorized here");

      //verify session intergrity
      const user = AuthorizationToken(session.user.accessToken);

      if(!params.id || !params.conversationId || params.id.trim()==="" || params.conversationId.trim()==="")
        throw new Error("Params are invalid");

    //delete message within conversation
      const targetProject = await db.project.findUnique({
        where:{
            id: params.id,
            userId: user.userId,
        },
      });

      if(!targetProject) throw new Error("Cannot find any project.");

      const allMessages = await db.message.findMany({
        where:{
          conversationId: params.conversationId,
        },
      });

      console.log(allMessages);
      
  
      return NextResponse.json(allMessages);
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