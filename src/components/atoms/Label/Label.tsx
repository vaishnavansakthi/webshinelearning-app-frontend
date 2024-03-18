import { ILabelProps } from "../../../types/label"

const Label = ({ text, htmlFor, labelClassName }: ILabelProps) => {
  return (
    <>
      <label htmlFor={htmlFor} className={`block mb-2 text-sm dark:text-[#ffffff] font-medium text-gray-900 text-left ${labelClassName}`}>
        {text}
      </label>
    </>
  )
}

export default Label
