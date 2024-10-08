'use client';

import { useState, useEffect } from 'react';
import { Briefcase, User, Calendar, DollarSign } from 'lucide-react';
import Modal from './Modal';
import FeedbackModal from './FeedbackModal';
import { getJobApplicationsFromServer } from './api/getJobApplications';
import { addJobApplication } from './api/addJobApplication';
import { editJobApplication } from './api/editJobApplication';
import { deleteJobApplication } from './api/deleteJobApplication';
import { submitFeedback } from './api/submitFeedback';
import JobCard from './JobCard';
import ActionButtons from './ActionButtons';
import JobFilters from './JobFilters';
import Goal from './Goal';
import Image from 'next/image';
import Link from 'next/link';
import { getUserTimeZone, toLocalDateString, toUTC } from '../DateConversion/dateUtils';

const StatDisplay = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center space-x-1">
    <Icon className={`text-${color}`} size={16} />
    <div>
      <p className="text-xs text-stone-500">{label}</p>
      <p className="text-sm font-semibold text-stone-700">{value}</p>
    </div>
  </div>
);

const DashboardPage = ({ userId }) => {
  const [jobEntries, setJobEntries] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    console.log("DashboardPage useEffect triggered");
    fetchJobApplications();
  }, [sortOrder, statusFilter]);

  const fetchJobApplications = async () => {
    try {
      console.log("Fetching job applications");
      const timeZone = getUserTimeZone();
      let data = await getJobApplicationsFromServer();
      console.log("Raw job applications data from server:", data);
      data = data.map(job => {
        const localDate = toLocalDateString(job.date_applied, timeZone);
        console.log(`Job ${job._id} converted date from ${job.date_applied} to ${localDate}`);
        return { ...job, date_applied: localDate };
      });
      console.log("Processed job applications data with local dates:", data);
      setJobEntries(data);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  const handleJobClick = (job) => {
    console.log("Job clicked:", job);
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSaveJob = async (editedJob) => {
    try {
      const timeZone = getUserTimeZone();
      console.log("Saving job:", editedJob);
      editedJob.date_applied = toUTC(editedJob.date_applied, timeZone);
      console.log("Job date converted to UTC:", editedJob.date_applied);
      if (editedJob._id) {
        await editJobApplication(editedJob._id, editedJob);
      } else {
        await addJobApplication(editedJob);
      }
      await fetchJobApplications();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving job application:', error);
    }
  };

  const handleDeleteJob = async (jobToDelete) => {
    console.log("handleDeleteJob called with:", jobToDelete);
    try {
      console.log("Attempting to delete job:", jobToDelete);
      await deleteJobApplication(jobToDelete._id);
      console.log("Job deleted successfully");
      await fetchJobApplications();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting job application:', error);
    }
  };

  const handleQuickAdd = () => {
    console.log("Quick add job");
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleFeedbackClick = () => {
    console.log("Feedback clicked");
    setIsFeedbackModalOpen(true);
  };

  const handleSortChange = (newOrder) => {
    console.log("Sort order changed to:", newOrder);
    setSortOrder(newOrder);
  };

  const handleStatusChange = (status) => {
    console.log("Status filter changed to:", status);
    setStatusFilter(status);
  };

  const filteredJobEntries = jobEntries
    .filter((job) => statusFilter === 'All' || job.application_status === statusFilter)
    .sort((a, b) => (sortOrder === 'newest' ? new Date(b.date_applied) - new Date(a.date_applied) : new Date(a.date_applied) - new Date(b.date_applied)));

  console.log("Filtered job entries:", filteredJobEntries);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center">
      <nav className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div>
                <Image src="/logo.svg" alt="TrackFast Dashboard" width={32} height={32} className="rounded-xl w-12 border bg-base-200 object-contain object-center" />
              </div>
              <span className="ml-2 text-xl font-semibold text-stone-800">TrackFast</span>
            </Link>
            <div className="hidden md:flex space-x-6 items-center justify-center flex-grow">
              <StatDisplay icon={Briefcase} label="Applications" value={jobEntries.filter(job => job.application_status === 'Applied').length} color="teal-600" />
              <StatDisplay icon={User} label="Interviews" value={jobEntries.filter(job => job.application_status === 'Interview').length} color="blue-500" />
              <StatDisplay icon={DollarSign} label="Offers" value={jobEntries.filter(job => job.application_status === 'Offer').length} color="green-500" />
              <StatDisplay icon={Calendar} label="Active Days" value={new Set(jobEntries.map(job => job.date_applied)).size} color="purple-500" />
            </div>
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors"
              onClick={handleFeedbackClick}
            >
              Feedback
            </button>
          </div>
          <div className="md:hidden flex justify-between mt-4">
            <StatDisplay icon={Briefcase} label="Applications" value={jobEntries.length} color="teal-600" />
            <StatDisplay icon={User} label="Interviews" value={jobEntries.filter(job => job.application_status === 'Interview').length} color="blue-500" />
            <StatDisplay icon={DollarSign} label="Offers" value={jobEntries.filter(job => job.application_status === 'Offer').length} color="green-500" />
            <StatDisplay icon={Calendar} label="Active Days" value={new Set(jobEntries.map(job => job.date_applied)).size} color="purple-500" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-64 py-8 w-full flex flex-col items-center">
        <div className="flex flex-col w-full gap-4 mb-6 md:flex-row md:justify-between md:items-center">
          <div className="w-full md:w-auto flex justify-center">
            <JobFilters onSortChange={handleSortChange} onStatusChange={handleStatusChange} />
          </div>
          <div className="w-full md:w-auto flex justify-center">
            <Goal jobEntries={jobEntries} />
          </div>
          <div className="w-full md:w-auto flex justify-center">
            <ActionButtons onQuickAdd={handleQuickAdd} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-[calc(100vh-200px)] p-1 w-full">
          {filteredJobEntries.map((job) => (
            <JobCard key={job._id} job={job} onClick={handleJobClick} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            console.log("Closing modal");
            setIsModalOpen(false);
          }}
          job={selectedJob}
          onSave={handleSaveJob}
          onDelete={handleDeleteJob}
        />
      )}

      {isFeedbackModalOpen && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          userId={userId}
          submitFeedback={submitFeedback}
        />
      )}
    </div>
  );
};

export default DashboardPage;
