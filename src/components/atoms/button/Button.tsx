import { IButtonProps } from "../../../types/button"

const Button = ({ text, color, size, disabled, varient, textColor = "text-white", icon }: IButtonProps) => {
  return (
    <>
      <button
        className={`
        ${
          color === "primary"
            ? "bg-blue-500 hover:bg-blue-600"
            : color === "secondary"
              ? "bg-orange-400 hover:bg-orange-500"
              : color === "success"
                ? "bg-green-400 hover:bg-green-500"
                : color === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : ""
        }
         ${varient === "contained" ? "p-4 border-[1px] rounded-md" : varient === "outline" ? "p-4 border-[1px] border-black rounded-md" : ""}
         ${size === "large" ? "text-lg p-4" : size === "medium" ? "text-md p-2" : "text-sm p-1"}
         ${textColor} font-medium rounded-lg text-base px-6 py-2.5 text-center md:mr-5 mb-3 md:mb-0 inline-flex items-center justify-center
        `}
        disabled={disabled}
      >
        {icon && <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 17"
        >
          <path fill-rule="evenodd" d={icon} clip-rule="evenodd" />
        </svg>}
        {text}
      </button>
    </>
  )
}

export default Button
