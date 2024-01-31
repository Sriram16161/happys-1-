import styled from 'styled-components';
import { mixins } from '@similarweb/styles';

export const StyledGradeText = styled.span`
  overflow: hidden;
  max-width: 0;
  font-weight: 400;
  transition: max-width 0.2s ease-in-out;
`;

export const StyledGradeContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 16px;
  padding: 0 1px;
  margin-left: 4px;
  ${mixins.setFontVariant('h6', '#793aaf')};
  font-size: 10px;
  line-height: 16px;
  background-color: #f9efff;
  border-radius: 50%;
  white-space: nowrap;
  text-align: center;
  cursor: default;

  &:hover {
    align-items: baseline;
    padding: 0 4px 0 1px;
    border-radius: 24px;

    ${StyledGradeText} {
      max-width: 200px;
      padding-left: 2px;
    }
  }
`;

export const StyledGrade = styled.span`
  min-width: 14px;
  font-weight: 700;
`;
