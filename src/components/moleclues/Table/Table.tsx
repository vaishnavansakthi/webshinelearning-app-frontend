import { useState, useEffect, useContext } from "react"
import { ThreeDots } from "react-loader-spinner"
import dayjs from "dayjs"
import { loaderContext } from "../../../context/LoaderProvider"

const Table = ({
  data,
  columns,
  handleEdit,
  handleDelete,
  handleStatus,
  children,
}: {
  data?: any
  columns?: any
  handleEdit?: any
  handleDelete?: any
  handleStatus?: any
  children?: React.ReactNode
}) => {
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(sessionStorage.getItem("currentPage") || "1")
  })
  const { isLoading } = useContext(loaderContext)
  const rowsPerPage = 6

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage.toString())
  }, [currentPage])

  const totalPages = Math.ceil(data.length / rowsPerPage)

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = data.slice(indexOfFirstRow, Math.min(indexOfLastRow, data.length))

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="flex justify-center px-24 max-sm:px-4">
      <div className="relative overflow-x-auto m-auto">
        {children}
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <ThreeDots height="60" width="60" color={"lightblue"} />
          </div>
        ) : (
          <table className="text-left font-inter border-separate border-spacing-y-0 border dark:border-black">
            <thead className="bg-blue-400 dark:bg-gray-700 rounded-lg text-base text-white font-semibold w-full">
              <tr>
                {columns.map((column: any, index: number) => (
                  <th
                    key={index}
                    className="py-3 px-3 text-white font-bold whitespace-nowrap group max-sm:py-1 max-sm:px-1"
                  >
                    <span className="cursor-pointer pl-1 max-sm:text-[12px]">{column.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#404040] dark:text-[#ffffff]">
              {currentRows.map((rowData: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {columns.map((column: any, colIndex: number) => (
                    <td
                      key={colIndex}
                      className="py-4 px-5 font-normal text-base border-t dark:border-black whitespace-nowrap max-sm:text-[12px] max-sm:py-1 max-sm:px-1"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {column.field === "actions" ? (
                        <div>
                          {column.enable === "delete" ? (
                            <>
                              <button
                                className="w-[80px] h-[35px] border dark:border-gray-50 dark:hover:bg-gray-700 dark:hover:border-black border-gray-500 rounded-md"
                                onClick={() => handleDelete(rowData.id)}
                              >
                                Delete
                              </button>
                            </>
                          ) : column.enable === "edit" ? (
                            <>
                              <button
                                className="w-[80px] h-[35px] border dark:border-gray-50 dark:hover:bg-gray-700 dark:hover:border-black border-gray-500  mr-2 rounded-md"
                                onClick={() => handleEdit(rowData.id)}
                              >
                                Edit
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className=" w-[80px] h-[35px] border dark:border-gray-50 dark:hover:bg-gray-700 dark:hover:border-black border-gray-500  mr-2 rounded-md"
                                onClick={() => handleEdit(rowData.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="mt-2 w-[80px] h-[35px] border dark:border-gray-50 dark:hover:bg-gray-700 dark:hover:border-black border-gray-500 rounded-md"
                                onClick={() => handleDelete(rowData.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      ) : (column.label === "Uploaded On" || column.label === "Date") &&
                        rowData[column.field] !== null ? (
                        dayjs(rowData[column.field]).format("MMM D, YYYY")
                      ) : typeof rowData[column.field] === "boolean" ? (
                        rowData[column.field] ? (
                          <button
                            onClick={() => handleStatus(rowData.id)}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                          >
                            {column.trueValue}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatus(rowData.id)}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                          >
                            {column.falseValue}
                          </button>
                        )
                      ) : rowData[column.field].startsWith("https://") ? (
                        <a
                          className="lowercase underline hover:text-blue-300"
                          href={rowData[column.field]}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ maxWidth: "50px", whiteSpace: "pre-wrap" }}
                        >
                          {rowData[column.field]}
                        </a>
                      ) : (
                        rowData[column.field]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td colSpan={columns.length} className="border-t dark:border-black"></td>
              </tr>
            </tbody>
          </table>
        )}
        {data.length > 4 && (
          <div className="mt-5">
            <div className="flex justify-center align-middle">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 px-4 py-2 bg-blue-400 dark:bg-gray-700 rounded-lg text-white max-sm:text-[12px]"
              >
                Previous
              </button>
              <span className="mx-4 mt-2 text-gray-700 dark:text-[#ffffff] max-sm:text-[12px]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2 px-4 py-2 bg-blue-400 dark:bg-gray-700 rounded-lg text-white max-sm:text-[12px]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Table
