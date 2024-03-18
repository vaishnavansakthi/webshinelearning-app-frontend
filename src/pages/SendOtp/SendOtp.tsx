import React, { useState, useRef } from "react"
import { Alert, Button } from "../../components/atoms"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const SendOtp = () => {
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(""))
  const [message, setsMessage] = useState("")
  const navigate = useNavigate()
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null))

  function maskEmail(email: any) {
    let maskedEmail
    if (email) {
      const [localPart, domainPart] = email.split("@")
      const localPartLength = localPart.length
      const firstTwoChars = localPart.substring(0, 2)
      const lastTwoChars = localPart.substring(localPartLength - 1)
      const maskedLocalPart = firstTwoChars + "*******" + lastTwoChars
      maskedEmail = maskedLocalPart + "@" + domainPart
    }

    return maskedEmail
  }

  const handleChange = (index: number, value: string) => {
    if (value.length === 1 && index < otpDigits.length - 1) {
      const newOtpDigits = [...otpDigits]
      newOtpDigits[index] = value
      setOtpDigits(newOtpDigits)
      inputRefs.current[index + 1]?.focus()
    } else if (value.length === 1 && index === otpDigits.length - 1) {
      const newOtpDigits = [...otpDigits]
      newOtpDigits[index] = value
      setOtpDigits(newOtpDigits)
    } else if (value.length === 0 && index > 0) {
      const newOtpDigits = [...otpDigits]
      newOtpDigits[index] = value
      setOtpDigits(newOtpDigits)
      inputRefs.current[index - 1]?.focus()
    } else if (value.length === 0 && index === 0) {
      const newOtpDigits = [...otpDigits]
      newOtpDigits[index] = value
      setOtpDigits(newOtpDigits)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const otp = otpDigits.join("")
    console.log(otp)
    setOtpDigits(new Array(6).fill(""))
    const email = sessionStorage.getItem("userEmail")
    axios
      .post(
        "https://webshinelearning-app-backend.vercel.app/auth/verify-otp",
        { email: email, otp: otp },
        {
          headers: {
            "x-api-key": `${import.meta.env.VITE_X_API_Key}`,
          },
        },
      )
      .then(() => {
        navigate("/reset-password")
      })
      .catch((err: any) => {
        console.log(err)
        setsMessage(err.response.data.message)
      })
  }

  return (
    <div className="relative flex flex-col justify-center overflow-hidden py-10">
      <div className="relative bg-white dark:bg-[#404040] px-6 pt-10 pb-9 shadow-xl max-[600px]:w-[300px] mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl dark:text-[#ffffff]">
              <p>OTP Verify</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {maskEmail(sessionStorage.getItem("userEmail"))}</p>
            </div>
          </div>
          {message && <Alert message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-center justify-evenly mx-auto w-full">
              {otpDigits.map((digit, index) => (
                <div key={index} className="w-16 h-16 max-[600px]:w-10 max-[600px]:h-10">
                  <input
                    type="text"
                    value={digit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                    className={`w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 dark:border-gray-600 text-lg dark:text-[#ffffff] bg-white dark:bg-[#404040] focus:bg-gray-50 focus:ring-1 ring-blue-500`}
                    maxLength={1}
                    ref={(input) => (inputRefs.current[index] = input)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-5 mt-5">
              <div>
                <Button
                  color="primary"
                  text="Next"
                  type="submit"
                  className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 hover:bg-blue-600 border-none text-white text-xl shadow-sm`}
                />
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 dark:text-[#ffffff]">
                <p>Didn't receive code?</p>{" "}
                <Link
                  className="flex flex-row items-center text-blue-600"
                  to="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendOtp
