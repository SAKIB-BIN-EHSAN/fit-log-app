"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useFitLog } from "../context/FitLogContext";

export default function MyPlanPage() {
  const { todaysPlan, saved, removeFromPlan, removeFromSaved } = useFitLog();
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [sortOpen, setSortOpen] = useState(false);

  // Metrics for Today's Plan
  const totalExercises = todaysPlan.length;
  const totalMinutes = todaysPlan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = todaysPlan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const [doneItems, setDoneItems] = useState([]);

  function markAsDone(id, name) {
    if (doneItems.includes(id)) {
      toast.info("Already marked as done!");
      return;
    }
    setDoneItems((prev) => [...prev, id]);
    toast.success(`💪 "${name}" marked as done!`);
  }

  function handleRemovePlan(id, name) {
    removeFromPlan(id);
    setDoneItems((prev) => prev.filter((i) => i !== id));
    toast.info(`🗑️ "${name}" removed from plan.`);
  }

  function handleRemoveSaved(id, name) {
    removeFromSaved(id);
    toast.info(`🗑️ "${name}" removed from saved.`);
  }

  const currentList = activeTab === "plan" ? todaysPlan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const sortOptions = [
    { value: "duration", label: "Duration" },
    { value: "calories", label: "Calories" },
    { value: "rating", label: "Rating" },
  ];

  const activeSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || "Duration";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 min-h-[70vh]">
      {/* Page header */}
      <div className="mb-10">
        <p className="font-oswald text-[0.8rem] font-medium text-[#ccff00] tracking-[0.2em] m-0 mb-2">
          ▬ DASHBOARD
        </p>
        <h1 className="font-oswald text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white tracking-[0.03em] m-0 mb-2">
          MY PLAN
        </h1>
        <p className="text-[#777] text-[0.95rem] m-0 font-inter">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {[
          {
            label: "Exercises",
            value: totalExercises,
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            ),
          },
          {
            label: "Minutes",
            value: totalMinutes,
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            ),
          },
          {
            label: "Calories",
            value: totalCalories,
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
              </svg>
            ),
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 flex items-center gap-5 transition-colors duration-200 hover:border-[#ccff0044]"
          >
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] p-3 flex-shrink-0">
              {metric.icon}
            </div>
            <div>
              <p className="font-oswald text-3xl font-bold text-white m-0 leading-none">
                {metric.value}
              </p>
              <p className="font-inter text-[0.8rem] text-[#666] m-0 mt-1 tracking-[0.05em]">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs and Sort */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        {/* Tabs */}
        <div className="flex gap-0 bg-[#111111] border border-[#2a2a2a] rounded-[10px] p-1 w-fit">
          {[
            { value: "plan", label: `Today's Plan (${todaysPlan.length})` },
            { value: "saved", label: `Saved (${saved.length})` },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-2.5 border-none rounded-[7px] font-oswald text-[0.9rem] tracking-[0.05em] cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.value
                  ? "bg-[#ccff00] text-[#0a0a0a] font-bold"
                  : "bg-transparent text-[#777] font-medium hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
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

      {/* Content */}
      {sortedList.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-20 px-8 gap-4 text-center">
          <div className="w-[72px] h-[72px] bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-full flex items-center justify-center mb-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <h3 className="font-oswald text-2xl font-bold text-white tracking-[0.05em] m-0">
            NOTHING HERE YET
          </h3>
          <p className="text-[#666] text-[0.9rem] m-0 font-inter max-w-[340px]">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-[#0a0a0a] font-oswald font-semibold text-[0.9rem] tracking-[0.08em] px-6 py-3 rounded-lg no-underline mt-2 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            GO TO WORKOUTS
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedList.map((workout) => {
            const isDone = doneItems.includes(workout.id);
            return (
              <div
                key={workout.id}
                className={`border rounded-xl p-5 flex items-center gap-5 transition-colors duration-200 flex-wrap ${
                  isDone 
                    ? "bg-[#0d1a00] border-[#ccff0033]" 
                    : "bg-[#111111] border-[#2a2a2a]"
                }`}
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-[10px] overflow-hidden bg-[#0f0f0f] relative">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className={`object-cover ${isDone ? "grayscale-[50%]" : ""}`}
                    sizes="90px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-[150px]">
                  <h4 className={`font-oswald text-base font-semibold m-0 mb-1 tracking-[0.04em] flex items-center gap-2 ${isDone ? 'text-[#ccff00]' : 'text-white'}`}>
                    {workout.name.toUpperCase()}
                    {isDone && (
                      <span className="bg-[#ccff00] text-[#0a0a0a] text-[0.65rem] font-bold px-2 py-0.5 rounded tracking-[0.1em]">
                        DONE
                      </span>
                    )}
                  </h4>
                  <p className="text-[#666] text-[0.78rem] m-0 mb-2.5 font-inter">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 flex-wrap">
                    {[
                      {
                        icon: (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        ),
                        text: `${workout.duration} min`,
                      },
                      {
                        icon: (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2">
                            <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
                          </svg>
                        ),
                        text: `${workout.caloriesBurned} kcal`,
                      },
                      {
                        icon: (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5c518" stroke="#f5c518" strokeWidth="1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ),
                        text: `${workout.rating}`,
                      },
                    ].map((stat, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-[#888] text-[0.78rem] font-inter"
                      >
                        {stat.icon}
                        {stat.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 items-center flex-wrap w-full sm:w-auto justify-end sm:justify-start">
                  {/* View details */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-transparent border border-[#3a3a3a] rounded-[7px] text-[#cccccc] font-inter text-[0.8rem] font-medium no-underline transition-colors duration-200 whitespace-nowrap hover:border-[#ccff00] hover:text-[#ccff00]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Details
                  </Link>

                  {/* Mark as done (only in plan tab) */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(workout.id, workout.name)}
                      disabled={isDone}
                      className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-[7px] font-inter text-[0.8rem] font-medium transition-colors duration-200 whitespace-nowrap ${
                        isDone 
                          ? "bg-[#ccff0022] border-[#ccff0055] text-[#ccff00] cursor-not-allowed" 
                          : "bg-transparent border-[#3a3a3a] text-[#cccccc] cursor-pointer hover:border-[#22c55e] hover:text-[#22c55e]"
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {isDone ? "Done ✓" : "Mark Done"}
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? handleRemovePlan(workout.id, workout.name)
                        : handleRemoveSaved(workout.id, workout.name)
                    }
                    className="flex items-center justify-center w-[34px] h-[34px] bg-transparent border border-[#3a3a3a] rounded-[7px] text-[#666] cursor-pointer transition-colors duration-200 flex-shrink-0 hover:border-[#ef4444] hover:text-[#ef4444] hover:bg-[#ef444415]"
                    title="Remove"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
