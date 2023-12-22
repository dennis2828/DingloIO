import { AppApiKey } from "./api-key"
import { DataInfo } from "./data-info"

export const ProjectStatistics = () =>{
    return (
        <div>
            <div className="flex flex-col gap-3 sm:flex-row items-center">
                <DataInfo className="order-2 sm:order-none" amount={5} label="new messages"/>
                <div className="order-1 sm:order-none">
                    <AppApiKey/>
                </div>
                <DataInfo className="order-3 sm:order-none" amount={15} label="online agents"/>
            </div>
        </div>
    )
}