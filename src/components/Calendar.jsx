import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Calendar({
  currentDate,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const [hovered, setHovered] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

  const dates = [];

  for (let i = 0; i < firstDay; i++) dates.push("");
  for (let i = 1; i <= totalDays; i++) dates.push(i);

  // 🎯 FULL HOLIDAY SYSTEM
  const getHolidays = (month) => {
    const h = {};
    switch (month) {
      case 0:
        h[1] = { emoji: "🎉", name: "New Year" };
        h[26] = { emoji: "🇮🇳", name: "Republic Day" };
        break;
      case 1:
        h[14] = { emoji: "❤️", name: "Valentine's Day" };
        break;
      case 2:
        h[8] = { emoji: "🌸", name: "Women's Day" };
        break;
      case 3:
        h[22] = { emoji: "🌍", name: "Earth Day" };
        break;
      case 4:
        h[1] = { emoji: "🛠️", name: "Labour Day" };
        break;
      case 5:
        h[21] = { emoji: "🧘", name: "Yoga Day" };
        break;
      case 7:
        h[15] = { emoji: "🇮🇳", name: "Independence Day" };
        break;
      case 8:
        h[26] = { emoji: "💃", name: "Navratri" };
        break;
      case 9:
        h[2] = { emoji: "🕊️", name: "Gandhi Jayanti" };
        h[10] = { emoji: "💃", name: "Navratri" };
        break;
      case 10:
        h[12] = { emoji: "🪔", name: "Diwali" };
        h[14] = { emoji: "🧒", name: "Children's Day" };
        break;
      case 11:
        h[25] = { emoji: "🎄", name: "Christmas" };
        break;
      default:
        break;
    }
    return h;
  };

  const holidays = getHolidays(month);

  const handleClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day > startDate) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const isInRange = (day) => {
    return startDate && endDate && day > startDate && day < endDate;
  };

  const rangeCount =
    startDate && endDate ? endDate - startDate + 1 : 0;

  return (
    <div className="p-4">

      {/* 🎯 RANGE COUNT */}
      {startDate && endDate && (
        <div className="mb-3 text-sm text-blue-600 dark:text-blue-300">
          Selected: {startDate} → {endDate} ({rangeCount} days)
        </div>
      )}

      {/* Days */}
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-3">
        {days.map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      {/* 🎥 MONTH TRANSITION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={month}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-7 gap-3"
        >
          {dates.map((day, i) => {
            const isStart = day === startDate;
            const isEnd = day === endDate;

            const isPreview =
              startDate &&
              !endDate &&
              hovered &&
              day > startDate &&
              day <= hovered;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHovered(day)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => day && handleClick(day)}
                title={holidays[day]?.name || ""}
                className={`h-14 flex items-center justify-center rounded-xl cursor-pointer
                transition-all duration-300 font-medium

                ${isStart ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white scale-110 shadow-lg" : ""}
                ${isEnd ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-110 shadow-lg" : ""}
                ${isInRange(day) ? "bg-blue-200 dark:bg-blue-800 text-black dark:text-white" : ""}
                ${isPreview ? "bg-blue-100 dark:bg-blue-900" : ""}
                ${day ? "hover:bg-blue-300 dark:hover:bg-blue-700 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.7)]" : ""}
                `}
              >
                {day && (
                  <div className="flex flex-col items-center">
                    <span>{day}</span>

                    {holidays[day] && (
                      <span className="text-[10px] mt-1">
                        {holidays[day].emoji}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}