import React, { FC, useRef } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { useIsWithinLinkedin } from '../../hooks/useIsWithinLinkedin';
import { Company } from '../../domain/company';
import { allTrackers } from '../../services/tracking/tracking';
import { Tooltip } from '../Tooltip';
import { translate } from '../../services/i18n';
import {
  StyledCompanyName,
  StyledCompanyWebsiteIcon,
  StyledCompanyNameContainer,
  StyledCompanyIconTooltip,
  StyledCompanyLogo,
} from './styles';

export type CompanyNameVariant = 'overview' | 'contacts_list';

export type CompanyOverviewProps = {
  company: Company | undefined;
  variant?: CompanyNameVariant;
};

export const CompanyName: FC<CompanyOverviewProps> = ({ company, variant = 'overview' }) => {
  const isWithinLinkedin = useIsWithinLinkedin();
  const namesRef = useRef<HTMLAnchorElement>(null);

  if (!company) return null;

  const handleWebsiteClick = () =>
    allTrackers.dispatchTrackEvent('company data', 'click website link', `open website/${company.domain}`);

  const handleLinkedinLinkClick = () =>
    allTrackers.dispatchTrackEvent('company data', 'click linkedin link', `open linkedin/${company.linkedinId || ''}`);

  const handleCompanyOverviewClick = () =>
    allTrackers.dispatchTrackEvent('company data', 'click on company name', `open company overview/${company.name}`);

  const lineHeight = variant === 'contacts_list' ? 18 : 24;

  const isMoreThanOneRow = namesRef?.current?.clientHeight ? namesRef.current.clientHeight / lineHeight > 1 : false;

  const companyName = company.name || company.domain;

  return (
    <StyledCompanyNameContainer variant={variant}>
      <StyledCompanyLogo
        src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${company.domain}&size=32`}
        width="24px"
        height="24px"
        alt={company.name}
        isMoreThanOneRow={isMoreThanOneRow}
      />
      <Tooltip
        content={translate('company.overview.name.tooltip')}
        placement="top"
        minWidth={companyName.length > 10 ? 180 : 130}
        isPositionFixed={variant === 'contacts_list'}
      >
        <StyledCompanyName
          ref={namesRef}
          data-automation="CompanyName"
          href={`https://pro.similarweb.com/#/sales/account-overview/${company.domain}/company`}
          target="_blank"
          rel="noreferrer"
          lineHeight={lineHeight}
          onMouseDown={handleCompanyOverviewClick}
        >
          {companyName}
        </StyledCompanyName>
      </Tooltip>
      {isWithinLinkedin && (
        <StyledCompanyIconTooltip
          content={translate('company.overview.website.tooltip')}
          placement="top"
          minWidth={130}
          isPositionFixed={variant === 'contacts_list'}
          isMoreThanOneRow={isMoreThanOneRow}
        >
          <a href={`https://${company.domain}`} target="_blank" rel="noreferrer" onMouseDown={handleWebsiteClick}>
            <StyledCompanyWebsiteIcon iconName="link-out" size="xs" />
          </a>
        </StyledCompanyIconTooltip>
      )}
      {!isWithinLinkedin && company.linkedinId && (
        <StyledCompanyIconTooltip
          content={translate('company.overview.linkedin.tooltip')}
          placement="top"
          minWidth={130}
          isPositionFixed={variant === 'contacts_list'}
          isMoreThanOneRow={isMoreThanOneRow}
        >
          <a
            href={`https://linkedin.com/company/${company.linkedinId}`}
            target="_blank"
            rel="noreferrer"
            onMouseDown={handleLinkedinLinkClick}
          >
            <SWReactIcons iconName="linkedin-circle-blue" size="xs" />
          </a>
        </StyledCompanyIconTooltip>
      )}
    </StyledCompanyNameContainer>
  );
};
