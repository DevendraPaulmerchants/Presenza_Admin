export const formatedDate = (date) => {
  if (!date) return 'no date';

  // Ensure we have a Date object. If `date` is a string or number, convert it.
  const d = date instanceof Date ? date : new Date(date);

  // Handle invalid dates
  if (isNaN(d.getTime())) return 'invalid date';

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

export const formatedTime = (date) => {
  if (!date) return 'no date';

  // Ensure we have a Date object. If `date` is a string or number, convert it.
  const d = date instanceof Date ? date : new Date(date);

  // Handle invalid dates
  if (isNaN(d.getTime())) return 'invalid date';
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
