"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import WorkoutCard from "./components/WorkoutCard";
import LoadingSpinner from "./components/LoadingSpinner";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error("Failed to fetch workouts", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const sortOptions = [
    { value: "duration", label: "Duration" },
    { value: "calories", label: "Calories" },
    { value: "rating", label: "Rating" },
  ];

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const activeSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || "Duration";

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="bg-[linear-gradient(135deg,#0a0a0a_0%,#0f1a00_50%,#0a0a0a_100%)] py-16 px-6 min-h-[calc(100vh-68px)] flex items-center">
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center text-center md:text-left">
          {/* Left content */}
          <div className="flex flex-col items-center md:items-start">
            {/* Eyebrow */}
            <span className="inline-block font-oswald text-[0.8rem] font-medium text-[#ccff00] tracking-[0.2em] border border-[#ccff0044] rounded px-3 py-1 mb-5 bg-[#ccff0011]">
              WORKOUT LIBRARY
            </span>

            {/* Main Heading */}
            <h1 className="font-oswald text-[clamp(2.4rem,5vw,4.2rem)] font-bold text-white leading-[1.1] tracking-[0.02em] m-0 mb-5">
              TRAIN WITH INTENT.{" "}
              <span className="text-[#ccff00]">LOG EVERY SET.</span>
            </h1>

            {/* Subtitle */}
            <p className="font-inter text-base text-[#a0a0a0] leading-[1.7] m-0 mb-8 max-w-[480px]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <a
              href="#library"
              className="inline-flex items-center gap-2.5 bg-[#ccff00] text-[#0a0a0a] font-oswald font-semibold text-base tracking-[0.1em] px-7 py-3.5 rounded-lg no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(204,255,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(204,255,0,0.45)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right: Banner image */}
          <div className="flex justify-center items-center relative">
            {/* Glow behind image */}
            <div className="absolute w-[340px] h-[340px] bg-[radial-gradient(circle,rgba(204,255,0,0.15)_0%,transparent_70%)] rounded-full blur-[40px]" />
            <Image
              src="/banner.png"
              alt="FitLog Gym Workout"
              width={480}
              height={480}
              className="object-contain relative z-10 drop-shadow-[0_20px_60px_rgba(204,255,0,0.15)] animate-[floatImg_4s_ease-in-out_infinite]"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== LIBRARY SECTION ===== */}
      <section id="library" className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <p className="font-oswald text-[0.8rem] font-medium text-[#ccff00] tracking-[0.2em] m-0 mb-2">
                ▬ EXERCISES
              </p>
              <h2 className="font-oswald text-[clamp(2rem,4vw,3rem)] font-bold text-white tracking-[0.03em] m-0 mb-2">
                THE LIBRARY
              </h2>
              <p className="text-[#777] text-[0.95rem] m-0 font-inter">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className={`flex items-center justify-between gap-2 bg-[#161616] border rounded-lg px-4 py-2.5 text-white font-inter text-sm cursor-pointer transition-colors duration-200 min-w-[170px] ${sortOpen ? 'border-[#ccff00]' : 'border-[#2a2a2a] hover:border-[#ccff00]'}`}
              >
                <span className="text-[#888] mr-1">Sort By:</span>
                <span className="font-semibold text-[#ccff00]">{activeSortLabel}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888"
                  strokeWidth="2"
                  className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute top-[calc(100%+6px)] right-0 bg-[#161616] border border-[#2a2a2a] rounded-lg overflow-hidden z-50 min-w-[170px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                      }}
                      className={`block w-full px-4 py-2.5 border-none cursor-pointer font-inter text-sm text-left transition-colors duration-150 ${
                        sortBy === opt.value
                          ? "bg-[#ccff0018] text-[#ccff00] font-semibold"
                          : "bg-transparent text-[#cccccc] font-normal hover:bg-[#ffffff0a]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Workout grid or loading */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes floatImg {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </>
  );
}
