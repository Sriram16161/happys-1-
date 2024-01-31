import styled from 'styled-components';

export const StyledExpandableText = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow: hidden;
`;

export const StyledExpandableTextCollapsable = styled.div<{ height: number; isCollapsed: boolean }>`
  max-height: ${({ isCollapsed, height }) => (isCollapsed ? `${height}px` : '1000px')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

export const StyledExpandCollapseButton = styled.span`
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
`;
