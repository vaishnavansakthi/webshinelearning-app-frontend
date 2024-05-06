import React, { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { BirthDayCard, DashboardBanner, DashboardTable, SessionCard } from "../../components/organisms"
import { UserCard } from "../../components/moleclues"
import HomeIcon from "../../assets/icons8-home-64.png"
import { getUserById } from "../../services/user.services"
import { decryptData } from "../../utils/security"
import { getAllLeaerboardData } from "../../services/userLeaderboard.services"
import { getAllTaskTracker } from "../../services/taskTracker.services"
import { globalStateContext } from "../../context/GlobalStateProvider"

const Dashboard = () => {
  const [userdata, setUserdata] = useState<any>({})
  const [leaderboardData, setLoaderboardData] = useState([])
  const [tasktrackerData, setTasktrackerData] = useState([])

  const { points } = useContext(globalStateContext)

  const leaderboardHeader = [
    { label: "Username", value: "user.username" },
    { label: "Suggestion", value: "suggestion" },
    { label: "Points", value: "points" }
  ];
  
  const tasktrackerHeader = [
    { label: "Username", value: "user.username" },
    { label: "Title", value: "title" },
    { label: "Story Points", value: "storyPoints" },
    { label: "Status", value: "status" },
    { label: "Comments", value: "comments" }
  ];

  useEffect(() => {
    const res = getAllLeaerboardData()
    res
      .then((res: any) => {
        setLoaderboardData(res.sort((a: any, b: any) => b.points - a.points))
      })
      .catch((err: any) => {
        console.log(err)
      })

    const taskRes = getAllTaskTracker()
    taskRes
      .then((taskRes: any) => {
        setTasktrackerData(taskRes)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const myToken = JSON.parse(decryptData("userData", null))
    const user = getUserById(myToken.user.id)
    user.then((res: any) => {
      setUserdata(res?.[0])
    })
  }, [])

  const attendancePercentage = userdata && userdata.attendance ? Math.floor((userdata.attendance.length / 32) * 100) : 0;

  // Define accordion items data
  const accordionItems = [
    {
      id: 1,
      question: "What is MERN Stack?",
      answer:
        "The MERN stack is a software development stack that comprises four main technologies: MongoDB, Express.js, React.js, and Node.js. It's commonly used for building full-stack web applications, offering a powerful combination of a NoSQL database, a server-side framework, a client-side library for user interfaces, and a runtime environment for executing JavaScript code.",
    },
    {
      id: 2,
      question: "What is Front end development?",
      answer:
        "Front-end development involves building the user interface and user experience of websites and web applications using HTML, CSS, and JavaScript. It focuses on creating visually appealing and interactive elements that users interact with directly in their web browsers.",
    },
    {
      id: 3,
      question: "What are the differences between Flowbite and Tailwind UI?",
      answer:
        "The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.",
    },
  ]

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" type="image/png" href={HomeIcon} />
      </Helmet>
      <div className="p-5 max-md:p-2">
        <DashboardBanner />

        <div className="grid grid-cols-12 gap-6">
          <UserCard title="Attendance" subTitle="Percentage" count={attendancePercentage ?? ""} />
          <UserCard title="Tasks" subTitle="Number of tasks" count={userdata?.tasks?.length ?? ""} />
          <UserCard title="Points" subTitle="Total points" count={points} />
          <UserCard title="Total learners" subTitle="Webshine family" count={52} />

          <div className="text-lg col-span-12 h-[100%] bg-white dark:bg-[#404040] text-gray-800 dark:text-gray-200 leading-relaxed mb-6 px-5 py-3 shadow-md">
            <p className="p-3">
              🚀 <b>Webshine</b> is your go-to online platform for mastering web technologies. Whether you're a beginner
              or looking to level up your skills, we've got you covered. Dive into web development at your own pace and
              unleash the power of modern web technologies.
            </p>
            <p className="p-3">
              🎨 Our platform covers everything you need to create stunning websites and applications. From frontend
              design to backend development, and even full-stack integration, our specialized courses guide you through
              each step of the process.
            </p>
            <p className="p-3">
              💡 At Webshine, we prioritize hands-on learning and practical experience. With interactive tutorials,
              real-world projects, and mentorship programs, you'll not only grasp the concepts but also gain valuable
              skills applicable in real-life scenarios.
            </p>
            <p className="p-3">
              🏆 Ready to kickstart your career in web development? Our 4-month program is designed to equip you with
              the knowledge and expertise needed to succeed in the industry. Join us and embark on a journey towards
              becoming a proficient web developer.
            </p>
          </div>
          <SessionCard />
          <DashboardTable header={leaderboardHeader} data={leaderboardData} title="Top 5 Leaderboard Toppers" />

          <DashboardTable header={tasktrackerHeader} data={tasktrackerData} title="Task Tracker" />
          <BirthDayCard />

          <div className="col-span-6 max-md:col-span-12">
            {accordionItems.map((item) => (
              <div className="col-span-6" key={item.id}>
                <AccordionItem question={item.question} answer={item.answer} />
              </div>
            ))}
          </div>
          <div className="col-span-6 max-md:col-span-12">
            {accordionItems.map((item) => (
              <div className="col-span-6" key={item.id}>
                <AccordionItem question={item.question} answer={item.answer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// Accordion Item Component
const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded-md overflow-hidden mb-4 bg-white border-gray-400">
      <button
        className="w-full flex justify-between items-center py-3 px-4 dark:bg-[#404040] dark:text-gray-100 dark:hover:bg-[#404040] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-6 h-6 transition-transform transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 5.293a1 1 0 011.414 0L10 7.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 13a1 1 0 01-1-1V2a1 1 0 112 0v10a1 1 0 01-1 1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={`px-4 py-3 dark:bg-[#404040] ${isOpen ? "block" : "hidden"}`}>
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  )
}

export default Dashboard
