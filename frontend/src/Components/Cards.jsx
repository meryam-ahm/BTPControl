import {
  MdReportProblem,
  MdTaskAlt,
} from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { FaFolderOpen } from "react-icons/fa";
import { HiPlay } from "react-icons/hi";
import { BsPauseCircleFill } from "react-icons/bs";
import { TbClockExclamation } from "react-icons/tb";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Cards() {
  const [cards, setCards] = useState([]);

  const iconMap = {
    "Total Projects": FaFolderOpen,
    Active: HiPlay,
    "On Hold": BsPauseCircleFill,
    Delayed: TbClockExclamation,
    Completed: MdTaskAlt,
    "Total Budget": IoWalletOutline,
    "Open Issues": MdReportProblem,
  };

  const styleMap = {
    "Total Projects": {
      icon: "bg-blue-500 text-white",
      glow: "group-hover:shadow-blue-500/20",
      accent: "bg-blue-500",
    },
    Active: {
      icon: "bg-emerald-500 text-white",
      glow: "group-hover:shadow-emerald-500/20",
      accent: "bg-emerald-500",
    },
    "On Hold": {
      icon: "bg-amber-400 text-white",
      glow: "group-hover:shadow-amber-400/20",
      accent: "bg-amber-400",
    },
    Delayed: {
      icon: "bg-orange-500 text-white",
      glow: "group-hover:shadow-orange-500/20",
      accent: "bg-orange-500",
    },
    Completed: {
      icon: "bg-indigo-500 text-white",
      glow: "group-hover:shadow-indigo-500/20",
      accent: "bg-indigo-500",
    },
    "Total Budget": {
      icon: "bg-violet-500 text-white",
      glow: "group-hover:shadow-violet-500/20",
      accent: "bg-violet-500",
    },
    "Open Issues": {
      icon: "bg-red-500 text-white",
      glow: "group-hover:shadow-red-500/20",
      accent: "bg-red-500",
    },
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/engineer/dashboard/stats")
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {cards.map((card, index) => {
        const Icon = iconMap[card.title];

        const styles =
          styleMap[card.title] || {
            icon: "bg-slate-700 text-white",
            glow: "group-hover:shadow-slate-500/20",
            accent: "bg-slate-500",
          };

        return (
          <div
            key={index}
            className={`
              group relative overflow-hidden
              bg-white
              border border-slate-200
              rounded-2xl
              p-4
              min-h-[132px]
              shadow-sm
              ${styles.glow}
              hover:-translate-y-1
              hover:shadow-xl
              transition-all duration-300
            `}
          >
            <div
              className={`
                absolute top-0 left-0
                w-full h-[3px]
                ${styles.accent}
                opacity-70
                group-hover:opacity-100
                transition
              `}
            />

            <div className="
              absolute -right-7 -top-7
              w-20 h-20
              rounded-full
              bg-slate-50
              group-hover:scale-150
              transition-transform duration-500
            " />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div
                  className={`
                    w-10 h-10
                    rounded-xl
                    flex items-center justify-center
                    shadow-sm
                    group-hover:scale-110
                    transition-transform duration-300
                    ${styles.icon}
                  `}
                >
                  {Icon && <Icon size={19} />}
                </div>

                <span className="text-[10px] font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {card.title}
                </p>

                <p className="text-2xl font-black tracking-tight text-slate-900 mt-0.5">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}