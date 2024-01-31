import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';

export const StyledScrollInfo = styled.div`
  width: 100%;
  height: 158px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 70px;
  border-radius: 4px;
  background-color: #fafafa;
`;

export const StyledScrollInfoText = styled.p`
  text-align: center;
  ${setFontVariant('button', colorsPalettes.carbon[200])};
  font-weight: 500;
  margin: 8px 0 0 0;
`;
