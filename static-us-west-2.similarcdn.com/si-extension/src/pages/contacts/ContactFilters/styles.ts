import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import styled from 'styled-components';
import { Tooltip } from '../../../components/Tooltip';

export const StyledOpenFiltersButton = styled.button`
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid #f2f2f2;
  background: ${colorsPalettes.carbon[25]};
  padding: 7px;
  position: relative;

  ${SWReactIcons} svg path {
    fill: ${colorsPalettes.carbon[500]};
    transition: fill 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${colorsPalettes.bluegrey[100]};
    color: ${colorsPalettes.blue[400]};

    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.blue[400]};
    }
  }

  &:active {
    background-color: ${colorsPalettes.blue[200]};
  }

  &:disabled {
    cursor: not-allowed;
    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.carbon[200]};
    }
  }
`;

export const StyledTooltip = styled(Tooltip)`
  margin: 8px 8px 0 0;
`;

export const StyledBadge = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 0.5px solid ${colorsPalettes.carbon[50]};
  background-color: ${colorsPalettes.blue[400]};
  top: -6px;
  right: -6px;
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[0])};
  font-size: 10px;
  font-weight: 700;
`;

export const StyledFilterSummary = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  background: ${({ isOpen }) => (isOpen ? colorsPalettes.bluegrey[100] : 'transparent')};
  border: none;
  box-shadow: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${colorsPalettes.carbon[25]};
  }

  ${SWReactIcons} {
    transition: transform 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

export const StyledFilter = styled.div`
  width: calc(100% + 32px);
  margin: 0 -16px;
`;

export const StyledFilterName = styled.span`
  ${setFontVariant('input2', colorsPalettes.carbon[500])};
  margin-right: auto;
`;

export const StyledFilterDetails = styled.div<{ isOpen: boolean }>`
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? '320px' : '0')};
  margin-bottom: ${({ isOpen }) => (isOpen ? '16px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, margin 0.3s ease-in-out;
`;

export const StyledNotEmptyIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${colorsPalettes.blue[300]};
  margin-right: 8px;
`;
