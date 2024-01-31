import React, { ReactNode } from 'react';
import { IconName } from '@similarweb/icons';
import { MetricIcon } from '../MetricIcon';
import { StyledCompanyInfoItem, StyledCompanyInfoItemLabel, StyledCompanyInfoItemValue } from './styles';

export type CompanyInfoItemProps = {
  label: string;
  value: ReactNode;
  iconName: IconName;
  onClick?(): void;
  className?: string;
};

export const CompanyInfoItem: React.FC<CompanyInfoItemProps> = ({ label, value, iconName, onClick, className }) => (
  <StyledCompanyInfoItem data-automation="CompanyInfo" className={className}>
    <MetricIcon iconName={iconName} />
    <div>
      <StyledCompanyInfoItemLabel data-automation="CompanyInfoLabel">{label}</StyledCompanyInfoItemLabel>
      <StyledCompanyInfoItemValue clickable={!!onClick && !!value} onClick={!!value ? onClick : undefined}>
        {value || 'N/A'}
      </StyledCompanyInfoItemValue>
    </div>
  </StyledCompanyInfoItem>
);
