export const linkedinLikeUrlRoot =
  'http://sales-workspace-staging.s3-website-us-east-1.amazonaws.com/Extension/linkedin.com';
export const linkedinUrlRoot = 'https://www.linkedin.com';

const createUrlService = () => {
  const createEventUrl = (url: string) => new URL(url.replace(linkedinLikeUrlRoot, linkedinUrlRoot));

  const isCompanyPage = (url: URL) => url.pathname.startsWith('/company/');

  const isCompanyPeoplePage = (url: URL) => url.pathname.split('/')[3] === 'people';

  const isContactPage = (url: URL) => url.pathname.startsWith('/in/');

  const isSearchPage = (url: URL) => url.pathname.toLowerCase().startsWith('/search/results/people/');

  const isSearchAllPage = (url: URL) => url.pathname.startsWith('/search/results/all/');

  const isLinkedinUrl = (url: URL) => url.hostname === 'www.linkedin.com';

  const isSalesNavContactPage = (url: URL) => url.pathname.startsWith('/sales/lead/');

  const isSalesNavCompanyPage = (url: URL) => url.pathname.startsWith('/sales/company/');

  const isSalesNavSearchPage = (url: URL) => url.pathname.startsWith('/sales/search/people');

  const isSalesNavListPage = (url: URL) => url.pathname.startsWith('/sales/lists/people/');

  const isSalesNavPage = (url: URL) => url.pathname.startsWith('/sales/');

  const getCompanyLinkedinIdFromUrl = (url: URL): string | undefined => {
    const [, , companyName] = url.pathname.split('/');
    return companyName;
  };

  const getContactLinkedinIdFromUrl = (url: URL): string | undefined => {
    const [, , linkedinId] = url.pathname.split('/');
    return linkedinId;
  };

  const getCompanyLinkedinIdFromSalesNavPathname = (pathname: string): string | undefined => {
    const [, , , linkedinId] = pathname.split('/');
    if (pathname.includes('?')) return linkedinId.split('?')[0];
    return linkedinId;
  };

  const removeWWW = (url: string) => url.replace(/^www\./, '');

  const isAutoOpenLinkedinPage = (url: URL) =>
    isCompanyPage(url) ||
    isContactPage(url) ||
    isSearchPage(url) ||
    isSearchAllPage(url) ||
    isSalesNavContactPage(url) ||
    isSalesNavCompanyPage(url) ||
    isSalesNavSearchPage(url) ||
    isSalesNavListPage(url);

  const getPageFromUrl = (url: URL) => {
    const pageString = url.searchParams.get('page');
    const pageNumber = pageString ? parseInt(pageString, 10) : 1;
    return Number.isNaN(pageNumber) ? 1 : pageNumber;
  };

  return {
    createEventUrl,
    isCompanyPage,
    isCompanyPeoplePage,
    isContactPage,
    isSearchPage,
    isSearchAllPage,
    isLinkedinUrl,
    getCompanyLinkedinIdFromUrl,
    getContactLinkedinIdFromUrl,
    isSalesNavPage,
    isSalesNavContactPage,
    isSalesNavCompanyPage,
    isSalesNavSearchPage,
    isSalesNavListPage,
    getCompanyLinkedinIdFromSalesNavPathname,
    removeWWW,
    isAutoOpenLinkedinPage,
    getPageFromUrl,
  };
};

const UrlService = createUrlService();

export default UrlService;
