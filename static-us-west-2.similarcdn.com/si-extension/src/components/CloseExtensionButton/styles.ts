import styled from 'styled-components';
import { colorsPalettes } from '@similarweb/styles';

export const StyledCloseButton = styled.button`
  padding: 4px;
  cursor: pointer;
  box-shadow: none;
  border: none;
  position: relative;
  background-color: transparent;

  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 2px;
    border-radius: 2px;
    background-color: ${colorsPalettes.carbon[300]};
    top: calc(50% - 1px);
    left: calc(50% - 6px);
  }
`;
