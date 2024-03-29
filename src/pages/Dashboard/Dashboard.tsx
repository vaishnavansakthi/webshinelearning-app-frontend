import { Helmet } from "react-helmet"

import { DashboardBanner } from "../../components/organisms"
import { UserCard } from "../../components/moleclues"
import HomeIcon from "../../assets/icons8-home-64.png"

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" type="image/png" href={HomeIcon} />
      </Helmet>
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
