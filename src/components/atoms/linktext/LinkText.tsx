import { ILinkText } from "../../../types/linktext"

export const LinkText = ({ text = "vaishnavan", size = "medium", color, href }: ILinkText) => {
  return (
    <>
      <a
        style={{ color }}
        href={href}
        className={`${size === "large" ? "text-lg" : size === "medium" ? "text-md" : "text-sm"} underline`}
      >
        {text}
      </a>
    </>
  )
}
