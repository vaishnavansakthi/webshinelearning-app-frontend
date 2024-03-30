import { decryptData } from "../../../utils/security";

function BirthDayCard() {
  const user = JSON.parse(decryptData('userData', null));

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#404040] shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold capitalize text-slate-800 dark:text-slate-100">Hi, {user.user.username}</h2>
      </header>
      <div className="px-5 py-4 text-center">
        <div className="happy-birthday-animation text-4xl max-md:text-3xl p-2">Happy Birthday!</div>
        <p className="text-gray-600 dark:text-gray-300 mt-5">Today is a special day for you! 🎉</p>
        <p className="mt-2 text-[18px] max-md:text-[16px] dark:text-gray-200">Wishing you a fantastic birthday filled with joy and happiness! 🎂🎈</p>
      </div>
    </div>
  );
}

export default BirthDayCard;
