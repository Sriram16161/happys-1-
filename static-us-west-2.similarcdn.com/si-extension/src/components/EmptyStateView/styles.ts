import styled, { css } from 'styled-components';
import { colorsPalettes, setFontVariant, $dmSansFontFamily } from '@similarweb/styles';
import { EmptyStateVariant } from './EmptyStateView';

export const StyledEmptyStateContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
`;

export const StyledEmptyStateImage = styled.img<{ variant: EmptyStateVariant }>`
  ${({ variant }) => {
    switch (variant) {
      case 'lens':
        return css`
          margin: 163px 0 10px 5px;
          height: 218px;
        `;
      case 'lens-rised':
        return css`
          margin: 88px 0 10px 5px;
          height: 218px;
        `;
      case 'lens-small':
        return css`
          margin: 72px 0 12px 3px;
          height: 162px;
          width: 171px;
        `;
      case 'girl':
        return css`
          margin: 107px 0 0 50px;
          height: 228px;
        `;
      case 'girl-in':
        return css`
          margin: 172px 0 7px 32px;
          height: 222px;
        `;
    }
  }}
`;

export const StyledEmptyStateTitle = styled.p`
  margin: 20px 0 16px 0;
  ${setFontVariant('h5', colorsPalettes.carbon[400])};
  font-weight: 700;
  text-align: center;
`;

export const StyledEmptyStateDescription = styled.p`
  margin: 0;
  color: ${colorsPalettes.carbon[300]};
  font-family: ${$dmSansFontFamily};
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
`;
