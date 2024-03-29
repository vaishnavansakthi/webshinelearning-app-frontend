import { Helmet } from "react-helmet"

import { BirthDayCard, DashboardBanner, DashboardTable } from "../../components/organisms"
import { UserCard } from "../../components/moleclues"
import HomeIcon from "../../assets/icons8-home-64.png"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/user.services"
import { decryptData } from "../../utils/security"

const Dashboard = () => {
  const [userdata, setUserdata] = useState<any>({})

  useEffect(() => {
    const myToken = JSON.parse(decryptData("userData", null))
    const user = getUserById(myToken.user.id)
    user.then((res: any) => {
      console.log("user", res?.[0])
      setUserdata(res?.[0])
    })
  }, [])

  const attendancePercentage = userdata && userdata.attendance && (userdata.attendance.length / 32) * 100

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" type="image/png" href={HomeIcon} />
      </Helmet>
      <div className="p-5">
        <DashboardBanner />

        <div className="grid grid-cols-12 gap-6">
          <UserCard title="Attendance" subTitle="Percentage" count={attendancePercentage ?? ""} />
          <UserCard title="Tasks" subTitle="Number of tasks" count={userdata?.tasks?.length ?? ""} />
          <UserCard title="Points" subTitle="Total points" count={400} />
          <div className="text-lg col-span-12 bg-white dark:bg-[#404040] text-gray-800 dark:text-gray-200 leading-relaxed mb-6 px-5 py-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
            <p className="p-3">
              🚀 <b><span className="text-[25px]">W</span>ebshine</b> is an online learning platform for all new learners eager to delve into web technologies.
              Whether you're just starting your journey or looking to enhance your skills, Webshine provides
              comprehensive resources tailored to your needs. Dive into web development at your own pace and unlock the
              potential of modern web technologies.
            </p>
            <p className="p-3">
              🎨 <span className="text-[25px]">O</span>ur platform covers every aspect of creating websites and applications, guiding you through each step
              of the process. From frontend design to backend development, and even full-stack integration, we offer
              specialized courses to help you master the skills required in today's digital landscape.
            </p>
            <p className="p-3">
              💡 <span className="text-[25px]">A</span>t Webshine, we believe in hands-on learning and practical experience. Our interactive tutorials,
              real-world projects, and mentorship programs ensure that you not only understand the concepts but also
              gain valuable experience that you can apply in real-life scenarios.
            </p>
            <p className="p-3">
              🏆 <span className="text-[25px]">W</span>hether you're aiming to become a frontend developer, backend engineer, or full-stack expert,
              Webshine's 4-month program is designed to equip you with the knowledge and expertise needed to succeed in
              the industry. Join us and embark on a journey towards becoming a proficient web developer.
            </p>
          </div>

          <BirthDayCard />
          <DashboardTable />
          {/* <DashboardTable /> */}
        </div>
      </div>
    </>
  )
}

export default Dashboard
