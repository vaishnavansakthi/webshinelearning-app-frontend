

function SessionCard() {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#404040] shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold capitalize text-slate-800 dark:text-slate-100">Session Update</h2>
        </header>
        <div className="px-5 py-4 text-center">
          <div className="text-2xl max-md:text-3xl p-2 dark:text-white">
            Javascript Introduction and basic concepts
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-10">VS code, Github, Netlify 🎉</p>
          <p className="mt-5 text-[18px] max-md:text-[16px] dark:text-gray-200">8:30 PM to 10:00 PM</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-8">
            Join Session
          </button>
        </div>
      </div>
    )
  }
  
  export default SessionCard;
  
