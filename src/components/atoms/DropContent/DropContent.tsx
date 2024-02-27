import { IDropContentProps } from "types/dropContent"

const DropContent = ({ title, description }: IDropContentProps) => {
  return (
    <>
      <div className="flex-auto">
        <a href="#" className="block font-semibold text-gray-900">
          {title}
          <span className="absolute inset-0"></span>
        </a>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </>
  )
}

export default DropContent
