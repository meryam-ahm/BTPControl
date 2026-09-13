import React from "react";
import { UserRound, ClipboardList, Clock3, UserMinus } from "lucide-react";

const MENU_ITEMS = [
  { action: "profile", icon: UserRound, text: "View Profile" },
  { action: "tasks", icon: ClipboardList, text: "View Tasks" },
  { action: "attendance", icon: Clock3, text: "Attendance History" },
  { action: "remove", icon: UserMinus, text: "Remove from Project" },
];

const WorkerMenu = ({ worker, setOpenMenuId, onAction }) => {
  return (
    <div
      className="absolute right-0 top-7 z-50 w-52 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {MENU_ITEMS.map((item, index) => {
        const Icon = item.icon;
        const isRemoveAction = item.action === "remove";

        return (
          <React.Fragment key={item.action}>
            {index === 3 && (
              <div className="my-1.5 border-t border-gray-100" />
            )}

            <button
              onClick={() => {
                onAction(item.action, worker.id);
                setOpenMenuId(null);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition ${
                isRemoveAction
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.text}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WorkerMenu;