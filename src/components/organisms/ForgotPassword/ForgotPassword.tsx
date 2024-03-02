import { Button, LinkText } from "../../atoms"
import { InputBlock } from "../../moleclues"

const ForgotPassword = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" action="#">
              <InputBlock
                text="Enter Email Address"
                htmlFor="email"
                type="email"
                placeholder="name@company.com"
                className="text-gray-400"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="text-sm">
                    Back to <LinkText href="/" text="Login" className="tracking-wide leading-normal" />
                  </div>
                </div>
              </div>
              <Button text="Send" color="primary" className="tracking-wide leading-normal" size="medium" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
