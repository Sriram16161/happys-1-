import { useUserQuery } from '../features/user/useUserQuery';

const SW_ACCOUNT_IDS = [10216725, 10000003];

export const useIsSwUser = () => {
  const userQuery = useUserQuery();
  return SW_ACCOUNT_IDS.includes(userQuery.data?.accountId as number);
};
