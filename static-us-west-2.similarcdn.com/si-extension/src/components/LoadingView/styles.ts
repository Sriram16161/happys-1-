import { Skeleton } from '../Skeleton';
import styled from 'styled-components';

export const StyledSkeleton = styled(Skeleton)`
  margin-bottom: 16px;
`;

export const StyledLoadingView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 66px 26px;
`;

export const StyledSkeletonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;
