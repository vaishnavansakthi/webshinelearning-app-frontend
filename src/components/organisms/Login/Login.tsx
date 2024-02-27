import { Button, Label, LinkText } from "../../atoms"
import { InputBlock } from "../../moleclues"

const Login = () => {
  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Button text="Sign in with Google" bgColor="bg-white" icon={<svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="google"><path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path><path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path><path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path><path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path></svg>} textColor="text-gray-400" varient="outline" />
              <div className="flex items-center justify-center my-6">
                <hr className="border-t border-gray-300 flex-grow" />
                <p className="mx-4 text-gray-400">or</p>
                <hr className="border-t border-gray-300 flex-grow" />
              </div>
              <form className="space-y-4 md:space-y-6" action="#">
                <InputBlock text="Your email" htmlFor="email" type="email" placeholder="name@company.com" className="text-gray-400" />
                <InputBlock text="Password" htmlFor="password" type="password" placeholder="••••••••" className="text-gray-400" />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label text="Remember me" htmlFor="remember" className="text-gray-400" />
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-white">
                    Forgot password?
                  </a>
                </div>
                <Button text="Login" color="primary" className="tracking-wide leading-normal" size="medium" />
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <LinkText href="/signup" text="Sign Up" className="tracking-wide leading-normal" />
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
