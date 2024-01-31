import styled, { css } from 'styled-components';

export const StyledPrivateData = styled.div<{ animatedMount: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 12px;

  ${({ animatedMount }) =>
    animatedMount &&
    css`
      height: 0px;
      overflow: hidden;
      margin-top: 0px;
    `}
`;
