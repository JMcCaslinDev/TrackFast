'use client';

const JobCard = ({ job, onClick }) => (
  <div 
    className="bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-stone-200"
    onClick={() => onClick(job)}
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-lg text-stone-800">{job.company_name}</h3>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(job.application_status)}`}>
        {job.application_status}
      </span>
    </div>
    <p className="text-stone-600 mb-4">{job.job_title}</p>
    <div className="flex justify-between items-center text-sm text-stone-500">
      <span>{job.date_applied}</span>
    </div>
  </div>
);

const getStatusColor = (status) => {
  const colors = {
    Applied: 'bg-amber-100 text-amber-800',
    Interview: 'bg-sky-100 text-sky-800',
    Offer: 'bg-emerald-100 text-emerald-800',
    Rejected: 'bg-rose-100 text-rose-800'
  };
  return colors[status] || 'bg-stone-200 text-stone-800';
};

export default JobCard;
