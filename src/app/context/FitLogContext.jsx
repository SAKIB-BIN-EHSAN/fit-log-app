"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [todaysPlan, setTodaysPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_todaysPlan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setTodaysPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("fitlog_todaysPlan", JSON.stringify(todaysPlan));
  }, [todaysPlan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  function addToPlan(workout) {
    if (todaysPlan.length >= 5) return false;
    if (todaysPlan.find((w) => w.id === workout.id)) return false;
    setTodaysPlan((prev) => [...prev, workout]);
    return true;
  }

  function addToSaved(workout) {
    if (saved.find((w) => w.id === workout.id)) return false;
    setSaved((prev) => [...prev, workout]);
    return true;
  }

  function removeFromPlan(id) {
    setTodaysPlan((prev) => prev.filter((w) => w.id !== id));
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  }

  function isInPlan(id) {
    return todaysPlan.some((w) => w.id === id);
  }

  function isInSaved(id) {
    return saved.some((w) => w.id === id);
  }

  return (
    <FitLogContext.Provider
      value={{
        todaysPlan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}
