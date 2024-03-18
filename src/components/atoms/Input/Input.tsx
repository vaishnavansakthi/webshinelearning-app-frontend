import { useState } from "react";
import { IInputProps } from "../../../types/input"
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import { CgDanger } from "react-icons/cg";
import { Field, useField } from "formik";

const Input = ({ type, placeholder, disabled, className, name, value, isErrors }: IInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field] = useField({ name, value });
  return (
    <div style={{ position: 'relative' }}>
    <Field
      type={showPassword ? 'text' : type} 
      className={`rounded-lg ${
        type === 'checkbox' && 'w-4 h-4 border border-blue-400 rounded bg-gray-50 focus:ring-3 outline-none dark:bg-gray-700 dark:border-gray-600'
      } bg-gray-50 border max-[630px]:w-[295px] w-[380px] dark:text-[#ffffff] dark:border text-[16px] rounded-none dark:outline-black text-gray-900 text-sm p-2.5 dark:bg-[#282828] dark:border-black focus:dark:border-black disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      style={{ display: 'inline-block', verticalAlign: 'top', borderRadius: '5px' }}
      {...field}
    />
    {type === 'password' ? ( 
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        onClick={() => setShowPassword(!showPassword)} 
      >
        {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />} 
      </div>):
       (<div
       style={{
         position: 'absolute',
         top: '50%',
         right: '10px',
         transform: 'translateY(-50%)',
         cursor: 'pointer',
       }}
       onClick={() => setShowPassword(!showPassword)} 
     >
      {isErrors  ? <CgDanger className="text-red-400" /> : field.value.length ? <FaCheck className="text-green-500" />: null}
     </div>
    )}
  </div>
  )
}

export default Input
