import { motion } from "framer-motion";
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

  // Empty spaces before month starts
  for (let i = 0; i < firstDay; i++) {
    dates.push("");
  }

  // Actual days
  for (let i = 1; i <= totalDays; i++) {
    dates.push(i);
  }

  // Handle click
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

  // Range check
  const isInRange = (day) => {
    return startDate && endDate && day > startDate && day < endDate;
  };

  return (
    <div className="p-4">
      {/* Days */}
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-3">
        {days.map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-3">
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
              className={`h-12 flex items-center justify-center rounded-xl cursor-pointer
              transition-all duration-300 font-medium

              ${isStart ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white scale-110 shadow-lg" : ""}
              ${isEnd ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-110 shadow-lg" : ""}
              ${isInRange(day) ? "bg-blue-200 dark:bg-blue-800 text-black dark:text-white" : ""}
              ${isPreview ? "bg-blue-100 dark:bg-blue-900" : ""}
              ${day ? "hover:bg-blue-300 dark:hover:bg-blue-700 hover:scale-105" : ""}
              `}
            >
              {day}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}