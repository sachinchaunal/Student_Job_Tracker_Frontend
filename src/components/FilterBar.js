import React from 'react';
import { getJobStatuses } from '../utils/helpers';

const FilterBar = ({ filters, setFilters }) => {
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, status: value });
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, sortBy: value });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, search: value });
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      sortBy: 'newest',
      search: '',
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="all">All Statuses</option>
          {getJobStatuses().map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Sort By</label>
        <select
          id="sort-by"
          value={filters.sortBy}
          onChange={handleSortChange}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="company">Company (A-Z)</option>
        </select>
      </div>

      <div className="filter-group search">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <button 
        className="clear-filters-btn"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar; 