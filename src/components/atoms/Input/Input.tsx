import { IInputProps } from "../../../types/input"
import { Field, ErrorMessage } from 'formik'

const Input = ({ type, placeholder, disabled, className, errorMessage, name }: IInputProps) => {
  return (
    <div className="mb-5">
      <Field
        type={type}
        id="email"
        className={`rounded-lg ${type === "checkbox" && "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 dark:bg-gray-700 dark:border-gray-600"} border w-full text-[16px] outline-none rounded-none text-gray-900 text-sm p-2.5 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        style={{ display: "inline-block", verticalAlign: "top", borderRadius: "5px" }}
        name={name}
      />
      <ErrorMessage name={errorMessage} component="div" className="text-red-500 mt-[4px] text-[12.5px] ml-1" />
    </div>
  )
}

export default Input
