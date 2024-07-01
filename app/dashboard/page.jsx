'use client';

import { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, User, Calendar, X } from 'lucide-react';
import Modal from './Modal';
import { getJobApplicationsFromServer } from './server';

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

const StatDisplay = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <Icon className="text-teal-600" size={16} />
    <div>
      <p className="text-xs text-stone-500">{label}</p>
      <p className="text-sm font-semibold text-stone-700">{value}</p>
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

const DashboardPage = () => {
  const [jobEntries, setJobEntries] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJobApplicationsFromServer();
        setJobEntries(data);
      } catch (error) {
        console.error('Error fetching job applications:', error);
      }
    };

    fetchData();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSaveJob = (editedJob) => {
    setJobEntries(jobEntries.map(job => job._id === editedJob._id ? editedJob : job));
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Briefcase className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-semibold text-stone-800">JobTrack</span>
            </div>
            <div className="flex space-x-6">
              <StatDisplay icon={Briefcase} label="Applications" value={jobEntries.length} />
              <StatDisplay icon={User} label="Interviews" value={jobEntries.filter(job => job.application_status === 'Interview').length} />
              <StatDisplay icon={TrendingUp} label="Offers" value={jobEntries.filter(job => job.application_status === 'Offer').length} />
              <StatDisplay icon={Calendar} label="Active Days" value="14" />
            </div>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors">
              Add Job
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-stone-800">Your Job Applications</h2>
        <div className="grid grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {jobEntries.map((job) => (
            <JobCard key={job._id} job={job} onClick={handleJobClick} />
          ))}
        </div>
      </main>

      {selectedJob && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          job={selectedJob}
          onSave={handleSaveJob}
        />
      )}
    </div>
  );
};

export default DashboardPage;
