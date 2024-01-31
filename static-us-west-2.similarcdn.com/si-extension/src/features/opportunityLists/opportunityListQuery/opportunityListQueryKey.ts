const makeOpportunityListQueryKey = () => {
  return ['opportunity-list'];
};

const makeOpportunityListCountQueryKey = () => {
  return ['opportunity-list', 'count'];
};

const opportunityListQueryKey = {
  list: makeOpportunityListQueryKey,
  count: makeOpportunityListCountQueryKey,
};

export default opportunityListQueryKey;
