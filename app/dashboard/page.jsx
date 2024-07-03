'use client';

import { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, User, Calendar, DollarSign } from 'lucide-react';
import Modal from './Modal';
import { getJobApplicationsFromServer } from './api/getJobApplications';
import { addJobApplication } from './api/addJobApplication';
import { editJobApplication } from './api/editJobApplication';
import { deleteJobApplication } from './api/deleteJobApplication';
import JobCard from './JobCard';
import ActionButtons from './ActionButtons';
import Image from 'next/image';

const StatDisplay = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center space-x-2">
    <Icon className={`text-${color}`} size={16} />
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

  const handleSaveJob = async (editedJob) => {
    try {
      let result;
      if (editedJob._id) {
        result = await editJobApplication(editedJob._id, editedJob);
      } else {
        result = await addJobApplication(editedJob);
      }
      setJobEntries(jobEntries.map(job => (job._id === editedJob._id ? result.data : job)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving job application:', error);
    }
  };

  const handleDeleteJob = async (job) => {
    try {
      await deleteJobApplication(job._id);
      setJobEntries(jobEntries.filter(j => j._id !== job._id));
    } catch (error) {
      console.error('Error deleting job application:', error);
    }
  };

  const handleQuickAdd = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  // Sort jobEntries by date_applied in descending order
  const sortedJobEntries = [...jobEntries].sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied));

  return (
    <div className="min-h-screen bg-stone-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div>
                <Image src="/logo.svg" alt="TrackFast Dashboard" width={32} height={32} className="rounded-xl w-12 border bg-base-200 object-contain object-center" />
              </div>
              <span className="ml-2 text-xl font-semibold text-stone-800">TrackFast</span>
            </div>
            <div className="flex space-x-6">
              <StatDisplay icon={Briefcase} label="Applications" value={jobEntries.length} color="teal-600" />
              <StatDisplay icon={User} label="Interviews" value={jobEntries.filter(job => job.application_status === 'Interview').length} color="blue-500" />
              <StatDisplay icon={DollarSign} label="Offers" value={jobEntries.filter(job => job.application_status === 'Offer').length} color="green-500" />
              <StatDisplay icon={Calendar} label="Active Days" value="14" color="purple-500" />
            </div>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors">
              Profile
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-56 sm:px-6 lg:px-56 py-8">
        <ActionButtons onQuickAdd={handleQuickAdd} />
        
        <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {sortedJobEntries.map((job) => (
            <JobCard key={job._id} job={job} onClick={handleJobClick} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          job={selectedJob}
          onSave={handleSaveJob}
          onDelete={handleDeleteJob}
        />
      )}
    </div>
  );
};

export default DashboardPage;
