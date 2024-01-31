import { Page } from './domain/page';
import { CompanyPage } from './pages/CompanyPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { SettingsPage } from './pages/SettingsPage';

export const routingConfig = [
  { page: Page.Company, component: CompanyPage },
  { page: Page.Contact, component: CompanyPage },
  { page: Page.Search, component: SearchPage },
  { page: Page.Settings, component: SettingsPage, subSection: 'settings', subSubSection: 'settings home' },
  { page: Page.Home, component: HomePage },
];
