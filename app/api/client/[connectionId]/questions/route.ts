import db from "@/lib/db";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
    req: NextRequest,
    { params }: { params: { connectionId: string } }
  ) {
    try {
      
      const apiKey = req.nextUrl.searchParams.get("apiKey");
  
      if(!apiKey)
        throw new Error("No apiKey was provided");
  
      if (!params.connectionId || params.connectionId.trim() === "")
        throw new Error("Connection id cannot be null");
  
      //target project using apiKey
        const targetProject = await db.project.findUnique({
        where: {
          api_key: apiKey,
        },
      });
  
      if (!targetProject) throw new Error("Cannot find any project.");
  
      const questions = await db.predefinedAnswer.findMany({
        where:{
          projectId: targetProject.id,
        },
        select:{
            id: true,
            question: true,
            answer: true,
        },
      });

      
      return NextResponse.json(
        { questions},
        { status: 200 }
      );
    } catch (error) {
  
      if (error instanceof JsonWebTokenError)
        return new NextResponse("Invalid authorization token", { status: 400 });
  
      if (error instanceof ZodError)
        return new NextResponse(error.issues[0].message, { status: 500 });
  
      return new NextResponse("Something went wrong. Please try again later.", {
        status: 500,
      });
    }
  }