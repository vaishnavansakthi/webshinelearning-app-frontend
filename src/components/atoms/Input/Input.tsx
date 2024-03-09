import { IInputProps } from "../../../types/input"

const Input = ({ type, placeholder, disabled, onChange, className, name }: IInputProps) => {
  return (
    <div className="mb-5  flex justify-center">
      <input
        type={type}
        className={` rounded-lg ${type === "checkbox" && "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"} bg-gray-50 border w-[400px] text-[16px] border-gray-300 focus:outline-blue-500 rounded-none text-gray-900 text-sm p-2.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        name={name}
        style={{ display: 'inline-block', verticalAlign: 'top', borderRadius: '5px' }} 
      />
    </div>
  )
}

export default Input
