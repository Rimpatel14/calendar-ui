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
  const [loading, setLoading] = useState(true);

  // 💾 Load saved notes
  useEffect(() => {
    const saved = localStorage.getItem("note");
    if (saved) setNote(saved);
  }, []);

  // 💾 Save notes
  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  // 💎 Loading animation
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // 🌙 Dark mode apply to HTML
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // 📅 Month controls
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const monthName = date.toLocaleString("default", { month: "long" });

  // 💎 Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        theme === "blue"
  ? "bg-gradient-to-br from-blue-200 to-indigo-400"
  : "bg-gradient-to-br from-orange-300 to-pink-400"
      } dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] rounded-3xl overflow-hidden border border-white/40 dark:border-gray-700"
      >
        {/* Header */}
        <Header month={monthName} year={date.getFullYear()} />

        {/* Controls */}
        <div className="flex justify-between items-center px-6 py-3">
          <button
            onClick={prevMonth}
            className="hover:scale-125 transition"
          >
            ⬅
          </button>

          <div className="flex gap-3">
            {/* 🎨 Theme toggle */}
            <button
              onClick={() =>
                setTheme((prev) =>
                  prev === "blue" ? "sunset" : "blue"
                )
              }
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {theme === "blue" ? "🌊" : "🌅"}
            </button>

            {/* 🌙 Dark mode */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          <button
            onClick={nextMonth}
            className="hover:scale-125 transition"
          >
            ➡
          </button>
        </div>

        {/* 🎯 Date range preview */}
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