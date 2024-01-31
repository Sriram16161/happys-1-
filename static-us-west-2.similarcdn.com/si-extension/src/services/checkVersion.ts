export const isVersionHigher = (version: string, targetVersion: string): boolean => {
  if (!targetVersion || !version) return false;

  const versionParts = version.split('.');
  const targetParts = targetVersion.split('.');

  for (let i = 0; i < versionParts.length; i++) {
    const currentPart = parseInt(versionParts[i], 10);
    const targetPart = parseInt(targetParts[i], 10);

    if (currentPart !== targetPart) return currentPart > targetPart;
  }
  return false;
};

export const isVersionHigherOrEqual = (version: string, targetVersion: string): boolean => {
  if (!targetVersion || !version) return false;
  if (targetVersion === version) return true;

  return isVersionHigher(version, targetVersion);
};
