import { decryptData } from "../../../utils/security";

function getGreeting() {
  const currentTime = new Date().getHours();
  if (currentTime < 12) {
    return ['Good morning', '☀️'];
  } else if (currentTime < 18) {
    return ['Good afternoon', '🌞'];
  } else {
    return ['Good evening', '🌙'];
  }
}

function DashboardBanner() {
  const user = JSON.parse(decryptData('userData', null))
  const [greeting, emoji] = getGreeting();

  return (
    <div className="relative px-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      <div className="relative">
        <h1 className="text-2xl md:text-3xl capitalize text-slate-800 dark:text-slate-100 font-bold mb-1">{greeting}, {user.user.username} {emoji}</h1>
        <p className="dark:text-indigo-200">Here is what’s happening with your Course journey:</p>
      </div>
    </div>
  );
}

export default DashboardBanner;
