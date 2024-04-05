import { ReactNode, createContext, useEffect, useState } from "react"
import { getUserById } from "../services/user.services"
import { decryptData } from "../utils/security"

export const globalStateContext = createContext<any>(null)

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(null)

  useEffect(() => {
    const myToken = decryptData("userData", "object")

    if (myToken?.user?.id) {
      getUserById(myToken.user.id)
        .then((res: any) => {
          setPoints(res?.[0]?.leaderboard?.[0]?.points ?? 0)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <>
      <globalStateContext.Provider value={{ points, setPoints }}>{children}</globalStateContext.Provider>
    </>
  )
}

export default GlobalStateProvider
