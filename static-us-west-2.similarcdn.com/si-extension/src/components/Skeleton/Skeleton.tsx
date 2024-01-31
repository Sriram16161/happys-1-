import React from 'react';
import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const SkeletonContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #f6f7f9;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: linear-gradient(90deg, transparent 0%, #edf1f5 50%, transparent 100%);
    animation: ${waveAnimation} 1.5s ease-in-out infinite;
  }
`;

export type SkeletonProps = { width: string; height: string; className?: string };

export const Skeleton = ({ width, height, className }: SkeletonProps) => {
  return <SkeletonContainer style={{ width, height }} className={className} />;
};
