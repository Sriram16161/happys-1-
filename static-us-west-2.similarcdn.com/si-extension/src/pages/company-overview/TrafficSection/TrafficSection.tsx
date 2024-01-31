import React, { ReactNode } from 'react';
import { getTwoMonthsPeriodSinceDate } from '../../../services/timeFormat';
import { Company } from '../../../domain/company';
import { StyledSectionView } from '../styles';
import {
  StyledTrafficSectionHeader,
  StyledTrafficSectionHeading,
  StyledTrafficSectionDataRange,
  StyledDeviceIcon,
} from './styles';

export type TrafficSectionProps = {
  company: Company;
  heading: string;
  children: ReactNode;
  withPadding?: boolean;
};

export const TrafficSection = ({ company, heading, children, withPadding }: TrafficSectionProps) => {
  return (
    <StyledSectionView data-automation="TrafficSection" withPadding={withPadding}>
      <StyledTrafficSectionHeader withPadding={withPadding}>
        <StyledTrafficSectionHeading>{heading}</StyledTrafficSectionHeading>
        <StyledTrafficSectionDataRange>{getTwoMonthsPeriodSinceDate(company.yearMonth)}</StyledTrafficSectionDataRange>
        <StyledDeviceIcon size="xs" iconName="combined" />
      </StyledTrafficSectionHeader>
      {children}
    </StyledSectionView>
  );
};
