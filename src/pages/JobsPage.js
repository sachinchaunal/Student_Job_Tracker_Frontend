import React, { useState, useEffect } from 'react';
import { JobAPI } from '../services/api';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import FilterBar from '../components/FilterBar';
import { formatDate } from '../utils/helpers';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'newest',
    search: '',
  });

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await JobAPI.getAllJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch job applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle adding a new job
  const handleAddJob = async (jobData) => {
    try {
      setLoading(true);
      await JobAPI.createJob(jobData);
      fetchJobs();
      setShowForm(false);
    } catch (err) {
      setError('Failed to add job application');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle updating a job
  const handleUpdateJob = async (jobData) => {
    try {
      setLoading(true);
      await JobAPI.updateJob(currentJob._id, jobData);
      fetchJobs();
      setShowForm(false);
      setCurrentJob(null);
    } catch (err) {
      setError('Failed to update job application');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a job
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        setLoading(true);
        await JobAPI.deleteJob(jobId);
        fetchJobs();
      } catch (err) {
        setError('Failed to delete job application');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle editing a job
  const handleEditJob = (job) => {
    setCurrentJob(job);
    setShowForm(true);
  };

  // Handle form submission
  const handleSubmit = (jobData) => {
    if (currentJob) {
      handleUpdateJob(jobData);
    } else {
      handleAddJob(jobData);
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowForm(false);
    setCurrentJob(null);
  };

  // Filter and sort jobs
  const filteredJobs = jobs.filter((job) => {
    // Filter by status
    if (filters.status !== 'all' && job.status !== filters.status) {
      return false;
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        job.company.toLowerCase().includes(searchLower) ||
        job.role.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by selected option
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      case 'oldest':
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      case 'company':
        return a.company.localeCompare(b.company);
      default:
        return 0;
    }
  });

  return (
    <div className="jobs-page">
      <header className="jobs-header">
        <h1>Student Job Tracker</h1>
        <button 
          className="add-job-btn"
          onClick={() => {
            setCurrentJob(null);
            setShowForm(true);
          }}
        >
          Add New Job
        </button>
      </header>

      {error && <div className="error-alert">{error}</div>}

      <FilterBar filters={filters} setFilters={setFilters} />

      {showForm ? (
        <JobForm 
          job={currentJob} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      ) : (
        <>
          {loading ? (
            <div className="loading">Loading job applications...</div>
          ) : filteredJobs.length > 0 ? (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>
          ) : (
            <div className="no-jobs">
              <p>No job applications found. Add your first job application!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsPage; 