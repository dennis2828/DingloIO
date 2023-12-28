"use server"

import { absoluteURL } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function revalidate(url: string){
    revalidatePath(absoluteURL(url));
}