import React, { useState, useEffect } from 'react';
import { getJobStatuses } from '../utils/helpers';

const JobForm = ({ job, onSubmit, onCancel }) => {
  const initialFormState = {
    company: '',
    role: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().slice(0, 10),
    link: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If a job is provided, populate the form with job data
    if (job) {
      setFormData({
        ...job,
        applicationDate: job.applicationDate 
          ? new Date(job.applicationDate).toISOString().slice(0, 10) 
          : new Date().toISOString().slice(0, 10),
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear any previous errors for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Job role is required';
    }
    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      if (!job) {
        // Reset form after submit if we're adding a new job
        setFormData(initialFormState);
      }
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>{job ? 'Edit Job Application' : 'Add New Job Application'}</h2>
      
      <div className="form-group">
        <label htmlFor="company">Company*</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={errors.company ? 'error' : ''}
          placeholder="e.g. Google"
        />
        {errors.company && <div className="error-message">{errors.company}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="role">Role*</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={errors.role ? 'error' : ''}
          placeholder="e.g. Software Engineer"
        />
        {errors.role && <div className="error-message">{errors.role}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {getJobStatuses().map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="applicationDate">Application Date*</label>
        <input
          type="date"
          id="applicationDate"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          className={errors.applicationDate ? 'error' : ''}
        />
        {errors.applicationDate && <div className="error-message">{errors.applicationDate}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="link">Job Link</label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://example.com/job-posting"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {job ? 'Update Job' : 'Add Job'}
        </button>
        {onCancel && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default JobForm; 