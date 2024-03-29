import { Link } from "react-router-dom"
import { IDropContentProps } from "types/dropContent"

const DropContent = ({ title, description }: IDropContentProps) => {
  return (
    <>
      <div className="flex-auto">
        <Link to="#" className="block font-semibold dark:text-white text-gray-900">
          {title}
          <span className="absolute inset-0"></span>
        </Link>
        <p className="mt-1 text-gray-600 dark:text-white">{description}</p>
      </div>
    </>
  )
}

export default DropContent
