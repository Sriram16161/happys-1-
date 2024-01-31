export const snakeToCamel = (obj: unknown): unknown => {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) return obj.map(snakeToCamel);

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, match) => (match as string).toUpperCase());
    const value = snakeToCamel(obj[key as keyof typeof obj]);
    acc[camelKey] = value;
    return acc;
  }, {} as Record<string, unknown>);
};
