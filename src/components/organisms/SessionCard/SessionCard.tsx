import { useEffect, useState } from "react"
import { getSessions } from "../../../services/showSession.services"

function SessionCard() {
  const [sessionData, setSessionData] = useState<any>([])
  useEffect(() => {
    const res = getSessions()
    res
      .then((sessiondata) => {
        setSessionData(sessiondata)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {sessionData &&
        sessionData.length > 0 &&
        sessionData.map((session: any) => {
          return (
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#404040] shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold capitalize text-slate-800 dark:text-slate-100">Course Session Details</h2>
              </header>
              <div className="px-5 py-4 text-center">
                <div className="text-2xl max-md:text-3xl p-2 dark:text-white">{session?.topic}</div>
                <p className="text-gray-600 dark:text-gray-300 mt-10">{session?.prerequisite} 🎉</p>
                <p className="mt-5 text-[18px] max-md:text-[16px] dark:text-gray-200">{session?.sessionTiming}</p>
                <div className="mt-5">
                  <a
                    href={session?.meetLink}
                    target="_blank"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Join Session
                  </a>
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default SessionCard
