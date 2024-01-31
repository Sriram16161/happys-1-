import styled, { css } from 'styled-components';
import { colorsPalettes, rgba, setFontVariant } from '@similarweb/styles';
import { ButtonVariant } from './ButtonVariant';

export const StyledButton = styled.button<{ variant: ButtonVariant }>`
  padding: 8px 16px;
  ${setFontVariant('button', colorsPalettes.carbon[0])};
  border: none;
  cursor: pointer;
  border-radius: 18px;
  transition: background-color 0.2s ease-in-out;

  &:disabled {
    background-color: ${colorsPalettes.carbon[200]};
    cursor: not-allowed;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${colorsPalettes.blue[400]};
          color: ${colorsPalettes.carbon[0]};

          &:hover,
          &:active {
            background-color: ${colorsPalettes.blue[500]};
          }

          &:disabled {
            background-color: ${colorsPalettes.carbon[200]};
          }
        `;
      case 'flat':
        return css`
          background-color: ${colorsPalettes.carbon[0]};
          color: ${colorsPalettes.blue[400]};

          &:hover {
            background-color: ${rgba(colorsPalettes.carbon[200], 0.2)};
          }

          &:active {
            background-color: ${colorsPalettes.blue[200]};
            color: ${colorsPalettes.blue[500]};
          }

          &:disabled {
            color: ${colorsPalettes.carbon[200]};
            background-color: ${colorsPalettes.carbon[0]};
          }
        `;
      case 'trial':
        return css`
          background-color: ${colorsPalettes.indigo[300]};
          color: ${colorsPalettes.carbon[0]};

          &:hover {
            background-color: ${colorsPalettes.indigo[400]};
          }
        `;
      case 'flatDanger':
        return css`
          background-color: ${colorsPalettes.carbon[0]};
          color: ${colorsPalettes.red['s100']};

          &:hover,
          &:active {
            background-color: ${rgba(colorsPalettes.carbon[200], 0.2)};
            color: ${colorsPalettes.red[500]};
          }
        `;
      case 'flatDark':
        return css`
          background-color: ${colorsPalettes.carbon[0]};
          color: ${colorsPalettes.carbon[500]};

          &:hover {
            background-color: ${rgba(colorsPalettes.carbon[200], 0.2)};
          }

          &:active {
            background-color: ${colorsPalettes.blue[200]};
          }
        `;
      case 'danger':
        return css`
          background-color: ${colorsPalettes.red['s100']};
          color: ${colorsPalettes.carbon[0]};

          &:hover,
          &:active {
            background-color: ${colorsPalettes.red[500]};
          }
        `;
    }
  }}
`;
