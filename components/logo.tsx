import Link from "next/link"

export const Logo = () =>{
    return (
        <Link href={"/"} prefetch className="font-bold text-[1.2em] xs:text-[1.3em] xsBig:text-[1.6em]">
            Dinglo.<span className="text-softBlue">IO</span>
        </Link>
    )
}