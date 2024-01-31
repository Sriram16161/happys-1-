export const formatPercentage = (number: number, precision = 0): string => {
  return formatWithPrecision(number * 100, precision) + '%';
};

export const formatWithSuffix = (number: number, precision = 1): string => {
  const absNumber = Math.abs(number);
  let suffix = '';
  let shortNumber = number;

  if (absNumber >= 1e9) {
    suffix = 'B';
    shortNumber = number / 1e9;
  } else if (absNumber >= 1e6) {
    suffix = 'M';
    shortNumber = number / 1e6;
  } else if (absNumber >= 1e3) {
    suffix = 'K';
    shortNumber = number / 1e3;
  }

  return `${formatWithPrecision(shortNumber, precision)}${suffix}`;
};

export const formatWithSuffixWithMinimum = (number: number, precision = 1, min = 5000): string =>
  Math.abs(number) < min ? `< ${min}` : formatWithSuffix(number, precision);

export const formatWithPrecision = (number: number, precision = 0): string => {
  return parseFloat(number.toFixed(precision)).toString();
};
