function UserCard({ title, subTitle, count }: { title?: string; subTitle?: string; count?: number }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-[#404040] shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-4">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">{subTitle}</div>
        <div className="flex items-start mt-3">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{count}{count && subTitle === "Percentage" && " %"}</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
