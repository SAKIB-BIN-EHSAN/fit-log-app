"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useFitLog } from "../../context/FitLogContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved, isInPlan, isInSaved, todaysPlan } = useFitLog();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error("Failed to fetch workout", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading workout details…" />;

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-12">
        <h2 className="font-oswald text-[2rem] text-white m-0">
          WORKOUT NOT FOUND
        </h2>
        <Link
          href="/"
          className="text-[#ccff00] font-inter no-underline border border-[#ccff00] px-5 py-2.5 rounded-lg"
        >
          ← Back to Library
        </Link>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const planFull = todaysPlan.length >= 5;

  function handleAddToPlan() {
    if (inPlan) {
      toast.info("Already in today's plan!");
      return;
    }
    if (planFull) {
      toast.error("Plan is full! Max 5 lifts for today.");
      return;
    }
    const success = addToPlan(workout);
    if (success) {
      toast.success(`✅ "${workout.name}" added to today's plan!`);
    }
  }

  function handleSave() {
    if (inSaved) {
      toast.info("Already saved for later!");
      return;
    }
    const success = addToSaved(workout);
    if (success) {
      toast.success(`🔖 "${workout.name}" saved for later!`);
    }
  }

  const difficultyColor =
    workout.difficulty === "Beginner"
      ? "text-[#22c55e]"
      : workout.difficulty === "Intermediate"
        ? "text-[#f59e0b]"
        : "text-[#ef4444]";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[#777] font-inter text-[0.875rem] no-underline mb-10 transition-colors duration-200 hover:text-[#ccff00]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Library
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT — Image */}
        <div className="top-[88px] bg-[#111111] rounded-2xl overflow-hidden border border-[#2a2a2a]">
          <div className="relative w-full pt-[100%]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* RIGHT — Details */}
        <div>
          {/* Title */}
          <h1 className="font-oswald text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white tracking-[0.03em] m-0 mb-3 leading-[1.1]">
            {workout.name.toUpperCase()}
          </h1>

          {/* Description */}
          <p className="font-inter text-[0.95rem] text-[#a0a0a0] leading-[1.7] m-0 mb-8">
            {workout.description}
          </p>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-[#ccff00] text-[#0a0a0a] border border-[#ccff0033] rounded-full px-2.5 py-1 text-[0.75rem] font-oswald font-medium tracking-[0.08em]"
              >
                {group.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Key Specs */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden mb-8">
            <div className="px-5 py-3 bg-[#161616] border-b border-[#2a2a2a]">
              <p className="font-oswald text-[0.85rem] font-semibold text-[#ccff00] tracking-[0.12em] m-0">
                KEY SPECS
              </p>
            </div>

            <div className="py-2">
              {[
                { label: "EQUIPMENT", value: workout.equipment },
                { label: "DIFFICULTY", value: workout.difficulty, colorClass: difficultyColor },
                { label: "SETS", value: workout.sets },
                { label: "REPS", value: workout.reps },
                { label: "DURATION", value: `${workout.duration} min` },
                { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
                { label: "RATING", value: `⭐ ${workout.rating}` },
              ].map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-5 py-2.5 ${i % 2 === 0 ? "bg-transparent" : "bg-[#ffffff05]"} ${i < 6 ? "border-b border-[#1f1f1f]" : "border-none"}`}
                >
                  <span className="font-oswald text-[0.75rem] font-medium text-[#666] tracking-[0.1em]">
                    {spec.label}
                  </span>
                  <span className={`font-inter text-[0.875rem] font-semibold ${spec.colorClass || "text-white"}`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="font-oswald text-[1.1rem] font-semibold text-white tracking-[0.1em] m-0 mb-4">
              INSTRUCTIONS
            </h3>
            <ol className="list-none p-0 m-0">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-3.5 mb-3.5">
                  <span className="flex-shrink-0 w-7 h-7 bg-[#ccff00] text-[#0a0a0a] rounded-full flex items-center justify-center font-oswald font-bold text-[0.8rem]">
                    {i + 1}
                  </span>
                  <p className="font-inter text-[0.9rem] text-[#b0b0b0] leading-[1.6] m-0 mt-[3px]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap">
            {/* Add to plan */}
            <button
              onClick={handleAddToPlan}
              disabled={inPlan || planFull}
              className={`flex-1 min-w-[180px] flex justify-center items-center gap-2 rounded-lg px-6 py-3.5 font-oswald font-semibold text-[0.95rem] tracking-[0.06em] transition-all duration-200 ${inPlan
                ? "bg-[#1a2200] text-[#ccff00] border border-[#ccff0055] cursor-not-allowed"
                : planFull
                  ? "bg-[#2a2a2a] text-[#666] border border-[#3a3a3a] cursor-not-allowed"
                  : "bg-[#ccff00] text-[#0a0a0a] border-none cursor-pointer shadow-[0_4px_20px_rgba(204,255,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(204,255,0,0.45)]"
                }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {inPlan ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </>
                )}
              </svg>
              {inPlan ? "In today's plan" : planFull ? "Plan is full (5/5)" : "Add to today's plan"}
            </button>

            {/* Save for later */}
            <button
              onClick={handleSave}
              className={`flex-1 min-w-[160px] flex justify-center items-center gap-2 border-[1.5px] border-[#ccff00] rounded-lg px-6 py-3.5 font-oswald font-semibold text-[0.95rem] tracking-[0.06em] cursor-pointer transition-all duration-200 text-[#ccff00] ${inSaved ? "bg-[#0a1a00]" : "bg-transparent hover:bg-[#ccff0018] hover:-translate-y-0.5"
                }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={inSaved ? "#ccff00" : "none"}
                stroke="#ccff00"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {inSaved ? "Saved ✓" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
