import { IDropdownMenu } from "types/dropdownMenu"
import DropdownCards from "../DropdownCards/DropdownCards"

const DropdownMenu = ({
  className,
  onMouseEnter,
  onMouseLeave,
  title,
  description,
  paths,
  dropClassName,
}: IDropdownMenu) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl dark:text-white dark:bg-[#404040] bg-white shadow-lg ring-1 ring-gray-900/5"
    >
      {Array(5)
        .fill(0)
        .map(() => {
          return (
            <div className="p-4">
              <DropdownCards
                title={title}
                description={description}
                paths={paths}
                dropClassName={dropClassName}
                className={className}
              />
            </div>
          )
        })}
    </div>
  )
}

export default DropdownMenu
