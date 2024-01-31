import styled, { css } from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { StyledRevealButton } from './RevealButton/styles';
import { StyledContactNoDetails } from './RevealContainer/styles';
import { TooltipContent } from '../../../components/Tooltip/styles';
import { StyledCrmExportButton, StyledCrmExportButtonSmall } from './CrmExportContainer/styles';

const ACTION_BUTTON_CONTAINER = 96;

export const StyledContactCountry = styled.p`
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[250])};
  margin: 0;
  width: 100%;
`;

export const StyledContactItem = styled.div<{ variant: 'singular' | 'listItem' }>`
  background-color: ${colorsPalettes.carbon[0]};
  padding: 12px 8px 12px 16px;
  position: relative;
  transition: background-color 0.2s ease-in-out;

  ${({ variant }) =>
    variant === 'singular' &&
    css`
      margin: 14px 24px 2px;
      padding: 12px 20px;
      box-shadow: 0px 4px 13px rgba(173, 173, 173, 0.25);
      border-radius: 8px;
      border: 0.5px solid rgba(25, 90, 254, 1);
      font-size: 16px;

      ${StyledContactCountry}, ${StyledContactName} {
        font-size: 16px;
      }
    `}

  ${({ variant }) =>
    variant === 'listItem' &&
    css`
      ${StyledRevealButton} {
        opacity: 0;
      }

      ${StyledContactNoDetails} {
        opacity: 0;
      }

      ${StyledCrmExportButton} {
        opacity: 0;
      }

      ${StyledCrmExportButtonSmall} {
        opacity: 1;
      }

      &:hover {
        ${StyledRevealButton} {
          opacity: 1;
        }

        ${StyledContactNoDetails} {
          opacity: 1;
        }

        ${StyledCrmExportButton} {
          opacity: 1;
        }

        background-color: #fbfbfb;
      }

      &:not(:last-child) {
        margin-bottom: 4px;
      }

      &:first-child .restricted_reveal ${TooltipContent} {
        top: calc(50% + 10px);

        &::after {
          top: calc(50% - 8px - 10px);
        }
      }
    `}
`;

export const StyledContactItemContainer = styled.div`
  position: relative;
`;

export const StyledContactItemColumn = styled.div`
  width: calc(100% - ${ACTION_BUTTON_CONTAINER}px);
`;

export const StyledContactActionsContainer = styled.div<{ hasPrivateData: boolean }>`
  position: absolute;
  right: 0;
  top: ${({ hasPrivateData }) => (hasPrivateData ? 0 : '50%')};
  transform: ${({ hasPrivateData }) => (hasPrivateData ? 'none' : 'translateY(-50%)')};
`;

export const StyledContactHeader = styled.div<{ hasPrivateData: boolean; hasCrmLink: boolean }>`
  width: ${({ hasPrivateData, hasCrmLink }) => {
    if (hasCrmLink) return `calc(100% - 45px)`;
    if (hasPrivateData) return `calc(100% - ${ACTION_BUTTON_CONTAINER}px)`;
    return '100%';
  }};
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin: 0 4px 4px 0;
`;

export const StyledContactDetails = styled.div`
  width: 100%;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const StyledContactName = styled.p`
  ${setFontVariant('primaryItem', colorsPalettes.carbon[500])};
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
`;

export const StyledContactTitle = styled.p`
  ${setFontVariant('report', colorsPalettes.carbon[400])};
  margin: 0 0 4px 0;
  width: 100%;
`;
