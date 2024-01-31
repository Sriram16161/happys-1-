import styled, { css } from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { CompanyNameVariant } from './CompanyName';
import { Tooltip } from '../Tooltip';

export const StyledCompanyNameContainer = styled.div<{ variant?: CompanyNameVariant }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ variant }) => (variant === 'contacts_list' ? 0 : '16px')};
`;

export const StyledCompanyName = styled.a<{ lineHeight: number }>`
  margin: 0 8px 0 12px;
  ${setFontVariant('h5', colorsPalettes.carbon[500])};
  text-decoration: none;
  font-size: ${({ lineHeight }) => lineHeight}px;
  line-height: ${({ lineHeight }) => lineHeight}px;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledCompanyWebsiteIcon = styled(SWReactIcons)`
  svg path {
    fill: ${colorsPalettes.blue[400]};
  }
`;

export const StyledCompanyIconTooltip = styled(Tooltip)<{ isMoreThanOneRow?: boolean }>`
  ${({ isMoreThanOneRow }) => {
    if (isMoreThanOneRow) {
      return css`
        align-self: flex-start;
        margin-top: 4px;
      `;
    }
  }}
`;

export const StyledCompanyLogo = styled.img<{ isMoreThanOneRow?: boolean }>`
  ${({ isMoreThanOneRow }) => {
    if (isMoreThanOneRow) {
      return css`
        align-self: flex-start;
        margin-top: 4px;
      `;
    }
  }}
`;
