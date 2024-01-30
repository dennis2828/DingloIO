import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/Providers/providers";
import { cn, constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="og:title" content="Dinglo.IO" />
      <meta
        name="og:description"
        content="DingloIO is a modern production-ready chat widget, ready to use to give your customers an enhaced customer support."
      />
      <meta
        name="og:image"
        content={
          "https://res.cloudinary.com/dulb5sobi/image/upload/v1705774134/detn3aisfajqzq0kghaq.png"
        }
      />
      <body className={cn(inter.className, "bg-softLight dark:bg-darkBlack")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
