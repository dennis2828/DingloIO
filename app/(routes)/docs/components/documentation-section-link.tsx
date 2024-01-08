import Link from "next/link";

interface DocumentationSectionLink{
  icon: React.ReactNode;
  title: string;
  label: string;
  path: string;
}

export const DocumentationSectionLink = ({icon, title, label, path}: DocumentationSectionLink) =>{
    return (
        <Link href={path} className="border-2 border-softBlue dark:border-softBlue/80 dark:hover:border-softBlue hover:shadow-[0px_0px_20px_1px_rgba(67,117,224)] duration-100 p-3 rounded-md w-full cursor-pointer">
            {icon}
            <p className="font-semibold mt-3">{title}</p>
            <p className="dark:text-gray-300">{label}</p>
        </Link>
    )
}