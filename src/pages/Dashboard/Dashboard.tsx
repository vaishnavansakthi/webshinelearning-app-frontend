import { DashboardBanner } from "../../components/organisms"
import { UserCard } from "../../components/moleclues"

const Dashboard = () => {
    
    return(
        <>
            <div className="p-5">
                <DashboardBanner />
                <div className="grid grid-cols-12 gap-6">
                    <UserCard />
                    <UserCard />
                    <UserCard />    
                </div>
            </div>
        </>
    )
}

export default Dashboard