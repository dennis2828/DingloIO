import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import AuthorizationToken from "@/lib/verifyToken";
import { ProjectUpdateValidator } from "@/validators/project";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PATCH(req: NextRequest, {params}:{params:{id: string}}) {
    try {
      const session = await getAuthSession();
      if(!session || !session.user)
          throw new Error("Unauthorized here");
  
      //verifiy session intergrity
      const user = AuthorizationToken(session.user.accessToken);
      console.log(user, params);
      
      const data = await req.json();

      const dataToUpdate = ProjectUpdateValidator.parse(data);
        
      const targetProject = await db.project.findUnique({
        where:{
            id: params.id,
            userId: user.userId,
        },
      });
      console.log(targetProject);
      
      if(!targetProject) throw new Error("Cannot find any project.");

      //update project
      await db.project.update({
        where:{
            id: params.id,
            userId:user.userId,
        },
        data: {
         ...dataToUpdate, 
        },
      });
  
      return NextResponse.json(
        { msg: "Project was successfully updated" },
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