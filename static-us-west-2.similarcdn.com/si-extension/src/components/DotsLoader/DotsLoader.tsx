import styled, { keyframes } from 'styled-components';

const $color = (opacity = 1) => `rgba(0, 82, 236, ${opacity})`;
const $duration = '1s';
const $gap = (factor = 1) => -1 * 11 * factor;

const DotsLoaderAnimation = (multiplier = 1) => keyframes`
  0% {
            box-shadow: ${$gap(3 * multiplier)}px 0 0 0 ${$color()},
            ${$gap(2 * multiplier)}px 0 0 0 ${$color(0.2)},
            ${$gap(1 * multiplier)}px 0 0 0 ${$color(0.2)};
    }

        33% {
            box-shadow: ${$gap(3 * multiplier)}px 0 0 0 ${$color(0.2)},
            ${$gap(2 * multiplier)}px 0 0 0 ${$color()},
            ${$gap(1 * multiplier)}px 0 0 0 ${$color(0.2)};
    }

        66% {
            box-shadow: ${$gap(3 * multiplier)}px 0 0 0 ${$color(0.2)},
            ${$gap(2 * multiplier)}px 0 0 0 ${$color(0.2)},
            ${$gap(1 * multiplier)}px 0 0 0 ${$color()};
    }
        100% {
            box-shadow: ${$gap(3 * multiplier)}px 0 0 0 ${$color(0.2)},
            ${$gap(2 * multiplier)}px 0 0 0 ${$color(0.2)},
            ${$gap(1 * multiplier)}px 0 0 0 ${$color(0.2)};
    }
`;
export const DotsLoader = styled.div<{ multiplier?: number; dotWidth?: number }>`
  width: ${({ dotWidth = 6 }) => dotWidth}px;
  height: ${({ dotWidth = 6 }) => dotWidth}px;
  border-radius: 50%;
  animation: ${({ multiplier = 1 }) => DotsLoaderAnimation(multiplier)} ${$duration} linear infinite;
`;
