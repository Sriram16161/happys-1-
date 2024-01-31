import styled from 'styled-components';
import { $dmSansFontFamily, colorsPalettes } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledPersonaFitLabel = styled.span`
  font-family: ${$dmSansFontFamily};
  font-size: 10px;
  line-height: 16px;
  font-weight: 400;
  color: ${colorsPalettes.teal[600]};
  overflow: hidden;
  max-width: 0;
  background-color: #e6faf5;
  transition: max-width 0.2s ease-in-out;
  white-space: nowrap;
`;

export const StyledPersonaFit = styled.div`
  padding: 3px;
  margin-left: 4px;
  border-radius: 50%;
  height: 16px;
  background-color: ${colorsPalettes.torquoise[50]};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: padding 0.2s ease-in-out;

  &:hover {
    padding: 3px 6px 3px 3px;
    border-radius: 24px;

    ${StyledPersonaFitLabel} {
      max-width: 100px;
    }
  }

  ${SWReactIcons} {
    svg {
      width: 10px;
      height: 10px;
    }

    path {
      fill: ${colorsPalettes.teal[600]};
    }
  }
`;
