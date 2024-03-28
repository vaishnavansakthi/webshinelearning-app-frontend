import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { decryptData } from "../../../utils/security"
import { Switcher } from "../../atoms"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [myToken, setMyToken] = useState(decryptData("userData", "object"))
  const [urlPath, setUrlPath] = useState<string>("");

  const location = useLocation();
  let currentPath = location.pathname;

  useEffect(() => {
    if(currentPath.startsWith("/")){
      currentPath = currentPath.substring(1);
    }
    setUrlPath(currentPath);
  }, [currentPath])

  const navigate = useNavigate()

  useEffect(() => {
    setMyToken(decryptData("userData", "object"))
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("userData")
    setMyToken(null)
    navigate("/")
    window.location.reload()
  }

  return (
    <>
      <header className="bg-white dark:bg-[#181818] mb-10 bottom-3">
        <nav className="px-10 py-5 flex items-center justify-between w-full" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-black dark:text-[#ffffff] text-lg">
                <span className="text-2xl font-mono">W</span>ebshine <span className="text-2xl font-mono">T</span>
                alents.
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          {myToken && myToken?.user?.role !== "admin" && (
            <div className="hidden lg:flex lg:gap-x-12">
              <Link to="/attendance" className={`text-sm font-semibold dark:text-[#ffffff] leading-6  ${urlPath == "attendance" ? "text-blue-400 dark:text-blue-400": "text-gray-900"}`}>
                Attendance
              </Link>
              <Link to="/tasks" className={`text-sm font-semibold dark:text-[#ffffff] leading-6  ${urlPath == "tasks" ? "text-blue-400 dark:text-blue-400": "text-gray-900"}`}>
                Tasks
              </Link>
              <Link to="/studyplan" className={`text-sm font-semibold dark:text-[#ffffff] leading-6  ${urlPath == "studyplan" ? "text-blue-400 dark:text-blue-400": "text-gray-900"}`}>
                Study Plan
              </Link>
              <Link to="#" className={`text-sm font-semibold dark:text-[#ffffff] leading-6  ${urlPath == "#" ? "text-blue-400 dark:text-blue-400": "text-gray-900"}`}>
                Leaderboard
              </Link>
              <Link to="#" className={`text-sm font-semibold dark:text-[#ffffff] leading-6  ${urlPath == "#" ? "text-blue-400 dark:text-blue-400": "text-gray-900"}`}>
                Task Tracker
              </Link>
            </div>
          )}
          {myToken !== null ? (
            <>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <span className="mr-6 mt-2">
                  <Switcher />
                </span>
                <Link to="/profile" className="mr-5">
                  <span className={`inline-block w-12 h-12 p-2 rounded-full ring-2 capitalize font-semibold text-2xl text-center ${urlPath == "profile" ? "ring-blue-500 dark:ring-blue-500 shadow-md text-blue-400 dark:text-blue-400":"ring-gray-300 dark:ring-gray-500 dark:text-white" }`}>
                    {myToken.user.username.charAt(0)}
                  </span>
                </Link>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="border border-1 rounded-sm mt-1 border-black dark:border-white px-5 py-2 ml-3 font-semibold leading-6 dark:text-white text-gray-900 hover:bg-[#3B81F6] hover:text-white hover:border-[#3B81F6] transform duration-500 ease-in-out"
                >
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center justify-center">
                <Link
                  to="/signup"
                  className="text-sm border border-1 rounded-sm border-black dark:border-white dark:text-white px-5 py-2 font-semibold leading-6 text-gray-900 hover:bg-[#3B81F6] hover:text-white hover:border-[#3B81F6] transform duration-500 ease-in-out"
                >
                  Sign Up
                </Link>
                <Link
                  to="/"
                  className="text-sm ml-2 border border-none border-black dark:text-white px-5 py-2 font-semibold leading-6 text-gray-900"
                >
                  Login
                </Link>
                <span className="">
                  <Switcher />
                </span>
              </div>
            </>
          )}
        </nav>
        {isMobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-[#404040] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link onClick={toggleMobileMenu} to="/" className="-m-1.5 p-1.5">
                  <span className="text-black text-lg dark:text-[#ffffff]">
                    <span className="text-2xl font-mono">W</span>ebshine <span className="text-2xl font-mono">T</span>
                    alents.
                  </span>
                </Link>
                <button onClick={toggleMobileMenu} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6 dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  {myToken !== null && (
                    <div className="space-y-2 py-6">
                      <Link
                        to="/attendance"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-[#ffffff] text-gray-900 hover:bg-gray-50 text-left"
                        onClick={toggleMobileMenu}
                      >
                        Attendance
                      </Link>
                      <Link
                        to="/tasks"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-[#ffffff] text-gray-900 hover:bg-gray-50 text-left"
                        onClick={toggleMobileMenu}
                      >
                        Tasks
                      </Link>
                      <Link
                        to="/studyplan"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-[#ffffff] text-gray-900 hover:bg-gray-50 text-left"
                        onClick={toggleMobileMenu}
                      >
                        Study Plan
                      </Link>
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-[#ffffff] text-gray-900 hover:bg-gray-50 text-left"
                        onClick={toggleMobileMenu}
                      >
                        Leaderboard
                      </Link>
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-[#ffffff] text-gray-900 hover:bg-gray-50 text-left"
                        onClick={toggleMobileMenu}
                      >
                        Task Tracker
                      </Link>
                    </div>
                  )}

                  {myToken !== null ? (
                    <>
                      <div>
                        <Link
                          to="/profile"
                          onClick={toggleMobileMenu}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-[#ffffff] hover:bg-gray-50 text-left"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/"
                          onClick={handleLogout}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-[#ffffff] hover:bg-gray-50 text-left"
                        >
                          Logout
                        </Link>
                        <span className="">
                          <Switcher />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="py-6">
                        <Link
                          to="/signup"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold dark:text-white leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={toggleMobileMenu}
                        >
                          Sign Up
                        </Link>
                        <Link
                          to="/"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold dark:text-white leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={toggleMobileMenu}
                        >
                          Login
                        </Link>
                        <span className="">
                          <Switcher />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
