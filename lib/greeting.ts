/**
 * Returns a time-based greeting based on the current hour
 * @param date - Optional date object (defaults to current time)
 * @returns Appropriate greeting string ("Good morning", "Good afternoon", or "Good evening")
 */
export function getTimeBasedGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
