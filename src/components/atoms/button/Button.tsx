import { IButtonProps } from "../../../types/button"

const Button = ({ text, color, size, disabled, varient, textColor = "text-white", icon, className, bgColor }: IButtonProps) => {
  return (
    <>
      <button
        className={`
        ${color === "primary"
            ? "bg-blue-500 hover:bg-blue-600"
            : color === "secondary"
              ? "bg-orange-400 hover:bg-orange-500"
              : color === "success"
                ? "bg-green-400 hover:bg-green-500"
                : color === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : `${bgColor}`
          }
         ${varient === "contained" ? "p-4 border-[1px] rounded-md" : varient === "outline" ? "p-4 border-[1px] border-gray-200 shadow-inner rounded-md" : ""}
         ${size === "large" ? "text-lg p-4" : size === "medium" ? "text-md p-2" : "text-sm p-1"}
         ${textColor} w-full font-medium text-lg rounded-lg px-6 py-2.5 text-center md:mr-5 mb-3 md:mb-0 inline-flex items-center justify-center tracking-wide ${className}
        `}
        disabled={disabled}
      >
        {icon && icon}
        {text}
      </button>
    </>
  )
}

export default Button
