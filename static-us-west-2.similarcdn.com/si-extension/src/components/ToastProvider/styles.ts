import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import styled, { css } from 'styled-components';

export const ToastView = styled.div<{ isInfoIcon?: boolean }>`
  width: 80%;
  max-width: max-content;
  padding: 10px 12px;
  background-color: ${colorsPalettes.midnight[500]};
  border-radius: 4px;
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translate(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${SWReactIcons} {
    flex: none;
    margin: 0 8px 0 3.5px;
    width: ${({ isInfoIcon }) => (isInfoIcon ? '16px' : '9px')};
    height: ${({ isInfoIcon }) => (isInfoIcon ? '16px' : '9px')};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    rotate: ${({ isInfoIcon }) => (isInfoIcon ? '180deg' : '0')};

    svg path {
      fill: ${colorsPalettes.carbon[0]};

      ${({ isInfoIcon }) => {
        if (isInfoIcon)
          return css`
            &:first-child {
              fill: none;
            }
          `;
      }}
    }
  }
`;

export const ToastContent = styled.p`
  ${setFontVariant('input2', colorsPalettes.carbon[0])};
  margin: 0;
`;
