import { ILinkText } from "../../../types/linktext"

const LinkText = ({ text = "vaishnavan", size = "medium", color, href, className }: ILinkText) => {
  return (
    <>
      <a
        style={{ color }}
        href={href}
        className={`${size === "large" ? "text-lg" : size === "medium" ? "text-md" : "text-sm"} font-medium text-primary-600 hover:underline ${className}`}
      >
        {text}
      </a>
    </>
  )
}

export default LinkText
