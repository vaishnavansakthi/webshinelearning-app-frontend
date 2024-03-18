import { useState, useEffect } from "react"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { decryptData } from "../../utils/security"

const Profile = () => {
  const [profileData, setProfileData] = useState<any>({})

  useEffect(() => {
    const userDataString: any | null = decryptData("userData", null)
    if (userDataString !== null) {
      try {
        const myToken: any = JSON.parse(userDataString)
        setProfileData(myToken)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    } else {
      console.log("No user data found in localStorage")
    }
  }, [])
  return (
    <>
      <div className="p-10 max-[600px]:p-5">
        <div className="p-8 max-[600px]:p-1 max-[600px]:mt-12 bg-white dark:bg-[#404040] shadow mt-5">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 max-[600px]:w-40 max-[600px]:h-40 bg-indigo-100 dark:bg-[#404040] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12 max-[600px]:mt-28">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700 dark:text-[#ffffff] first-letter:uppercase">
              {profileData?.user?.username} <span className="font-light text-gray-500 dark:text-[#ffffff]">27</span>
            </h1>{" "}
            <p className="font-light dark:text-[#ffffff] text-gray-600 mt-3">{profileData?.user?.email}</p>{" "}
            <p className="mt-8 dark:text-[#ffffff] text-gray-500">+91 {profileData?.user?.mobileNumber}</p>{" "}
            <p className="mt-2 dark:text-[#ffffff] text-gray-500">University of Computer Science</p>{" "}
          </div>{" "}
          <div className="mt-12 flex flex-col justify-center">
            {" "}
            <p className="text-gray-600 text-center font-light dark:text-[#ffffff] lg:px-16">
              An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy —
              writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove
              structure. An artist of considerable range.
            </p>{" "}
            <button className="text-blue-400 py-2 px-4  font-medium mt-4"> Show more</button>{" "}
          </div>
        </div>
      </div>
    </>
  )
}

export default withProtectedRoute(Profile)
