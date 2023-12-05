import { Feature } from "@/types"
import Image from "next/image"

interface FeatureCardProps{
    feature: Feature
}

export const FeatureCard = ({feature}:FeatureCardProps) =>{
    return (
        <div className="h-fit">
            <Image src={feature.featureImage} width={400} height={400} className=" max-h-[270px] mx-auto w-full h-full rounded-md object-cover" alt={"feature-image"}/>
            <div>
                <p className="text-center font-medium">{feature.title}</p>
                <p className="text-left">{feature.description}</p>
            </div>
        </div>
    )
}