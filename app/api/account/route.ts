import db from "@/lib/db";
import { AccountValidator } from "@/validators/account";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { password, confirmPassword, ...accountData } =
      AccountValidator.parse(data);

    if (password) {
      if (password.trim() !== confirmPassword.trim())
        return new NextResponse("Password doesn't match", { status: 400 });
    }

    const newAccount = await db.user.create({
      data: {
        password,
        ...accountData,
      },
    });

    return NextResponse.json(
      { account: newAccount, msg: "Your account was successfully created !" },
      { status: 200 }
    );
  } catch (error) {

    if (error instanceof ZodError)
      return new NextResponse(error.issues[0].message, { status: 500 });
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if (error.meta?.target) {
          return new NextResponse(
            //@ts-ignore
            `This ${error.meta.target[0]} already exists`
          ,{status:500});
        }
      }
    }

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
