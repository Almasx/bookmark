import { EXPIRATION_DAYS } from "./const";

// Shows remaining time until expiration (counts down from creation date)
export const howManyDaysAgo = (date: Date) => {
  const now = new Date();
  const expirationDate = new Date(
    date.getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000
  );
  const remainingTime = expirationDate.getTime() - now.getTime();

  // If expired
  if (remainingTime <= 0) {
    return "expired";
  }

  // Calculate remaining time
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  if (remainingDays > 0) {
    return `${remainingDays}d`;
  }

  const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
  if (remainingHours > 0) {
    return `${remainingHours}h`;
  }

  const remainingMinutes = Math.floor(remainingTime / (1000 * 60));
  return `${remainingMinutes}m`;
};
