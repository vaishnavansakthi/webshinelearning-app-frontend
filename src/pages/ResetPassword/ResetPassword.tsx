import { useState } from "react"
import { Button, LinkText } from "../../components/atoms"
import { InputBlock } from "../../components/moleclues"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const initialValues = {
  password: '',
  newPassword: ''
}

const ResetPassword = () => {
  const [passwordData, setPasswordData] = useState(initialValues);

  const navigate = useNavigate()

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    
    if(passwordData.password === passwordData.newPassword){
      const email = sessionStorage.getItem('userEmail')
      axios.post('https://webshinelearning-app-backend.vercel.app/auth/reset-password', {email: email, newPassword: passwordData.newPassword}, {
        headers: {
          'x-api-key': `${import.meta.env.VITE_X_API_Key}`
        }
      })
      .then((res: any) => {
        console.log(res)
        navigate("/")
      }).catch((err: any) => {
        console.log(err)
      })
    }else{
      console.log("password not matching...")
    }
   
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:p-2 max-w-[340px] sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputBlock
                text="Enter New Password"
                htmlFor="newPassword"
                type="password"
                placeholder="At least 8 digits"
                className="text-gray-400"
                name="password"
                onChange={handleChange}
              />
              <InputBlock
                text="Confirm Password"
                htmlFor="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="text-gray-400"
                name="newPassword"
                onChange={handleChange}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="text-sm">
                    Back to <LinkText href="/" text="Login" className="tracking-wide leading-normal" />
                  </div>
                </div>
              </div>
              <Button type="submit" text="Reset" color="primary" className="tracking-wide leading-normal" size="medium" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
