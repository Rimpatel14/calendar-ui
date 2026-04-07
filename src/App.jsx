import { useState, useEffect } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Notes from "./components/Notes";
import { motion } from "framer-motion";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState("blue");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [note, setNote] = useState("");

  // 💾 Load notes
  useEffect(() => {
    const saved = localStorage.getItem("note");
    if (saved) setNote(saved);
  }, []);

  // 💾 Save notes
  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  // 🌙 Dark mode
 useEffect(() => {
  document.documentElement.className = dark ? "dark" : "";
}, [dark]);

  // 📅 Month controls
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const monthName = date.toLocaleString("default", { month: "long" });

  return (
   <div
  className={`min-h-screen flex items-center justify-center p-6 transition-all duration-500
  ${
    theme === "blue"
      ? "bg-gradient-to-br from-blue-300 to-indigo-500"
      : "bg-gradient-to-br from-orange-400 to-pink-500"
  }
  ${dark ? "bg-gray-900" : ""}
`}
>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-5xl backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] rounded-3xl overflow-hidden border transition-all duration-300
${dark ? "bg-gray-900 text-white border-gray-700" : "bg-white/70 border-white/40"}
`}
      >
        {/* Header */}
        <Header month={monthName} year={date.getFullYear()} />

        {/* Controls */}
        <div className="flex justify-between items-center px-6 py-3">
          <button onClick={prevMonth} className="hover:scale-125 transition">
            ⬅
          </button>

          <div className="flex gap-3">
            {/* Theme toggle */}
            <button
              onClick={() =>
                setTheme((prev) => (prev === "blue" ? "sunset" : "blue"))
              }
              className="px-3 py-1 rounded-lg bg-white/70 dark:bg-gray-700 text-black dark:text-white"
            >
              {theme === "blue" ? "🌊" : "🌅"}
            </button>

            {/* Dark mode */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          <button onClick={nextMonth} className="hover:scale-125 transition">
            ➡
          </button>
        </div>

        {/* Selected Range */}
        {startDate && endDate && (
          <div className="px-6 pb-2 text-sm text-blue-600 dark:text-blue-300">
            Selected: {startDate} → {endDate}
          </div>
        )}

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <Calendar
            currentDate={date}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <Notes note={note} setNote={setNote} />
        </div>
      </motion.div>
    </div>
  );
}