'use client';

import { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, User, Calendar } from 'lucide-react';
import Modal from './Modal';
import { getJobApplicationsFromServer } from './server';
import JobCard from './JobCard';

const StatDisplay = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <Icon className="text-teal-600" size={16} />
    <div>
      <p className="text-xs text-stone-500">{label}</p>
      <p className="text-sm font-semibold text-stone-700">{value}</p>
    </div>
  </div>
);

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

  // Sort jobEntries by date_applied in descending order
  const sortedJobEntries = [...jobEntries].sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied));

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
          {sortedJobEntries.map((job) => (
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
