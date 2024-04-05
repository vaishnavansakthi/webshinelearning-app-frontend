const DashboardTable = ({ data, title, header }: { data: any; title: string; header: any }) => {
  return (
    <>
      <div className="col-span-8 max-lg:col-span-12 bg-white dark:bg-[#404040] shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-[#404040]">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              <thead className="text-xs uppercase text-black dark:text-gray-400 bg-slate-50 dark:bg-[#181818] dark:bg-opacity-50 rounded-sm">
                <tr>
                  {header &&
                    header.map((heading: any) => {
                      return (
                        <th
                          key={heading}
                          className="px-5 py-3 border-b text-left border-slate-100 dark:border-[#404040]"
                        >
                          {heading.label}
                        </th>
                      )
                    })}
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {data && data.slice(0, 5).map((item: any, index: number) => (
                  <tr key={index}>
                    {header.map((heading: any, index: number) => {
                      const valuePath = heading.value.split('.'); 
                      let displayValue = item; 
                      
                      valuePath.forEach((property: any) => {
                        displayValue = displayValue[property];
                      });

                      return (
                        <td key={index} className="p-2">
                          <div className="text-left">{displayValue}</div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardTable
