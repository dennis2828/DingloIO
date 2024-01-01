import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import AuthorizationToken from "@/lib/verifyToken";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(req: NextRequest, {params}:{params:{id: string, conversationId: string}}) {
    try {
      const session = await getAuthSession();
      if(!session || !session.user)
          throw new Error("Unauthorized here");
  
      //verifiy session intergrity
        AuthorizationToken(session.user.accessToken);
      console.log(params);
      
        if(!params.id || !params.conversationId)
          throw new Error("Invalid delete request. Please provide the project id and conversation id");
          
        const conversationToDelete = await db.conversation.findUnique({
          where:{
            projectId:params.id,
            connectionId: params.conversationId,
          },
        });

        if(!conversationToDelete)
          throw new Error("Cannot find any conversation to delete.");

        await db.conversation.delete({
          where:{
            connectionId: params.conversationId,
          },
        });

      return NextResponse.json(
        {msg: "Conversation was successfully created !" },
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