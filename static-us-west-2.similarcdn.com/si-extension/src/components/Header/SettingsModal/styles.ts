import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';

export const StyledField = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  align-items: center;
`;

export const StyledTextInput = styled.input`
  flex-grow: 1;
  ${setFontVariant('input2')};
  margin-left: 4px;
  padding: 4px;
  border: 1px solid ${colorsPalettes.midnight[50]};
  border-radius: 3px;
`;

export const StyledToggleField = styled.div`
  display: inline-flex;
  column-gap: 8px;
`;
