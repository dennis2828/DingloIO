import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import AuthorizationToken from "@/lib/verifyToken";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(req: NextRequest, {params}:{params:{id: string, conversationId: string, messageId: string}}) {
    try {
      const session = await getAuthSession();
      if(!session || !session.user)
          throw new Error("Unauthorized here");
  
      //verifiy session intergrity
      const user = AuthorizationToken(session.user.accessToken);

      if(!params.id || !params.conversationId || !params.messageId || params.id.trim()==="" || params.conversationId.trim()==="" || params.messageId.trim()==="")
        throw new Error("Params are invalid");

    //delete message within conversation
      const targetProject = await db.project.findUnique({
        where:{
            id: params.id,
            userId: user.userId,
        },
      });

      if(!targetProject) throw new Error("Cannot find any project.");
      await db.message.delete({
        where:{
            id: params.messageId,
            conversationId: params.conversationId,
        },
      });
  
      return NextResponse.json(
        { msg: "Message was successfully deleted" },
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