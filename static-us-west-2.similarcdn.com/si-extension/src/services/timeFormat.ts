import dayjs from 'dayjs';

const splitSecondsIntoHMS = (decimalSeconds: number) => {
  const seconds = Math.round(decimalSeconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return { hours, minutes, seconds: remainingSeconds };
};

export const secondsToTimeString = (decimalSeconds: number): string => {
  const { hours, minutes, seconds } = splitSecondsIntoHMS(decimalSeconds);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export const getTwoMonthsPeriodSinceDate = (date: string) => {
  const start = dayjs(date).subtract(2, 'month');
  return `${start.format('MMM YYYY')} - ${dayjs(date).format('MMM YYYY')}`;
};

export const secondsToHMS = (decimalSeconds: number): string => {
  const { hours, minutes, seconds } = splitSecondsIntoHMS(decimalSeconds);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length == 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};
