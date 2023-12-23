import { InfoText } from "@/components/info-text";

interface PageInfoProps {
  label: string;
  icon?: React.ReactNode;
}

export const PageInfo = ({ label, icon }: PageInfoProps) => {
    const words = label.split(" ");

  return (
    <div className="flex items-center gap-2 w-fit bg-softBlue dark:bg-transparent p-2 dark:p-0">
      <h1 className="text-[1.15em] xsM:text-[1.2em] xsMd:text-[1.3em] font-bold text-white">
        
        <InfoText className="text-white dark:text-softBlue">{words[0]}</InfoText>{" "}
        {words.map((word, idx)=>idx>0 && word + " ")}
      </h1>
      {icon ? icon:null}
    </div>
  );
};
