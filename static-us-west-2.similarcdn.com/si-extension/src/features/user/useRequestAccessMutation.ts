import { useMutation } from 'react-query';
import queryString from 'query-string';
import { useUserQuery } from './useUserQuery';
import { HttpClient } from '../../services/HttpClient';

export const useRequestAccessMutation = () => {
  const userQuery = useUserQuery();

  return useMutation({
    mutationKey: `${userQuery.data?.userId ?? ''}-request-access`,
    mutationFn: () => {
      const user = userQuery.data!;
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone ?? '',
        planId: user.accountType,
        message: '',
        subject: `Contact Sales: Sales Intelligence Extension`,
        company: '',
        formLocationUrl: '',
      };
      const body = queryString.stringify(payload);
      const options: RequestInit = {
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      };
      return HttpClient.post('https://gro.similarweb.com/contactus/api/forms/contactus', body, options);
    },
  });
};
