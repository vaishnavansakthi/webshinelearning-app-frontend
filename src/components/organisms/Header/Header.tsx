import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { decryptData } from "../../../utils/security"
import { Switcher } from "../../atoms"
import { IoLogOutOutline } from "react-icons/io5"
import { navHeader } from "../../../constant"
import { globalStateContext } from "../../../context/GlobalStateProvider"
import logo from "../../../assets/webshinelogo-mine.png"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [myToken, setMyToken] = useState(decryptData("userData", "object"))
  const [urlPath, setUrlPath] = useState<string>("")

  const { points } = useContext(globalStateContext)
  const location = useLocation()
  let currentPath = location.pathname

  useEffect(() => {
    const tokenExpirationTime = myToken?.expires_at
    if (tokenExpirationTime && new Date(tokenExpirationTime) < new Date()) {
      handleLogout()
    }
  }, [])

  useEffect(() => {
    if (currentPath.startsWith("/")) {
      currentPath = currentPath.substring(1)
    }
    setUrlPath(currentPath)
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

  console.log("pathname: " + currentPath)
  return (
    <>
      {currentPath === "/" ? (
        <div className="sticky top-0 left-0 w-full bg-gray-100 dark:bg-[#404040] dark:text-white shadow-md p-2 px-6 z-10 max-md:hidden">
          <div className="flex justify-between">
            <div>
              <h5 className="text-[14px] font-bold">Special Offer!</h5>
              <p>Enroll now and get 40% off!</p>
            </div>
            <div className="text-[14px]">
              Learn <span className="font-bold">HTML + CSS + JS + React + Redux + NodeJs + ExpressJs + MongoDB</span> at
              9,999/- Only.
              <button
                onClick={() => navigate("/booking")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
              >
                Book Now
              </button>
            </div>
            <div>
              <p>
                Contact:{" "}
                <a className="underline" href="tel:+919047609410">
                  +91 9047609410
                </a>
              </p>
              <p>
                Email:{" "}
                <a className="underline" href="mailto:webshinelearninginfo@webshinelearning.in">
                  webshinelearninginfo@webshinelearning.in
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <header className="bg-white dark:bg-[#181818] mb-10 bottom-3">
        <nav className="px-10 py-3 max-sm:px-2 flex items-center justify-between w-full" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/dashboard" className="-m-1.5 p-1.5">
              <span className="text-black dark:text-[#ffffff] text-lg">
                <img className="h-[55px]" src={logo} alt="logo" />
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
          {myToken && myToken?.user?.role === "user" ? (
            <div className="hidden lg:flex lg:gap-x-6">
              {navHeader &&
                navHeader?.map((nav: any) => {
                  return (
                    <>
                      {nav.role === "user" && (
                        <Link
                          to={nav.navlink}
                          key={nav.path}
                          className={`text-sm font-semibold dark:text-[#ffffff] leading-6  ${urlPath == nav.navMatch ? "text-blue-400 dark:text-blue-400" : "text-gray-900"}`}
                        >
                          {nav.navText}
                        </Link>
                      )}
                    </>
                  )
                })}
            </div>
          ) : (
            myToken &&
            myToken?.user?.role === "admin" && (
              <div className="hidden lg:flex lg:gap-x-6">
                {navHeader &&
                  navHeader?.map((nav: any) => {
                    return (
                      <>
                        {nav.role === "admin" && (
                          <Link
                            to={nav.navlink}
                            key={nav.path}
                            className={`text-sm font-semibold dark:text-[#ffffff] leading-6  ${urlPath == nav.navMatch ? "text-blue-400 dark:text-blue-400" : "text-gray-900"}`}
                          >
                            {nav.navText}
                          </Link>
                        )}
                      </>
                    )
                  })}
              </div>
            )
          )}
          {myToken !== null ? (
            <>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <span className="flex items-center mr-6 px-4 rounded-lg dark:text-white">
                  <svg
                    className="w-6 h-6 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-[16px] font-semibold">{points ?? null}</span>
                </span>
                <Link to="/profile" className="mr-5">
                  <span
                    className={`inline-block w-12 h-12 p-2 rounded-full ring-2 capitalize font-semibold text-2xl text-center ${urlPath == "profile" ? "ring-blue-500 dark:ring-blue-500 shadow-md text-blue-400 dark:text-blue-400" : "ring-gray-300 dark:ring-gray-500 dark:text-white"}`}
                  >
                    {myToken.user.username.charAt(0)}
                  </span>
                </Link>
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer justify-center items-center border border-1 rounded-md mt-1 border-black dark:border-white px-2 py-2 ml-3 font-semibold leading-6 dark:text-white text-gray-900 hover:bg-[#3B81F6] hover:text-white hover:border-[#3B81F6] transform duration-500 ease-in-out"
                >
                  <IoLogOutOutline size={"20px"} className="mr-2" />
                  <Link to="/">Log out</Link>
                </div>
              </div>
              <span className="ml-6 mt-2 max-lg:hidden">
                <Switcher />
              </span>
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
                  to="/login"
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
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-[#404040] px-2 py-3 sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link onClick={toggleMobileMenu} to="/dashbaord" className="-m-1.5 p-1.5">
                  <span className="text-black text-lg dark:text-[#ffffff]">
                  <img className="h-[55px]" src={logo} alt="logo" />
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
                  {myToken && myToken?.user?.role === "user" ? (
                    <div className="space-y-2 py-6">
                      {navHeader &&
                        navHeader?.map((nav: any) => {
                          return (
                            <>
                              {nav.role === "user" && (
                                <Link
                                  to={nav.navlink}
                                  key={nav.path}
                                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-[#ffffff] text-gray-900 text-left  ${urlPath == nav.navMatch ? "text-blue-400 dark:text-blue-400" : "text-gray-900"}`}
                                  onClick={toggleMobileMenu}
                                >
                                  {nav.navText}
                                </Link>
                              )}
                            </>
                          )
                        })}
                    </div>
                  ) : (
                    myToken &&
                    myToken?.user?.role === "admin" && (
                      <div className="space-y-2 py-6">
                        {navHeader &&
                          navHeader?.map((nav: any) => {
                            return (
                              <>
                                {nav.role === "admin" && (
                                  <Link
                                    to={nav.navlink}
                                    key={nav.path}
                                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-[#ffffff] text-gray-900 text-left  ${urlPath == nav.navMatch ? "text-blue-400 dark:text-blue-400" : "text-gray-900"}`}
                                    onClick={toggleMobileMenu}
                                  >
                                    {nav.navText}
                                  </Link>
                                )}
                              </>
                            )
                          })}
                      </div>
                    )
                  )}

                  {myToken !== null ? (
                    <>
                      <div>
                        <Link
                          to="/profile"
                          onClick={toggleMobileMenu}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-[#ffffff] text-left"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/"
                          onClick={handleLogout}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-[#ffffff] text-left"
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
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold dark:text-white leading-7 text-gray-900"
                          onClick={toggleMobileMenu}
                        >
                          Sign Up
                        </Link>
                        <Link
                          to="/login"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold dark:text-white leading-7 text-gray-900"
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
