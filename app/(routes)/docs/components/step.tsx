import { SyntaxHighlighterPreview } from "./syntax-highlighter";

interface StepProps{
    stepNumber: number;
    title: string;
    children?: React.ReactNode;
}

export const Step = ({stepNumber, title, children}: StepProps) =>{
 return (
    <div>
        <p className="font-bold text-[1.2em]"><span>{stepNumber}.</span> {title}</p>
        <div>
            {children}
           
        </div>
    </div>
 )
}