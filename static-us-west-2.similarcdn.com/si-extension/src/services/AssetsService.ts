const makeAssetsService = (assetsRoot: string) => {
  const assetUrl = (assetPath: string) => {
    const separator = assetPath.startsWith('/') ? '' : '/';
    return [assetsRoot, assetPath].join(separator);
  };

  return { assetUrl };
};

export const AssetsService = makeAssetsService(window['assetsRoot']);
