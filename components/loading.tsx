import { LayoutDashboardIcon } from "lucide-react";

export default function LoadingSkeleton ({label}:{label?: string}) {
    return (
        <div className="h-[100vh] flex flex-col items-center justify-center">
            <LayoutDashboardIcon className="text-softBlue w-32 h-32 animate-bounce"/>
            <p className="font-bold text-[1.1em] xsM:text-[1.3em] sm:text-[1.5em] md:text-[2.1em] animate-pulse">{label && label.trim()!=="" ? label:"Loading..."}.</p>
        </div>
    )
}