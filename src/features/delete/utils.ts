export const howManyDaysAgo = (date: Date) => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `${diffDays}d`;
  }
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  if (diffHours > 0) {
    return `${diffHours}h`;
  }
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  return `${diffMinutes}m`;
};
