import { useCallback, useEffect, useState } from "react"
const CountDown = () => {
  const [countDownTime, setCountDownTIme] = useState<any>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })
  const getTimeDifference = (countDownTime: any) => {
    const currentTime = new Date().getTime()
    const timeDiffrence = countDownTime - currentTime
    let days =
      Math.floor(timeDiffrence / (24 * 60 * 60 * 1000)) >= 10
        ? Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))
        : `0${Math.floor(timeDiffrence / (24 * 60 * 60 * 1000))}`
    const hours =
      Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) >= 10
        ? Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
        : `0${Math.floor((timeDiffrence % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))}`
    const minutes =
      Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60)) >= 10
        ? Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))
        : `0${Math.floor((timeDiffrence % (60 * 60 * 1000)) / (1000 * 60))}`
    const seconds =
      Math.floor((timeDiffrence % (60 * 1000)) / 1000) >= 10
        ? Math.floor((timeDiffrence % (60 * 1000)) / 1000)
        : `0${Math.floor((timeDiffrence % (60 * 1000)) / 1000)}`
    if (timeDiffrence < 0) {
      setCountDownTIme({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      })
    } else {
      setCountDownTIme({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      })
    }
  }
  const startCountDown = useCallback(() => {
    const customDate = new Date()
    const countDownDate = new Date(
      customDate.getFullYear(),
      customDate.getMonth() + 1,
      customDate.getDate() + 6,
      customDate.getHours(),
      customDate.getMinutes(),
      customDate.getSeconds() + 1,
    )
    setInterval(() => {
      getTimeDifference(countDownDate.getTime())
    }, 1000)
  }, [])
  useEffect(() => {
    startCountDown()
  }, [startCountDown])
  return (
    <div className="flex justify-center items-center">
      <div className="mx-3 sm:p-10 p-4 rounded-md flex justify-center flex-col gap-6 shadow-[5px_5px_50px_rgba(47,46,60,1)]">
        <div className="flex flex-col gap-2">
          <h1 className="text-center sm:text-3xl text-xl font-semibold leading-8 text-[#FBFAF8]">
            Hurry, Limited Availability
          </h1>
          <span className="text-sm font-semibold text-center leading-8 text-[#959AAE]">
            Be a part of Singing Concert, Grab the Pass before it&apos;s complete!
          </span>
        </div>
        <div className="flex justify-between sm:px-4">
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 flex justify-center items-center bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {countDownTime?.days}
            </span>
            <span className="text-sm dark:text-[#FBFAF8] font-bold">{countDownTime?.days == 1 ? "Day" : "Days"}</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {countDownTime?.hours}
            </span>
            <span className="text-sm dark:text-[#FBFAF8] font-bold">{countDownTime?.hours == 1 ? "Hour" : "Hours"}</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {countDownTime?.minutes}
            </span>
            <span className="text-sm dark:text-[#FBFAF8] font-bold">
              {countDownTime?.minutes == 1 ? "Minute" : "Minutes"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {countDownTime?.seconds}
            </span>
            <span className="text-sm dark:text-[#FBFAF8] font-bold">
              {countDownTime?.seconds == 1 ? "Second" : "Seconds"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CountDown
