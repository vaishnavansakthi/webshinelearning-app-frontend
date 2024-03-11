import { useState } from "react"
import { Button, LinkText } from "../../components/atoms"
import { InputBlock } from "../../components/moleclues"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post('https://webshinelearning-app-backend.vercel.app/auth/forgot-password', {email: email}, {
      headers: {
        'x-api-key': `${import.meta.env.VITE_X_API_Key}`
      }
    })
    .then(() => {
      sessionStorage.setItem('userEmail', email);
      setEmail(email)
      navigate("/verify-otp")
    }).catch((err: any) => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputBlock
                text="Enter Email Address"
                htmlFor="email"
                type="email"
                placeholder="name@company.com"
                className="text-gray-400"
                name="email"
                onChange={handleChange}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="text-sm">
                    Back to <LinkText href="/" text="Login" className="tracking-wide leading-normal" />
                  </div>
                </div>
              </div>
              <Button type="submit" text="Send" color="primary" className="tracking-wide leading-normal" size="medium" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
