import styled, { css, keyframes } from 'styled-components';
import { colorsPalettes } from '@similarweb/styles';
import { RevealButtonProps } from './RevealButton';
import { SWReactIcons } from '@similarweb/icons';
import { Tooltip } from '../../../../components/Tooltip';
import { TooltipContent } from '../../../../components/Tooltip/styles';
import { PrivateDataType } from '../../../../domain/contact';

const spinAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

const iconColor = (dataType: PrivateDataType) => (props: RevealButtonProps & { disabled?: boolean }) => {
  const hasDataKey = (
    { 'direct-phone': 'hasDirectPhone', 'mobile-phone': 'hasMobilePhone', email: 'hasEmail' } as const
  )[dataType];

  const hasData = props[hasDataKey];

  if (props.disabled) return '#AAB2BA';

  return hasData ? colorsPalettes.carbon[0] : colorsPalettes.sky[300];
};

export const StyledRevealButton = styled.button<RevealButtonProps>`
  background-color: ${({ disabled }) => (disabled ? colorsPalettes.blue[350] : colorsPalettes.blue[400])};
  padding: 4px 8px;
  border-radius: 18px;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 4px;
  align-items: center;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? colorsPalettes.blue[350] : colorsPalettes.blue[500])};
  }

  ${SWReactIcons} {
    width: 14px;
    height: 14px;

    &.direct-phone {
      width: 12px;
      height: 12px;
    }
  }

  .mobile-phone path {
    fill: ${iconColor('mobile-phone')};
  }

  .direct-phone path {
    stroke: ${iconColor('direct-phone')};
  }

  .email path {
    fill: ${iconColor('email')};
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
      opacity: 0.5 !important;
    `}

  &::after {
    content: '';
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-top-color: transparent;
    animation: ${spinAnimation} 0.8s linear infinite;
    display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
    box-sizing: border-box;
  }
`;

export const StyledTooltip = styled(Tooltip)<{ wide: boolean }>`
  ${TooltipContent} {
    min-width: ${({ wide }) => (wide ? '155px' : 'auto')};
  }
`;
