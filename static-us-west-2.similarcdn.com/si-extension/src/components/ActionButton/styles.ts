import styled, { css, keyframes } from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

const spinAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

export const StyledActionButton = styled.button<{ isActive?: boolean; isLoading?: boolean; isSelected?: boolean }>`
  border-radius: 3px;
  background-color: ${({ isActive, isSelected }) => {
    if (isActive) return colorsPalettes.bluegrey[300];
    if (isSelected) return colorsPalettes.carbon[50];
    return colorsPalettes.carbon[25];
  }};
  padding: 7px;
  ${(props) =>
    setFontVariant('sectionTitle', props.isLoading ? colorsPalettes.carbon[200] : colorsPalettes.carbon[500])};
  font-weight: 500;
  line-height: 16px;
  border: 1px solid #f2f2f2;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  ${SWReactIcons} {
    margin: 0 4px;

    svg path {
      fill: ${(props) => (props.isActive ? colorsPalettes.blue[400] : colorsPalettes.carbon[500])};
      transition: fill 0.2s ease-in-out;
    }
  }

  &:hover {
    background-color: ${colorsPalettes.bluegrey[100]};
    color: ${colorsPalettes.blue[400]};

    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.blue[400]};
    }
  }

  &:active {
    background-color: ${colorsPalettes.bluegrey[300]};
    color: ${colorsPalettes.blue[400]};

    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.blue[400]};
    }
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colorsPalettes.carbon[25]};
    color: ${colorsPalettes.carbon[200]}!important;

    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.carbon[200]}!important;
    }
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
      opacity: 0.5 !important;
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1 !important;
      color: ${colorsPalettes.blue[400]};

      ${SWReactIcons} svg path {
        fill: ${colorsPalettes.blue[400]};
      }
    `}

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    margin-right: 6px;
    border-radius: 50%;
    border: 3px solid ${colorsPalettes.carbon[200]};
    border-top-color: transparent;
    animation: ${spinAnimation} 0.8s linear infinite;
    display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
    box-sizing: border-box;
  }
`;

export const StyledActionButtonSmall = styled(StyledActionButton)`
  padding: 3px;
`;
