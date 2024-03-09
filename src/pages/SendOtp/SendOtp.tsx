import { useState } from "react";
import { Button, Input } from "../../components/atoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SendOtp = () => {
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(''));

  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const otp = otpDigits.join('');
    const email = sessionStorage.getItem('userEmail')
    axios.post('https://webshinelearning-app-backend.vercel.app/auth/verify-otp', {email: email, otp: otp}, {
      headers: {
        'x-api-key': `${import.meta.env.VITE_X_API_Key}`
      }
    })
    .then((res: any) => {
      console.log(res)
      navigate("/reset-password")
    }).catch((err: any) => {
      console.log(err)
    })
    
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>OTP Verify</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@gmail.com</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-center justify-evenly mx-auto w-full">
              {otpDigits.map((digit, index) => (
                <div key={index} className="w-16 h-16 max-[600px]:w-12">
                  <Input
                    type="text"
                    value={digit}
                    onChange={(e: any) => handleChange(index, e.target.value)}
                    className={`w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-500`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <Button
                  color="primary"
                  text="Next"
                  type="submit"
                  className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 hover:bg-blue-600 border-none text-white text-sm shadow-sm`}
                />
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>{" "}
                <a
                  className="flex flex-row items-center text-blue-600"
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
