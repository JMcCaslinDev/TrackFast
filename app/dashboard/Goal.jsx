// app/dashboard/Goal.jsx

'use client';

import { useState, useEffect } from 'react';

const Goal = ({ jobEntries }) => {
  const [goal, setGoal] = useState(10);
  const [appliedToday, setAppliedToday] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const appliedTodayCount = jobEntries.filter(job => job.date_applied === today && job.application_status === 'Applied').length;
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
