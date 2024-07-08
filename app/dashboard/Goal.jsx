// app/dashboard/Goal.jsx

'use client';

import { useState, useEffect } from 'react';
import { getUserTimeZone, toLocalDateString } from '../DateConversion/dateUtils'; // Updated import path

const Goal = ({ jobEntries }) => {
  const [goal, setGoal] = useState(10);
  const [appliedToday, setAppliedToday] = useState(0);

  useEffect(() => {
    const timeZone = getUserTimeZone(); // Get the user's time zone
    const today = new Date().toLocaleDateString(undefined, { timeZone }); // Get today's date in user's time zone
    console.log("Today's date (local):", today);

    const appliedTodayCount = jobEntries.filter(job => {
      const jobDateLocal = new Date(job.date_applied).toLocaleDateString(undefined, { timeZone }); // Convert job date to local date string
      console.log("Job entry:", job);
      console.log("Job date_applied (local):", jobDateLocal);
      return jobDateLocal === today && job.application_status === 'Applied';
    }).length;

    console.log("Applied today count:", appliedTodayCount);
    setAppliedToday(appliedTodayCount);
  }, [jobEntries]);

  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm font-semibold text-stone-700">Goal:</p>
      <p className="text-sm font-semibold text-teal-600">{appliedToday}/{goal}</p>
    </div>
  );
};

export default Goal;
