import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';

export const StyledFilterContactDetailsSubtitle = styled.div`
  ${setFontVariant('input2', colorsPalettes.carbon[300])};
  padding: 18px 16px 4px;
`;

export const StyledFilterContactDetailsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const StyledFilterContactDetailsOption = styled.span`
  padding-left: 8px;
  ${setFontVariant('body1', colorsPalettes.carbon[300])};
`;
