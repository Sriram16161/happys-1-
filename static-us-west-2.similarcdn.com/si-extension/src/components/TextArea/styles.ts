import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
  resize: none;
  border: 1px solid ${colorsPalettes.carbon[100]};
  background-color: ${colorsPalettes.carbon[0]};
  border-radius: 3px;
  width: 100%;
  outline: none;
  overflow: hidden;
  padding: 6px;
  ${setFontVariant('body2', colorsPalettes.carbon[400])};
`;
