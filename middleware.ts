import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "./lib/authOptions";
import db from "./lib/db";

export { default } from "next-auth/middleware"


export const config = { matcher: ["/dashboard"] };