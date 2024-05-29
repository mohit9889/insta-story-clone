export const getTimeAgoString = (timestamp: Date): string => {
  const currentDate = new Date();
  const pastDate = new Date(timestamp);

  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference < 60) {
    return `${minutesDifference} minute${minutesDifference !== 1 ? "s" : ""} ago`;
  } else {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  }
};
