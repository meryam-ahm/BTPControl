import { IoNotificationsOutline } from "react-icons/io5";

export default function NotificationIcon() {
  return (
    <button className="relative">
      <IoNotificationsOutline className="text-gray-700"size={32}  />
      <span className="absolute  -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        3
      </span> 
    </button>
  );
}