import React from 'react';
import { translate } from '../../../../services/i18n';
import { StyledGradeContainer, StyledGrade, StyledGradeText } from './styles';

export const ContactGrade = ({ grade }: { grade: string }) => (
  <StyledGradeContainer data-automation="ContactGrade">
    <StyledGrade>{grade}</StyledGrade>
    <StyledGradeText>{translate('contact_card.confidence_grade')}</StyledGradeText>
  </StyledGradeContainer>
);
