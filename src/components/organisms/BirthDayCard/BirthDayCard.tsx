import { useEffect, useState } from "react"
import { decryptData } from "../../../utils/security"
import { getUserData } from "../../../services/adminDashboard.services"

function BirthDayCard() {
  const [profileData, setProfileData] = useState<any>(null)
  const [countdown, setCountdown] = useState<string>("")
  const [isBirthday, setIsBirthday] = useState<boolean>(false)

  const user = JSON.parse(decryptData("userData", null))

  useEffect(() => {
    const res = getUserData(user.user.id)
    res
      .then((profile: any) => {
        setProfileData(profile[0]?.profile)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (profileData && profileData.dateOfBirth) {
      const dob = new Date(profileData.dateOfBirth)
      const today = new Date()
      const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())

      if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
      }

      if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
      }

      const diffTime = nextBirthday.getTime() - today.getTime()

      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
      if (dob.getMonth() === today.getMonth() && dob.getDate() === today.getDate()) {
        setIsBirthday(true)
      } else {
        setCountdown(`${days} days ${hours} hours ${minutes} minutes`)
      }
    }
  }, [profileData])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#404040] shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold capitalize text-slate-800 dark:text-slate-100">Hi, {user.user.username}</h2>
      </header>
      <div className="px-5 py-4 text-center">
        {isBirthday ? (
          <div className="happy-birthday-animation text-4xl max-md:text-3xl p-2">
            <p className="text-gray-600 dark:text-gray-300 mt-5">Today is a special day for you! 🎉</p>
            <p className="mt-2 text-[18px] max-md:text-[16px] dark:text-gray-200">
              Wishing you a fantastic birthday filled with joy and happiness! 🎂🎈
            </p>
            <p>Many more happy returns of the day</p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Only <br /><span className="font-extrabold text-lg mb-7">{countdown}</span> <span className="mt-2 block">until your next birthday! 🎂🎈</span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default BirthDayCard
