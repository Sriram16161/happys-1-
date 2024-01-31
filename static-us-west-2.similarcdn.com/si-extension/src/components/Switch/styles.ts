import { colorsPalettes } from '@similarweb/styles';
import styled from 'styled-components';

const blue = colorsPalettes.blue[400];
const gray = colorsPalettes.carbon[100];
const disabled = colorsPalettes.carbon[50];
const disabledBackground = colorsPalettes.carbon[100];

export const SwitchContainer = styled.div<{ isDisabled: boolean }>`
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: relative;
  flex-shrink: 0;
  width: 36px;
  margin-left: 0px;
  padding: 4px 0px 6px 2px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  &:active,
  &:focus {
    div:first-of-type {
      box-shadow: ${({ isDisabled }) => (isDisabled ? 'none' : `0 0 0px 10pxrgba(#CBD1D7, 0.1)`)};
    }
  }
`;

export const SwitchBackground = styled.div<{ isDisabled: boolean; isSelected: boolean }>`
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  width: 100%;
  height: 14px;
  border-radius: 30px;
  background-color: ${({ isDisabled, isSelected }) => (isDisabled ? disabledBackground : isSelected ? blue : gray)};
  opacity: 0.5;
`;

export const SwitchCircle = styled.div<{ isDisabled: boolean; isSelected: boolean }>`
  background-color: ${({ isDisabled, isSelected }) => (isDisabled ? disabled : isSelected ? blue : gray)};
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: ${({ isSelected }) => (isSelected ? '100%' : '0px')};
  width: 22px;
  height: 22px;
  line-height: 24px;
  margin-left: ${({ isSelected }) => (isSelected ? '-20px' : '0px')};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.24), 0 0 1px 0 rgba(0, 0, 0, 0.12);
  border-style: solid;
  border-width: 0.5px;
  border-image-source: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.06) 20%,
    rgba(255, 255, 255, 0)
  );
  border-image-slice: 1;
`;
