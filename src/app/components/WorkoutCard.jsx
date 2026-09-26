import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
  const { id, name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="block no-underline bg-[#161616] border border-[#2a2a2a] rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#ccff00] hover:shadow-[0_8px_32px_rgba(204,255,0,0.12)] group"
    >
      {/* Image */}
      <div className="relative w-full pt-[60%] bg-[#0f0f0f]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-[1.1rem]">
        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-[#ccff00] text-[#0a0a0a] border border-[#ccff0033] rounded-full px-2 py-0.5 text-[0.7rem] font-oswald font-medium tracking-[0.08em]"
            >
              {group.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-oswald text-[1.1rem] font-semibold text-white tracking-[0.04em] m-0 mb-1.5">
          {name.toUpperCase()}
        </h3>

        {/* Equipment */}
        <p className="text-[#777] text-[0.8rem] m-0 mb-3 font-inter flex items-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          {equipment}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 pt-2.5 border-t border-[#2a2a2a]">
          {/* Duration */}
          <span className="flex items-center gap-1 text-[#999] text-[0.78rem] font-inter">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {duration} min
          </span>

          {/* Calories */}
          <span className="flex items-center gap-1 text-[#999] text-[0.78rem] font-inter">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            {caloriesBurned} kcal
          </span>

          {/* Rating */}
          <span className="flex items-center gap-1 text-[#999] text-[0.78rem] font-inter ml-auto">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f5c518" stroke="#f5c518" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
