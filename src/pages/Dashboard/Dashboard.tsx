import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { BirthDayCard, DashboardBanner, DashboardTable, SessionCard } from "../../components/organisms"
import { UserCard } from "../../components/moleclues"
import HomeIcon from "../../assets/icons8-home-64.png"
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

  // Define accordion items data
  const accordionItems = [
    {
      id: 1,
      question: "What is Flowbite?",
      answer:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
    },
    {
      id: 2,
      question: "Is there a Figma file available?",
      answer:
        "Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.",
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
          <UserCard title="Points" subTitle="Total points" count={400} />

          
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
          <DashboardTable />

          <DashboardTable />
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
