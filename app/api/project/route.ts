import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { ProjectValidator } from "@/validators/project";
import { getAuthSession } from "@/lib/authOptions";
import { JsonWebTokenError } from "jsonwebtoken";
import AuthorizationToken from "@/lib/verifyToken";

function generateApiKey(){
  const uniqueID = crypto.randomUUID();
  const formattedID = uniqueID.replace(/-/g, '');

  return `dinglo-${formattedID}`
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if(!session || !session.user)
        throw new Error("Unauthorized here");

    //verifiy session intergrity
    const user = AuthorizationToken(session.user.accessToken);

    const data = await req.json();
    const { projectPassword, projectConfirmPassword, ...projectData } = ProjectValidator.parse(data);

    let passwordToHash;

    if (projectPassword.trim() !== projectConfirmPassword.trim())
        return new NextResponse("Password doesn't match", { status: 400 });

    passwordToHash = await bcrypt.hash(projectPassword,10);  



    const newProject = await db.project.create({
      data: {
        ...projectData,
        agentImage: "/profile.jpg",
        agentName: session.user.name,
        password: passwordToHash,
        api_key: generateApiKey(),
        userId: user.userId,
      },
    });

    return NextResponse.json(
      { project: newProject, msg: "Your project was successfully created !" },
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


export async function GET(req: NextRequest){
  try {

    const authorizationToken = req.headers.get("authorization")?.split(" ")[1] || "";

    //verifiy session intergrity
    const user = AuthorizationToken(authorizationToken);

    const allProjects = await db.project.findMany({
      where:{
        userId: user.userId,
      },
    });
    
    console.log(allProjects);
    

    return NextResponse.json(
      { projects: allProjects },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    
    if(error instanceof JsonWebTokenError)
        return new NextResponse("Invalid authorization token",{status:400})
    
    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}