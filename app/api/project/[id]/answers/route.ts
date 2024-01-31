import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import AuthorizationToken from "@/lib/verifyToken";
import { AnswerValidator } from "@/validators/answer";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest, {params}:{params:{id: string}}) {
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
    const predefinedAnswers = await db.predefinedAnswer.findMany({
      where:{
        projectId: targetProject.id,
      },
    });
    

    return  NextResponse.json(predefinedAnswers);
  } catch (error) {
    
    if(error instanceof JsonWebTokenError)
        return new NextResponse("Invalid authorization token",{status:400})
    
    if (error instanceof ZodError)
      return new NextResponse(error.issues[0].message, { status: 500 });
    
    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest, {params}:{params:{id: string}}) {
    try {
       
      const session = await getAuthSession();
      if(!session || !session.user)
          throw new Error("Unauthorized");
  
      //verifiy session intergrity
      const user = AuthorizationToken(session.user.accessToken);
      
      const data = await req.json();

      const newAnswerData= AnswerValidator.parse(data);
        
      const targetProject = await db.project.findUnique({
        where:{
            id: params.id,
            userId: user.userId,
        },
      });
      
      if(!targetProject) throw new Error("Cannot find any project.");

      //update project
      await db.predefinedAnswer.create({
       
        data: {
          ...newAnswerData
        },
      });
      
  
      return NextResponse.json(
        { msg: "Answer was successfully created !" },
        { status: 200 }
      );
    } catch (error) {
      
      if(error instanceof JsonWebTokenError)
          return new NextResponse("Invalid authorization token",{status:400})
      
      if (error instanceof ZodError)
        return new NextResponse(error.issues[0].message, { status: 500 });
      
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }
  }