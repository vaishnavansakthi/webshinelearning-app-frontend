import { ILabelProps } from "../../../types/label"

const Label = ({ text, htmlFor, className }: ILabelProps) => {
  return (
    <>
      <label htmlFor={htmlFor} className={`block mb-2 text-sm font-medium text-gray-900 text-left ${className}`}>
        {text}
      </label>
    </>
  )
}

export default Label
