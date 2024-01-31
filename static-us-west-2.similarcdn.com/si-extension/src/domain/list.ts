export const enum OpportunityListTypeEnum {
  ManuallyCreated = 'ManuallyCreated',
  Shared = 'Shared',
  RecentlyViewed = 'RecentlyViewed',
  Crm = 'crm',
}

export type OpportunityList = {
  id: string;
  name: string;
  domains: string[];
  type: OpportunityListTypeEnum;
};
