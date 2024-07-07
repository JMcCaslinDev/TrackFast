// app/dashboard/Goal.jsx

'use client';

import { useState, useEffect } from 'react';

const Goal = ({ jobEntries }) => {
  const [goal, setGoal] = useState(10);
  const [appliedToday, setAppliedToday] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    console.log("Today's date (local):", today);

    jobEntries.forEach(job => {
      console.log("Job entry:", job);
      const jobDateLocal = new Date(job.date_applied).toLocaleDateString('en-CA'); // Convert job date to local date string
      console.log("Job date_applied (local):", jobDateLocal);
    });

    const appliedTodayCount = jobEntries.filter(job => {
      const jobDateLocal = new Date(job.date_applied).toLocaleDateString('en-CA'); // Convert job date to local date string
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
