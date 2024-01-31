export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

export function capitalize(str: string): string {
  return (str && str[0].toUpperCase() + str.slice(1)) || '';
}
