export default function Header({ month, year }) {
  return (
    <div className="relative h-72">
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white">
        <p>{year}</p>
        <h2 className="text-2xl font-semibold">{month}</h2>
      </div>
    </div>
  );
}