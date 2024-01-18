import { Feature } from "@/types"
import Image from "next/image"

interface FeatureCardProps{
    feature: Feature
}

export const FeatureCard = ({feature}:FeatureCardProps) =>{
    return (
        <div className="h-fit font-roboto">
            <Image src={feature.featureImage} width={400} height={400} className="w-full sm:w-[350px] h-[250px] rounded-md object-cover mx-auto" alt={"feature-image"}/>
            <div>
                <p className="text-center font-semibold text-[1.1em]">{feature.title}</p>
                <p className="text-left tracking-tighter">{feature.description}</p>
            </div>
        </div>
    )
}