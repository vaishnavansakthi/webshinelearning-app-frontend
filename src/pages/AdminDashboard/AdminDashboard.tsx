/* eslint-disable react-refresh/only-export-components */
import withProtectedRoute from "../../hoc/ProductedRoute"
import { useEffect, useState, useMemo } from "react"
import { getAllUserData } from "../../services/adminDashboard.services"

const AdminDashboard = () => {
  const [userData, setUserData] = useState<any>([])

  useEffect(() => {
    try {
      const res = getAllUserData()
      res.then((data) => {
        setUserData(data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [activeColumn, setActiveColumn] = useState(["Price"]);
  const [sortingColumn, setSortingColumn] = useState(["Price"]);

  const sortByColumn = (column: any) => {
    if (sortingColumn?.includes(column)) {
      const sortData = userData
        .slice()
        .sort((a: any, b: any) =>
          b[column].toString().localeCompare(a[column].toString())
        );
      setSortingData(sortData);
      setSortingColumn([]);
    } else {
      const sortData = userData
        .slice()
        .sort((a: any, b: any) =>
          a[column].toString().localeCompare(b[column].toString())
        );
      setSortingData(sortData);
      setSortingColumn([`${column}`]);
    }
    setActiveColumn([`${column}`]);
  };

  const [sortingData, setSortingData] = useState(userData);
  const [selectAll, setSelectAll] = useState(false);
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : sortingData.map((item: any) => item.id));
  };
  const toggleSelectRow = (id: any) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId: any) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  useMemo(() => {
    const sortedProducts = userData.slice().sort((a: any, b: any) => a.Price - b.Price);
    setSortingData(sortedProducts);
  }, [userData]);

  

  return (
    <div className="h-full flex flex-col items-center justify-center py-4 sm:py-10 gap-12">
      <div className="w-full max-w-4xl px-2">
        <h1 className="text-2xl font-medium">
        </h1>
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-0 borer ">
            <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
              <tr className="">
                <th className="py-4 h-full flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 cursor-pointer ${
                        activeColumn?.includes("username")
                          ? "text-black"
                          : "text-[#BCBDBE] group-hover:text-black rotate-180"
                      } ${
                        sortingColumn?.includes("username")
                          ? "rotate-180"
                          : "rotate-0"
                      }
           `}
                      onClick={() => sortByColumn("username")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span
                      className="cursor-pointer pl-1"
                      onClick={() => sortByColumn("username")}
                    >
                      Username
                    </span>
                  </div>
                </th>
                <th className="py-3 px-3 flex items-center text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                  <svg
                    className={`w-4 h-4 cursor-pointer ${
                      activeColumn?.includes("email")
                        ? "text-black"
                        : "text-[#BCBDBE] group-hover:text-black rotate-180"
                    } ${
                      sortingColumn?.includes("email")
                        ? "rotate-180"
                        : "rotate-0"
                    } `}
                    onClick={() => sortByColumn("email")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span
                    className="cursor-pointer pl-1"
                    onClick={() => sortByColumn("email")}
                  >
                    Email
                  </span>
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 cursor-pointer ${
                        activeColumn?.includes("mobileNumber")
                          ? "text-black"
                          : "text-[#BCBDBE] group-hover:text-black rotate-180"
                      } ${
                        sortingColumn?.includes("mobileNumber")
                          ? "rotate-180"
                          : "rotate-0"
                      } `}
                      onClick={() => sortByColumn("mobileNumber")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span
                      className="cursor-pointer pl-1"
                      onClick={() => sortByColumn("mobileNumber")}
                    >
                      Mobile Number
                    </span>
                  </div>
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                  Role
                </th>
                <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
                  <svg
                    className={`w-4 h-4 cursor-pointer  ${
                      sortingColumn?.includes("Price")
                        ? "rotate-180"
                        : "rotate-0"
                    } ${
                      activeColumn?.includes("Price")
                        ? "text-black"
                        : "text-[#BCBDBE] group-hover:text-black rotate-180"
                    }`}
                    onClick={() => sortByColumn("Price")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span
                    className="cursor-pointer pl-1"
                    onClick={() => sortByColumn("Price")}
                  >
                    Status
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortingData?.map((data: any, index: number) => (
                <tr key={index}>
                  <td className="py-9 px-3 text-base font-normal flex items-center justify-center h-full border-t">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer"
                      checked={selectedRows.includes(data.id)}
                      onChange={() => toggleSelectRow(data.id)}
                    />
                  </td>
                  <td className="py-2 px-3 font-normal text-base border-t whitespace-nowrap capitalize">
                    {data?.username}
                  </td>
                  <td className="py-2 px-3 font-normal text-base border-t whitespace-nowrap">
                    {data?.email}
                  </td>
                  <td className="py-2 px-3 text-base font-normal border-t whitespace-nowrap">
                    {data?.mobileNumber}
                  </td>
                  <td className="py-2 px-3 text-base font-normal border-t min-w-[250px] capitalize">
                    {data?.role}
                  </td>
                  <td className="py-5 px-4 text-base font-normal border-t">
                    {data.isActivate ? 'Member' : 'Activate'}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="border-t"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default withProtectedRoute(AdminDashboard)
