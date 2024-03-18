import { IdropdownCardsProps } from "types/dropdownCards"
import { DropContent, SvgIcon } from "../../atoms"

const DropdownCards = ({ className, dropClassName, paths, title, description }: IdropdownCardsProps) => {
  return (
    <>
      <div
        className={`group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 dark:hover:bg-[#181818] hover:bg-gray-50 ${dropClassName}`}
      >
        <SvgIcon className={className} paths={paths} />
        <DropContent title={title} description={description} />
      </div>
    </>
  )
}

export default DropdownCards
