import React from 'react';
import { Skeleton } from '../Skeleton';
import { StyledSkeletonGroup, StyledSkeleton, StyledLoadingView } from './styles';

const SkeletonGroup = () => (
  <StyledSkeletonGroup>
    <StyledSkeleton width="100%" height="22px" />
    <Skeleton width="160px" height="14px" />
  </StyledSkeletonGroup>
);

export const LoadingView = () => (
  <StyledLoadingView data-automation="LoadingView">
    <SkeletonGroup />
    <SkeletonGroup />
    <SkeletonGroup />
  </StyledLoadingView>
);
