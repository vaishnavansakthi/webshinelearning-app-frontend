import { IButtonProps } from "../../types/button"

const Button = ({ text, color, size, disabled, varient, className }: IButtonProps) => {
  return (
    <>
      <button
        className={`
        ${
          color === "primary"
            ? "bg-blue-400 hover:bg-blue-300"
            : color === "secondary"
              ? "bg-orange-300 hover:bg-orange-200"
              : color === "success"
                ? "bg-green-400 hover:bg-green-300"
                : color === "error"
                  ? "bg-red-500 hover:bg-red-400"
                  : ""
        }
         ${varient === "contained" ? "p-4 border-[1px] border-black rounded-md" : varient === "outline" ? "p-4 border-[1px] border-black rounded-md" : ""}
         ${size === "large" ? "text-lg p-4" : size === "medium" ? "text-md p-2" : "text-sm p-1"}
         ${className}
        `}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  )
}

export default Button
