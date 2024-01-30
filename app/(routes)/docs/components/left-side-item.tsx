"use client";
import Link from "next/link";
import { DocumentationSection } from "../types";
import { usePathname } from "next/navigation";

export const LeftSideItem = ({ doc }: { doc: DocumentationSection }) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      {doc.links.map((section) => {
        if (pathname.includes(doc.path))
          return (
            <div>
              <p className="font-bold mb-2 whitespace-nowrap">{section.title}</p>
              <div className="flex flex-col">
                {section.links.map((subLink, idx) => {
                    return (
                      <Link key={idx}  href={subLink.link} className={`font-semibold text-[.85em] text-softBlue rounded-md p-1 ${subLink.link===pathname ? "bg-[#4375e0] text-white":"hover:bg-softBlue hover:text-white dark:hover:text-softBlue dark:hover:bg-gray-900/60"}  p-2 whitespace-nowrap`}>
                        {subLink.title}
                      </Link>
                    );
                })}
              </div>
            </div>
          );
      })}
    </div>
  );
};
