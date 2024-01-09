import Image from "next/image";

const DashboardInterfacePage = () =>{
    return (
        <div>
            <h1 className="font-bold text-[2.3em]">Dashboard Interface</h1>
            <p className="text-sm font-medium dark:text-gray-300">
                Explore our super lightweight and intuitive dashboard interface!
            </p>
            <Image src={"/predefined-answers.png"} width={250} height={250} className="w-full h-full max-w-[250px] max-h-[250px] rounded-md object-cover" priority quality={100} alt="Dashboard interface"/>
        </div>
    )
}

export default DashboardInterfacePage;