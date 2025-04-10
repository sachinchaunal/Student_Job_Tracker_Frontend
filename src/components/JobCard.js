import React from 'react';
import { formatDate, getStatusColor } from '../utils/helpers';

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="job-card" style={{ borderLeft: `4px solid ${getStatusColor(job.status)}` }}>
      <div className="job-card-header">
        <h3>{job.company}</h3>
        <div className="job-status" style={{ backgroundColor: getStatusColor(job.status) }}>
          {job.status}
        </div>
      </div>
      <h4>{job.role}</h4>
      <p>Applied on: {formatDate(job.applicationDate)}</p>
      <div className="job-card-actions">
        {job.link && (
          <a 
            href={job.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="job-card-link"
          >
            View Job
          </a>
        )}
        <button className="job-edit-btn" onClick={() => onEdit(job)}>
          Edit
        </button>
        <button className="job-delete-btn" onClick={() => onDelete(job._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard; 