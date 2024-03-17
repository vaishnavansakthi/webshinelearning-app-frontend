import { Link } from "react-router-dom"
import { ILinkText } from "../../../types/linktext"

const LinkText = ({ text = "vaishnavan", size = "medium", color, href, className }: ILinkText) => {
  return (
    <>
      <Link
        style={{ color }}
        to={href}
        className={`${size === "large" ? "text-lg" : size === "medium" ? "text-md" : "text-sm"} font-medium text-primary-600 hover:underline ${className}`}
      >
        {text}
      </Link>
    </>
  )
}

export default LinkText
