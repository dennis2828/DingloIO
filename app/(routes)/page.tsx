import { Container } from "@/components/container";
import { Navbar } from "./components/Navbar/navbar";
import { InfoText } from "@/components/info-text";
import { buttonVariants } from "@/components/ui/button";
import {FileCode} from "lucide-react"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { About } from "./components/About/about";
import { Features } from "./components/Features/features";
import { Separator } from "@/components/ui/separator";
import { Footer } from "./components/Footer/footer";
import { EnrollWrapper } from "./components/EnrollGift/enroll-wrapper";
import { Suspense } from "react";
import { NPMPackage } from "./components/Npm/npm-package";

export default function Home({searchParams}: {searchParams:{inviter: string}}) {
    
  return (
    <main>
      <Container>
        <Navbar/>
        <section className="mt-20">
          <div className="border border-lightBlue cursor-pointer w-fit text-center mx-auto xsM:rounded-full animate-pulse p-2 mb-5 text-[.9em] xsBig:text-[1em]">
            <span className="font-bold">Dinglo.<InfoText>IO</InfoText></span> is here and is giving it all <InfoText className="font-medium">for free</InfoText>
          </div>
          <h1 className="text-left xsM:text-center text-[1.3em] xsBig:text-[1.4em] sm:text-[1.7em] md:text-[2.2em] font-bold sm:font-medium"><InfoText>Elevate</InfoText> your customer <InfoText>support</InfoText> to achieve <InfoText>new</InfoText> peeks of profits and <InfoText>orders</InfoText></h1>
          <div className="flex justify-center mt-5">
            <NPMPackage/>
          </div>
          <div className="mt-4 flex flex-col xsMd:flex-row items-center justify-center gap-3">
            <Link href={"/dashboard"} role="button" aria-label="Get Started For Free" className={cn(buttonVariants({variant:"outline"}), "w-full xsM:w-fit")}>Get Started For Free</Link>
            <Link href={"/docs"} role="button" aria-label="Docs" className={cn(buttonVariants({variant:"default"}), "flex items-center gap-1 w-full xsMd:w-fit")}>Docs <FileCode className="w-4 h-4"/></Link>
          </div>
        </section>
        <section className="my-28">
          <About/>
        </section>
        <Separator className="w-full h-[1px] bg-lightBlue"/>
        <section className="my-28">
          <Features/>
        </section>
        <section className="my-28">
        <Suspense>
          <EnrollWrapper inviter={searchParams.inviter}/>
        </Suspense>
        </section>
        <section className="mt-32">
          <Footer/>
        </section>
      </Container>
    </main>
  )
}