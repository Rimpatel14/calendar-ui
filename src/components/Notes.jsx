export default function Notes({ note, setNote }) {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-xl">
      <h3 className="text-sm font-semibold mb-3">Notes</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full h-48 p-4 rounded-2xl border border-gray-300 dark:border-gray-700 outline-none text-sm 
focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-inner bg-white dark:bg-gray-800 text-black dark:text-white"
      />
    </div>
  );
}