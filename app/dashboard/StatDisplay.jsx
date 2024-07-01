'use client';

const StatDisplay = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <Icon className="text-teal-600" size={16} />
    <div>
      <p className="text-xs text-stone-500">{label}</p>
      <p className="text-sm font-semibold text-stone-700">{value}</p>
    </div>
  </div>
);

export default StatDisplay;
