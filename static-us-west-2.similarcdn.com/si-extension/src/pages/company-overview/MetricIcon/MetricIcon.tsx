import React from 'react';
import { IconName, SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { StyledMetricIcon } from './styles';

export type CompanyInfoItemProps = {
  iconName: IconName;
  className?: string;
};

export const MetricIcon: React.FC<CompanyInfoItemProps> = ({ iconName }) => (
  <StyledMetricIcon>
    <SWReactIcons iconName={iconName} size="xs" iconColor={colorsPalettes.bluegrey[500]} />
  </StyledMetricIcon>
);
