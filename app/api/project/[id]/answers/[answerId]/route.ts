import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import AuthorizationToken from "@/lib/verifyToken";
import { AnswerValidator } from "@/validators/answer";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(req: NextRequest, {params}:{params:{id: string, answerId: string}}) {
    try {
       
      const session = await getAuthSession();
      if(!session || !session.user)
          throw new Error("Unauthorized");
  
      //verifiy session intergrity
      const user = AuthorizationToken(session.user.accessToken);
      
        
      const targetProject = await db.project.findUnique({
        where:{
            id: params.id,
            userId: user.userId,
        },
      });
      
      if(!targetProject) throw new Error("Cannot find any project.");

      //update project
      await db.predefinedAnswer.delete({
       where:{
            id: params.answerId,
            projectId:params.id,
        },
      
      });
  
      return NextResponse.json(
        { msg: "Answer was successfully deleted !" },
        { status: 200 }
      );
    } catch (error) {
      console.log("ERROR",error);
      
      if(error instanceof JsonWebTokenError)
          return new NextResponse("Invalid authorization token",{status:400})
      
      if (error instanceof ZodError)
        return new NextResponse(error.issues[0].message, { status: 500 });
      
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }
  }