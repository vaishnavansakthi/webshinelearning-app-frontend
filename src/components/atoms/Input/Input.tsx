import { useState } from "react";
import { IInputProps } from "../../../types/input"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({ type, placeholder, disabled, onChange, className, name, value }: IInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
    <input
      type={showPassword ? 'text' : type} 
      className={`rounded-lg ${
        type === 'checkbox' && 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600'
      } bg-gray-50 border max-[630px]:w-[295px] w-[380px] text-[16px] border-gray-300 focus:outline-blue-500 rounded-none text-gray-900 text-sm p-2.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      name={name}
      value={value}
      style={{ display: 'inline-block', verticalAlign: 'top', borderRadius: '5px' }}
    />
    {type === 'password' && ( 
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
      </div>
    )}
  </div>
  )
}

export default Input
