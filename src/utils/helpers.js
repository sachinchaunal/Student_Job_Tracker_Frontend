// Format date to a readable format (MM/DD/YYYY)
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// Get a color based on application status
export const getStatusColor = (status) => {
  switch (status) {
    case 'Applied':
      return '#3498db'; // Blue
    case 'Interview':
      return '#f39c12'; // Orange
    case 'Offer':
      return '#2ecc71'; // Green
    case 'Rejected':
      return '#e74c3c'; // Red
    default:
      return '#95a5a6'; // Gray
  }
};

// Get all possible job application statuses
export const getJobStatuses = () => {
  return ['Applied', 'Interview', 'Offer', 'Rejected'];
};

// Truncate long strings for display purposes
export const truncateString = (str, maxLength = 30) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}; 