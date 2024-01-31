import { CollectedContactInfo, Contact } from '../domain/contact';
import { CollectedDataItem } from '../messageHandler';
import { CountryService } from './country';
import UrlService from './UrlService';

const createDataExtractionService = () => {
  const extractName = (collectedData: CollectedDataItem[]) => {
    return collectedData.find((item) => item.name === 'Full Name')?.content as string;
  };

  const extractTitle = (collectedData: CollectedDataItem[]) => {
    return collectedData.find((item) => item.name === 'Title')?.content as string;
  };

  const extractCountry = (collectedData: CollectedDataItem[]) => {
    const location = collectedData.find((item) => item.name === 'Location')?.content;
    if (!location) return undefined;

    const possibleCountry = (typeof location === 'string' && location.split(', ').at(-1)!.trim()) || '';
    return CountryService.suggestCountry(possibleCountry)?.text;
  };

  const extractCompanyLinkedinIds = (collectedData: CollectedDataItem[]) => {
    const urls = collectedData.find((item) => item.name === 'Current Companies URLs')?.attributes?.href ?? [];
    return (urls as string[])
      .map((url) => UrlService.getCompanyLinkedinIdFromUrl(new URL(url)))
      .filter(Boolean) as string[];
  };

  const extractCompanyDomain = (collectedData: CollectedDataItem[]): string | undefined => {
    const websiteElem = collectedData.find(({ name }) => name === 'Company Website');
    if (!websiteElem || !websiteElem.attributes?.['href'] || typeof websiteElem.attributes['href'] !== 'string') return;

    try {
      const { hostname } = new URL(websiteElem.attributes['href']);
      return UrlService.removeWWW(hostname);
    } catch {
      return;
    }
  };

  const extractCompanyName = (collectedData: CollectedDataItem[]) => {
    const companyElem = collectedData.find(({ name }) => name === 'Company Name');
    if (!companyElem) return;

    return companyElem.content;
  };

  const extractCompanyNamesFromExperience = (collectedData: CollectedDataItem[], key: string) => {
    const companyElem = collectedData.find(({ name }) => name === key);
    if (!companyElem) return;

    return (companyElem.content as string[]).map((name) => name?.split(' · ')[0]);
  };

  const extractContactInfoFromLinkedin = (collectedData: CollectedDataItem[]): CollectedContactInfo => {
    const name = extractName(collectedData);
    const title = extractTitle(collectedData);
    const country = extractCountry(collectedData);
    const companyLinkedinIds = extractCompanyLinkedinIds(collectedData);
    const companyName = extractCompanyName(collectedData);
    const companyNamesFromExperience =
      extractCompanyNamesFromExperience(collectedData, 'Current Companies Names') || [];
    const companyNamesFromExperienceInList =
      extractCompanyNamesFromExperience(collectedData, 'Current Companies Names from lists') || [];
    const mergedCompanyNamesList = companyNamesFromExperience
      .map((company, index) => (company !== undefined ? company : companyNamesFromExperienceInList[index]))
      .filter((company) => company !== undefined);

    return {
      name,
      title,
      country,
      companyLinkedinIds,
      companyName: mergedCompanyNamesList.length > 1 ? mergedCompanyNamesList : companyName,
    };
  };

  const extractCompanyLinkedinId = (collectedData: CollectedDataItem[]): string[] | undefined => {
    let companyElem = collectedData.find(({ name }) => name === 'Company Name');
    if (!companyElem || !companyElem.attributes?.['href'] || companyElem.attributes?.['href']?.length === 0) {
      companyElem = collectedData.find(({ name }) => name === 'Previous Company Name');
    }
    if (!companyElem || !companyElem.attributes?.['href'] || !Array.isArray(companyElem.attributes['href'])) return;

    const pathnameArr = companyElem.attributes['href'];

    return pathnameArr
      .map((pathname) => UrlService.getCompanyLinkedinIdFromSalesNavPathname(pathname))
      .filter(Boolean) as string[];
  };

  const extractContactLinkedinId = (collectedData: CollectedDataItem[]) => {
    const linkedinElem = collectedData.find(({ name }) => name === 'Linkedin URL');
    if (!linkedinElem || !linkedinElem.attributes?.['href']) return;
    const url = new URL(linkedinElem.attributes['href'] as string);

    return UrlService.getContactLinkedinIdFromUrl(url);
  };

  const extractContactInfoFromSalesNav = (collectedData: CollectedDataItem[]): CollectedContactInfo => {
    const name = extractName(collectedData);
    const title = extractTitle(collectedData);
    const country = extractCountry(collectedData);
    const companyLinkedinIds = extractCompanyLinkedinId(collectedData) || [];
    const companyName = extractCompanyName(collectedData);

    return { name, title, country, companyLinkedinIds, companyName };
  };

  const extractContactSearchInfo = (collectedData: CollectedDataItem[]): Partial<Contact>[] => {
    const namesData = collectedData.find((item) => item.name === 'Search names');
    const hrefs = Array.isArray(namesData?.attributes?.href) ? namesData?.attributes?.href : [];
    const names = namesData?.content ?? [];
    const positions = collectedData.find((item) => item.name === 'Search positions')?.content ?? [];
    const locations = collectedData.find((item) => item.name === 'Search locations')?.content ?? [];
    const summaries = collectedData.find((item) => item.name === 'Search summaries')?.content ?? [];

    return (hrefs as string[]).map((href, index) => {
      const name = names[index] || '';
      const url = new URL(href);
      const linkedin = `${url.origin}${url.pathname}`;
      return {
        id: linkedin,
        name: name.substring(0, name.indexOf('\n')),
        title: positions[index],
        country: locations[index],
        linkedin,
        matchedProfiles: [],
        hasDirectPhoneNumbers: false,
        hasMobilePhoneNumbers: false,
        hasValidEmails: false,
        companyName: extractContactCompanyName({ title: positions[index], summary: summaries[index] }),
      };
    });
  };

  const extractContact = (collectedData: CollectedDataItem[]): Partial<Contact> | undefined => {
    const nameItem = collectedData.find((item) => item.name === 'Contact name');
    const position = collectedData.find((item) => item.name === 'Contact position')?.content as string;
    const location = collectedData.find((item) => item.name === 'Contact location')?.content as string;
    const summary = collectedData.find((item) => item.name === 'Contact summary')?.content as string;
    if (!nameItem) return;

    const href = nameItem?.attributes?.href as string;
    const name = nameItem?.content as string;
    const url = new URL(href);
    const linkedin = `${url.origin}${url.pathname}`;

    return {
      id: linkedin,
      name: name.substring(0, name.indexOf('\n')),
      title: position,
      country: location,
      linkedin,
      matchedProfiles: [],
      hasDirectPhoneNumbers: false,
      hasMobilePhoneNumbers: false,
      hasValidEmails: false,
      companyName: extractContactCompanyName({ title: position, summary }),
    };
  };

  const extractAllSearchInfo = (collectedData: CollectedDataItem[]): Partial<Contact>[] => {
    const searchInfo = extractContactSearchInfo(collectedData);
    const contact = extractContact(collectedData);
    if (!contact) return searchInfo;

    const alreadyIncludes = searchInfo.some((item) => item.linkedin === contact.linkedin);
    if (alreadyIncludes) return searchInfo;

    return [contact, ...searchInfo];
  };

  const extractSearchLocations = (collectedData: CollectedDataItem[]): string[] => {
    const locations = (collectedData.find((item) => item.name === 'Search locations')?.content ?? []) as string[];
    return locations.map((location) => {
      const possibleCountry = location.split(', ').at(-1)!.trim();
      return CountryService.suggestCountry(possibleCountry)?.text ?? location;
    });
  };

  const extractResultsCount = (collectedData: CollectedDataItem[]): number => {
    const parseResults = (input: string) => {
      const match = input.match(/^(\d+(\.\d+)?)([KkMm]?)\+?/);
      if (!match) return 0;

      const numberPart = parseFloat(match[1]);
      const magnitudePart = match[3];

      switch (magnitudePart.toLowerCase()) {
        case 'k':
          return numberPart * 1_000;
        case 'm':
          return numberPart * 1_000_000;
        default:
          return numberPart;
      }
    };

    const resultsCountString = collectedData.find((item) => item.name === 'Results count')?.content as string;
    if (!resultsCountString) return 0;

    return parseResults(resultsCountString);
  };

  const extractContactSearchInfoFromSalesNav = (
    collectedData: CollectedDataItem[],
    isForList?: boolean
  ): Partial<Contact>[] => {
    const names = (collectedData.find((item) => item.name === 'Search names')?.content ?? []) as string[];
    const positions = collectedData.find((item) => item.name === 'Search positions')?.content ?? [];
    const locations = extractSearchLocations(collectedData);
    const companies = collectedData.find((item) => item.name === 'Search companies');
    const companyNames = companies?.content || [];
    const companyPaths = (companies?.attributes?.href as string[]) || [];
    const companyLinkedinIds = companyPaths.map(
      (path) => path && UrlService.getCompanyLinkedinIdFromSalesNavPathname(path)
    );
    const summaries = collectedData.find((item) => item.name === 'Search summaries')?.content ?? [];

    return names.map((name, index) => ({
      name,
      title: positions[index],
      country: locations[index],
      companyLinkedinId: companyLinkedinIds[index],
      companyName: isForList
        ? extractContactCompanyNameSalesNavList(companyNames[index])
        : extractContactCompanyNameSalesNav({ title: positions[index], summary: summaries[index] }),
      matchedProfiles: [],
      hasDirectPhoneNumbers: false,
      hasMobilePhoneNumbers: false,
      hasValidEmails: false,
    }));
  };

  const extractContactCompanyNameSalesNavList = (company: string | undefined): string =>
    company ? company.replace(/\(\+\d+\)/g, '').trim() : '';

  const extractContactLinkedinIds = (collectedContactsSearchInfo: Partial<Contact>[] | undefined): string[] =>
    (collectedContactsSearchInfo
      ?.map((contact) => UrlService.getContactLinkedinIdFromUrl(new URL(contact.linkedin || '')))
      .filter(Boolean) as string[]) || [];

  const extractContactCompanyFromTitle = (jobTitle?: string): string => {
    if (!jobTitle) return '';

    const pattern = /(?:\sat\s|\s@\s)([^]+)/i;
    const match = pattern.exec(jobTitle);
    const result = (match && match[1])?.trim() || '';

    if (result) {
      return result[result.length - 1] === '.' ? result.slice(0, -1) : result;
    } else {
      return '';
    }
  };

  const extractContactCompanyFromSummary = ({
    jobTitle,
    summaryText,
  }: {
    jobTitle?: string;
    summaryText: string;
  }): string => {
    if (jobTitle && jobTitle.includes(summaryText) && jobTitle.includes(' at ')) {
      const parts = jobTitle.split(' at ');
      const organization = parts[1].trim();

      if (organization.length > 0) {
        return organization;
      }
    }

    return '';
  };

  const extractContactCompanyFromCurrent = (jobTitle?: string): string =>
    extractContactCompanyFromSummary({ jobTitle, summaryText: 'Current:' });

  const extractContactCompanyFromPast = (jobTitle?: string): string =>
    extractContactCompanyFromSummary({ jobTitle, summaryText: 'Past:' });

  const extractContactCompanyName = ({ title, summary }: { title?: string; summary?: string }): string =>
    extractContactCompanyFromTitle(title) ||
    extractContactCompanyFromCurrent(summary) ||
    extractContactCompanyFromPast(summary);

  const extractContactCompanyNameSalesNav = ({
    title = '',
    summary = '',
  }: {
    title?: string;
    summary?: string;
  }): string => summary.replace(title, '').trim() || '';

  return {
    extractContactInfoFromLinkedin,
    extractCompanyDomain,
    extractContactSearchInfo,
    extractAllSearchInfo,
    extractContactLinkedinIds,
    extractContactInfoFromSalesNav,
    extractContactSearchInfoFromSalesNav,
    extractContactCompanyNameSalesNavList,
    extractContactLinkedinId,
    extractResultsCount,
    extractContactCompanyName,
  };
};

const DataExtractionService = createDataExtractionService();

export default DataExtractionService;
