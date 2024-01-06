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

export function isEmail(email: string) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

export function absoluteUrl(path: string){
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}


export function formatCreatedAt(createdAt: Date): string {
  const now = new Date();
  const diffInMillis: number = now.getTime() - createdAt.getTime();

  const seconds: number = Math.floor(diffInMillis / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const years: number = Math.floor(days / 365);

  if (seconds < 60) {
    return 'NOW';
  } else if (minutes === 1) {
    return 'yesterday';
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days === 1) {
    return 'yesterday';
  } else if (days < 365) {
    return `${days}d ago`;
  } else {
    return `${years}y ago`;
  }
}