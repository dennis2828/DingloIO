import Image from "next/image"

interface ProfileProps{
    image: string;
    name?: string;
}

export const Profile = ({image, name}:ProfileProps) =>{
    return (
        <div className="cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 duration-150">
            <Image src={image} width={60} height={60} className="w-[55px] h-[55px] mx-auto rounded-full object-cover" alt="profile-image"/>
            {name && name.trim()!=="" ? <p className="text-xs font-medium">{name}</p>:null}
        </div>
    )
}