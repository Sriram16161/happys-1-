import { Contact } from '../../domain/contact';

const createTrackingContactsService = () => {
  const getAvailableContactDetails = (contact: Contact) => {
    const details: string[] = [];

    if (contact.hasValidEmails) {
      details.push('email');
    }
    if (contact.hasMobilePhoneNumbers) {
      details.push('mobile phone');
    }
    if (contact.hasDirectPhoneNumbers) {
      details.push('direct phone');
    }

    return details.join(',');
  };

  return {
    getAvailableContactDetails,
  };
};

const TrackingContactsService = createTrackingContactsService();

export default TrackingContactsService;
