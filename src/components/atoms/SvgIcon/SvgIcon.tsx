import { ISvgIconProps } from "types/svgIcon"

const SvgIcon = ({ className, paths }: ISvgIconProps) => {
  return (
    <>
      <div
        className={`flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white ${className}`}
      >
        <svg
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          {paths?.map((path, index) => (
            <path key={index} strokeLinecap={path.strokeLinecap} strokeLinejoin={path.strokeLinejoin} d={path.d} />
          ))}
        </svg>
      </div>
    </>
  )
}

export default SvgIcon
