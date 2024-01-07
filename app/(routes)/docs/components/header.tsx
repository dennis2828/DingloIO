import { Logo } from "@/components/logo";
import { ThemeToggler } from "@/components/theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightFromLineIcon } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <Logo append="Docs" />
      <div className="flex items-center gap-1">
        <Link
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "rounded-full font-semibold"
          )}
          href={"/dashboard"}
        >
          Dashboard{" "}
          <ArrowRightFromLineIcon className="w-4 h-4 ml-2 text-white" />
        </Link>
        <div className="h-[30px] w-[1px] bg-gray-500 ml-4" />
        <ThemeToggler />
      </div>
    </div>
  );
};
