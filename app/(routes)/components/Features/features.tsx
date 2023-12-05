import { InfoText } from "@/components/info-text";
import { features } from "@/constants/feature";
import { FeatureCard } from "./feature-card";

export const Features = () => {
    
  return (
    <div>
      <h2 className="font-bold text-center sm:text-left text-[1.05em] xs:text-[1.1em] xsMd:text-[1.3em] sm:text-[1.4em] mb-4">
        Features <InfoText>we</InfoText> offer
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature,index)=>(
            <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};