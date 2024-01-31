import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { translate } from '../../../../services/i18n';
import TrackingContactsService from '../../../../services/tracking/TrackingContactsService';
import { allTrackers } from '../../../../services/tracking/tracking';
import { useUseCases } from '../../../../UseCaseProvider';
import { Contact, hasDataToReveal } from '../../../../domain/contact';
import { useAppState } from '../../../../AppStateProvider';
import { Tooltip } from '../../../../components/Tooltip';
import { RevealButton } from '../RevealButton';
import { StyledContactNoDetails } from './styles';

export type RevealContainerProps = {
  contact: Contact;
  setShouldAnimatePrivateDataMount: (shouldAnimate: boolean) => void;
};

export const RevealContainer: FC<RevealContainerProps> = ({ contact, setShouldAnimatePrivateDataMount }) => {
  const { revealContact } = useUseCases();
  const { notRevealedContactsIds } = useAppState();

  const trackRevealFinish = ({ isSuccessful }: { isSuccessful: boolean }) => {
    const eventName = isSuccessful ? 'revealed successfully' : 'revealed failure';
    allTrackers.dispatchTrackEvent('contacts', eventName, 'single reveal/1/1');
  };

  const onRevealFinish = ({ isSuccessful }: { isSuccessful: boolean }) => {
    trackRevealFinish({ isSuccessful });
    setShouldAnimatePrivateDataMount(true);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: revealContact,
    onSuccess: onRevealFinish,
    onError: () => trackRevealFinish({ isSuccessful: false }),
  });

  const handleRevealClick = () => {
    mutate(contact.id);
    allTrackers.dispatchTrackEvent(
      'person data',
      'click reveal',
      `reveal contact/${TrackingContactsService.getAvailableContactDetails(contact)}/${contact.title}`
    );
  };

  const isRevealError = notRevealedContactsIds.includes(contact.id);
  const isRevealAvailable = hasDataToReveal(contact);

  if (isRevealError) {
    return (
      <Tooltip content={translate('contact_card.reveal_failed')} placement="left" minWidth={160}>
        <SWReactIcons iconColor={colorsPalettes.red['400']} iconName="alert-circle" size="xs" />
      </Tooltip>
    );
  }
  if (!isRevealAvailable) {
    return <StyledContactNoDetails>{translate('contact_card.no_details')}</StyledContactNoDetails>;
  }

  if (!contact.isRevealed) {
    return (
      <RevealButton
        hasDirectPhone={contact.hasDirectPhoneNumbers}
        hasEmail={contact.hasValidEmails}
        hasMobilePhone={contact.hasMobilePhoneNumbers}
        onClick={handleRevealClick}
        isLoading={isLoading}
      />
    );
  }

  return null;
};
