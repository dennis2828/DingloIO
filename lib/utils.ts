import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteURL(path: string){
  return `http://localhost:3000${path}`;
}

export function copyText(text: string){
  return new Promise((resolve, reject)=>{
    navigator.clipboard.writeText(text).then(resolve).catch(reject);
  });
}