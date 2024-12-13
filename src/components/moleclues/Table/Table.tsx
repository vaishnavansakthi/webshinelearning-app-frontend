import { useState, useContext, useEffect } from "react"
import { ThreeDots } from "react-loader-spinner"
import dayjs from "dayjs"
import { loaderContext } from "../../../context/LoaderProvider"
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaRegEdit, FaPlusCircle, FaRegEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { decryptData } from "../../../utils/security"

const Table = ({
  data,
  columns,
  handleEdit,
  handleDelete,
  handleStatus,
  children,
  handleModal,
  handleView,
}: {
  data?: any
  columns?: any
  handleEdit?: any
  handleDelete?: any
  handleStatus?: any
  handleModal?: any
  handleView?: any
  children?: React.ReactNode
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const { isLoading } = useContext(loaderContext)
  const [isAdmin, setIsAdmin] = useState(false)
  const [manualPage, setManualPage] = useState("1")
  const rowsPerPage = 6

  useEffect(() => {
    const mytoken = JSON.parse(decryptData("userData", null))
    if (mytoken?.user?.role === "admin") {
      setIsAdmin(true)
    }
  }, [])

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setManualPage(pageNumber.toString()) // Sync manual input with current page
  }

  const handleManualPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualPage(e.target.value)
  }

  const handleManualPageSubmit = () => {
    const page = Math.max(1, Math.min(parseInt(manualPage) || 1, Math.ceil(data.length / rowsPerPage)))
    setCurrentPage(page)
    setManualPage(page.toString()) // Update the input field with the corrected value
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleManualPageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleManualPageSubmit();
    }
  };

  const filteredRows = data
    .sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || a.uploadedOn || a.date); // Replace with your actual date field
      const dateB = new Date(b.createdAt || b.uploadedOn || b.date);
      return dateB.getTime() - dateA.getTime(); // Sort latest first
    })
    .filter((row: any) =>
      Object.values(row).some((value: any) => {
        if (typeof value === "object" && value !== null) {
          const nestedValue = value.username;
          return nestedValue && nestedValue?.toLowerCase()?.includes(searchQuery?.toLowerCase());
        }
        return value?.toString()?.toLowerCase()?.includes(searchQuery.toLowerCase());
      })
    );

  const paginatedData = searchQuery.length > 0 ? filteredRows : data;
  const totalPages = Math.ceil((searchQuery.length > 0 ? filteredRows.length : data.length) / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = paginatedData.slice(indexOfFirstRow, Math.min(indexOfLastRow, paginatedData.length))

  const allowedPaths = ["/tasks", "/userattendance", "/attendance", "/manageuser", "/usertasks", "/leaderboard", "/uservideos", "/tasktracker", "/userleaderboard"]

  const searchData = currentRows;

  return (
    <>
      {children}
      <div className="flex justify-center max-sm:px-1.5 px-10">
        <div className="relative overflow-x-auto m-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <ThreeDots height="60" width="60" color={"lightblue"} />
            </div>
          ) : (
            <>
              {data.length > 0 && allowedPaths.includes(window.location.pathname) && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 dark:border-none dark:text-white dark:bg-[#404040] outline-none px-4 py-2 rounded-md max-sm:w-[220px] max-sm:px-2 max-sm:py-2 max-sm:text-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              )}
              <table className="w-full table-fixed text-left border-none min-w-[800px]">
                {searchData.length > 0 && (
                  <thead className="bg-blue-400 dark:bg-gray-700 rounded-lg text-base text-white font-semibold w-full">
                    <tr>
                      {columns.map((column: any, index: number) => (
                        <th
                          key={index}
                          className="py-3 px-3 text-white font-bold whitespace-nowrap text-left group max-sm:py-1 max-sm:px-1"
                        >
                          <span className="cursor-pointer pl-1 max-sm:text-[14px]">{column.label}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody className="bg-white dark:bg-[#404040] dark:text-[#ffffff]">
                  {searchData.map((rowData: any, rowIndex: number) => (
                    <tr className="capitalize" key={rowIndex}>
                      {columns.map((column: any, colIndex: number) => (
                        <td
                          key={colIndex}
                          className="py-4 px-5 font-normal text-base border-t dark:border-black whitespace-nowrap max-sm:text-[14px] max-sm:py-1 max-sm:px-1"
                          style={{
                            width: column.width || "auto",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={rowData[column.field]?.length > 20 && rowData[column.field]}
                        >
                          {column.field === "actions" ? (
                            <div>
                              {column.enable === "delete" ? (
                                <>
                                  <button className="rounded-md" onClick={() => handleDelete(rowData.id)}>
                                    <MdDelete className="text-red-400 hover:text-red-500" size="22px" />
                                  </button>
                                </>
                              ) : column.enable === "add" ? (
                                <>
                                  <button className="mr-2 rounded-md" onClick={() => handleModal(rowData.id)}>
                                    <FaPlusCircle
                                      className="text-green-400 hover:text-green-500"
                                      size="22px"
                                      color="green"
                                    />
                                  </button>
                                </>
                              ) : column.enable === "edit" ? (
                                <>
                                  <button className="mr-2 rounded-md" onClick={() => handleEdit(rowData.id)}>
                                    <FaRegEdit
                                      className="text-green-400 hover:text-green-500"
                                      size="22px"
                                      color="green"
                                    />
                                  </button>
                                </>
                              ) : column.enable === "delete,view,promote" ? (
                                <>
                                  <button className="mr-2 rounded-md" onClick={() => handleView(rowData.id)}>
                                    <FaRegEye
                                      className="text-blue-400 hover:text-blue-500"
                                      size="22px"
                                      color="#89CFF0"
                                    />
                                  </button>
                                  <button onClick={() => handleDelete(rowData.id)}>
                                    <MdDelete className="text-red-400 hover:text-red-500" size="22px" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="mr-2 rounded-md" onClick={() => handleEdit(rowData.id)}>
                                    <FaRegEdit className="text-green-400 hover:text-green-500" size="22px" />
                                  </button>
                                  <button onClick={() => handleDelete(rowData.id)}>
                                    <MdDelete className="text-red-400 hover:text-red-500" size="22px" />
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
                          ) : typeof rowData[column.field] === "object" ? (
                            rowData[column.field]?.username
                          ) : typeof rowData[column?.field] === "string" &&
                            rowData[column?.field]?.startsWith("https://") ? (
                            rowData[column?.field]?.startsWith("https://www.youtube.com/embed/") ? (
                              <iframe
                                width="220"
                                height="140"
                                src={rowData[column.field]}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <a
                                className="lowercase underline hover:text-blue-300"
                                href={rowData[column.field]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ maxWidth: "50px", whiteSpace: "pre-wrap" }}
                              >
                                {rowData[column.field]}
                              </a>
                            )
                          ) : rowData[column?.field] && rowData[column?.field] ? (
                            rowData[column.field]
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={columns.length} className="border-t dark:border-black"></td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {data.length > rowsPerPage && (
            <div className="mt-5">
              <div className="flex justify-between align-middle">
                <span className="mx-4 mt-2 text-gray-700 dark:text-[#ffffff] max-sm:text-[14px]">
                  Page  <input
                      type="text"
                      value={manualPage}
                      onChange={handleManualPageChange}
                      onKeyDown={handleManualPageKeyDown}
                      onBlur={handleManualPageSubmit}
                      className="mx-1 h-7 w-7 text-center border border-gray-700 border-none"
                    /> of {totalPages}
                </span>
                <div className="flex">
                  <div className={`flex mr-2 px-4 py-2  items-center ${currentPage === 1
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                    } dark:bg-gray-700 rounded-lg text-white max-sm:text-[14px]`}>
                    <FaLongArrowAltLeft />
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2"
                    >
                      Previous
                    </button>
                  </div>
                  <div className={`flex ml-2 px-4 py-1 items-center align-middle ${currentPage === totalPages
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                    } dark:bg-gray-700 rounded-lg text-white max-sm:text-[14px]`}>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2"
                    >
                      Next
                    </button>
                    <FaLongArrowAltRight />
                  </div>
                </div>
              </div>
            </div>
          )
          }
        </div>
      </div>
    </>
  )
}

export default Table
