import React, { FC } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { copyText } from '../../../services/browser';
import { appStore } from '../../../services/appStore';
import { GenerateEmailMutation } from '../useGenerateEmailMutation';
import { StyledCopyButton, StyledEmailPartPreview, StyledEmailPreviewContainer, StyledSeparator } from './styles';

export const EmailPreview: FC<{ emailMutation: GenerateEmailMutation }> = ({ emailMutation }) => {
  const email = emailMutation.data;

  if (emailMutation.isLoading) return <div>Generating...</div>;

  if (emailMutation.isError) return <pre>{JSON.stringify(emailMutation.error.message, null, 2)}</pre>;

  if (!email) return null;

  const handleCopyClick = () => {
    const body = `${email.subject}\n\n${email.intro}\n\n${email.opportunity}\n\n${email.valueProposition}\n\n${email.callToAction}\n\n${email.signature}`;
    copyText(body)
      .then(() => {
        appStore.setToast({ content: 'Email copied', icon: 'checked' });
      })
      .catch(console.error);
  };

  return (
    <>
      <StyledSeparator />
      <StyledEmailPreviewContainer>
        <StyledEmailPartPreview>{email.subject}</StyledEmailPartPreview>
        <StyledEmailPartPreview>{email.intro}</StyledEmailPartPreview>
        <StyledEmailPartPreview>{email.opportunity}</StyledEmailPartPreview>
        <StyledEmailPartPreview>{email.valueProposition}</StyledEmailPartPreview>
        <StyledEmailPartPreview>{email.callToAction}</StyledEmailPartPreview>
        <StyledEmailPartPreview>{email.signature}</StyledEmailPartPreview>
      </StyledEmailPreviewContainer>
      <StyledCopyButton onClick={handleCopyClick} variant="flat">
        Copy Email
        <SWReactIcons iconName="copy-rounded" size="xs" />
      </StyledCopyButton>
    </>
  );
};
