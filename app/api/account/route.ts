import db from "@/lib/db";
import { AccountValidator } from "@/validators/account";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { generateApiKey } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { password, confirmPassword, ...accountData } = AccountValidator.parse(data);

    let passwordToHash;

    if (password) {
      if (password.trim() !== confirmPassword.trim())
        return new NextResponse("Password doesn't match", { status: 400 });

      passwordToHash = await bcrypt.hash(password,10);  
    }

    const newAccount = await db.user.create({
      data: {
        password: passwordToHash,
        ...accountData,
      },
    });

    const projectPasswordHash =  await bcrypt.hash("defaultapp",10);
    
    await db.project.create({
      data: {
        projectName:"default_app",
        agentImage: "https://res.cloudinary.com/dulb5sobi/image/upload/v1705774134/detn3aisfajqzq0kghaq.png",
        agentName: newAccount.username,
        password: projectPasswordHash,
        api_key: generateApiKey(),
        userId: newAccount.id,
      },
    });
    
    return NextResponse.json(
      { account: newAccount, msg: "Your account was successfully created !" },
      { status: 200 }
    );
  } catch (error) {
    console.log("gjh",error);

    if (error instanceof ZodError)
      return new NextResponse(error.issues[0].message, { status: 500 });
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if (error.meta?.target) {
          return new NextResponse(
            //@ts-ignore
            `This ${error.meta.target[0]} is already taken`
          ,{status:500});
        }
      }
    }

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
