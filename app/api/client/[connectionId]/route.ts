import db from "@/lib/db";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  try {
    
    const data = await req.json();
    
    if (!params.connectionId || params.connectionId.trim() === "")
      throw new Error("Connection id cannot be null");

    //delete message within conversation
    const targetProject = await db.project.findUnique({
      where: {
        api_key: data.apiKey,
      },
    });

    if (!targetProject) throw new Error("Cannot find any project.");

    await db.message.create({
      data: {
        conversationId: params.connectionId,
        message: data.message,
        messagedAt: data.messagedAt,
        isAgent: false,
        automated: false,
      },
    });

    return NextResponse.json(
      { msg: "Message was successfully created!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    if (error instanceof JsonWebTokenError)
      return new NextResponse("Invalid authorization token", { status: 400 });

    if (error instanceof ZodError)
      return new NextResponse(error.issues[0].message, { status: 500 });

    return new NextResponse("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  try {
    const apiKey = req.nextUrl.searchParams.get("apiKey");

    if (!apiKey) throw new Error("No apiKey was provided");

    if (!params.connectionId || params.connectionId.trim() === "")
      throw new Error("Connection id cannot be null");

    //target project using apiKey
    const targetProject = await db.project.findUnique({
      where: {
        api_key: apiKey,
      },
    });

    if (!targetProject) throw new Error("Cannot find any project.");

    const connectionMessages = await db.message.findMany({
      where: {
        conversationId: params.connectionId,
      },
    });

    console.log("cm", connectionMessages);

    const messagesWithAgent = connectionMessages.map((conn) => {
      if (conn.automated) {
        return {
          ...conn,
          agentName: "automat",
          agentImage: "https://res.cloudinary.com/dulb5sobi/image/upload/v1704311444/xjqlhfye2gn1f7urynwv.png",
        };
      }
      return {
        ...conn,
        agentName: conn.isAgent ? targetProject.agentName : undefined,
        agentImage: conn.isAgent ? targetProject.agentImage : undefined,
      };
    });

    

    return NextResponse.json({ messages: messagesWithAgent }, { status: 200 });
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
