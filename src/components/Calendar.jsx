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

  // Empty spaces
  for (let i = 0; i < firstDay; i++) {
    dates.push("");
  }

  // Dates
  for (let i = 1; i <= totalDays; i++) {
    dates.push(i);
  }

  // 🎯 DYNAMIC HOLIDAYS FUNCTION
  const getHolidays = (month, year) => {
  const holidays = {};

  switch (month) {
    case 0: // January
      holidays[1] = { emoji: "🎉", name: "New Year" };
      holidays[26] = { emoji: "🇮🇳", name: "Republic Day" };
      break;

    case 1: // February
      holidays[14] = { emoji: "❤️", name: "Valentine's Day" };
      break;

    case 2: // March
      holidays[8] = { emoji: "🌸", name: "Women's Day" };
      break;

    case 3: // April
      holidays[22] = { emoji: "🌍", name: "Earth Day" };
      break;

    case 4: // May
      holidays[1] = { emoji: "🛠️", name: "Labour Day" };
      break;

    case 5: // June
      holidays[21] = { emoji: "🧘", name: "Yoga Day" };
      break;

    case 7: // August
      holidays[15] = { emoji: "🇮🇳", name: "Independence Day" };
      break;

    case 8: // September (Navratri approx)
      holidays[26] = { emoji: "💃", name: "Navratri" };
      break;

    case 9: // October
      holidays[2] = { emoji: "🕊️", name: "Gandhi Jayanti" };

      // Navratri (alternative year case)
      holidays[10] = { emoji: "💃", name: "Navratri" };
      break;

    case 10: // November (Diwali approx)
      holidays[12] = { emoji: "🪔", name: "Diwali" };
      holidays[14] = { emoji: "🧒", name: "Children's Day" };
      break;

    case 11: // December
      holidays[25] = { emoji: "🎄", name: "Christmas" };
      break;

    default:
      break;
  }

  return holidays;
};

  const holidays = getHolidays(month, year);

  // Click logic
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
          <div key={d} className="text-center">
            {d}
          </div>
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
              title={holidays[day]?.name || ""}
              className={`h-14 flex items-center justify-center rounded-xl cursor-pointer
              transition-all duration-300 font-medium relative

              ${isStart ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white scale-110 shadow-lg" : ""}
              ${isEnd ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-110 shadow-lg" : ""}
              ${isInRange(day) ? "bg-blue-200 dark:bg-blue-800 text-black dark:text-white" : ""}
              ${isPreview ? "bg-blue-100 dark:bg-blue-900" : ""}
              ${day ? "hover:bg-blue-300 dark:hover:bg-blue-700 hover:scale-105" : ""}
              `}
            >
              {day && (
                <div className="flex flex-col items-center">
                  {/* Date */}
                  <span>{day}</span>

                  {/* 🎯 Holiday marker */}
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
      </div>
    </div>
  );
}