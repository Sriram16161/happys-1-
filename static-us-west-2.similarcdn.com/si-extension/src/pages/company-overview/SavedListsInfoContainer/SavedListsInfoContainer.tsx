import React, { useState } from 'react';
import { colorsPalettes } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { OpportunityListTypeEnum } from '../../../domain/list';
import { useOpportunityListQuery } from '../../../features/opportunityLists/opportunityListQuery/useOpportunityListQuery';
import { Tooltip } from '../../../components/Tooltip';
import { translate } from '../../../services/i18n';
import { allTrackers } from '../../../services/tracking/tracking';
import { Company } from '../../../domain/company';
import { StyledDropdown, StyledInfoButton, StyledInfoButtonWrapper } from '../CompanyActionsContainer/styles';
import { StyledListDropdownOption } from './styles';

const STATIC_LIST_URL = 'https://pro.similarweb.com/#/sales/lists/static/';

export const SavedListsInfoContainer = ({ company }: { company: Company }) => {
  const { domain, name: companyName } = company;
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const { data } = useOpportunityListQuery();

  const handleClickListButton = () => setIsDropdownOpened(true);

  const handleCloseDropdown = () => setIsDropdownOpened(false);

  const handleTrackOpenStaticList = (listName: string) =>
    allTrackers.dispatchTrackEvent(
      'company data',
      'open static list',
      `view company in static list/${listName}/${companyName}`
    );

  const listsContainingDomain = data?.filter((list) => list.domains.includes(domain));

  if (!listsContainingDomain || listsContainingDomain?.length === 0) return null;

  return (
    <StyledInfoButtonWrapper>
      {listsContainingDomain.length === 1 ? (
        <Tooltip placement="top" content={translate('company.save_to_list.view_list')} minWidth={82}>
          <StyledInfoButton>
            <a
              href={`${STATIC_LIST_URL}${listsContainingDomain[0].id}`}
              target="_blank"
              rel="noreferrer"
              onMouseDown={() => handleTrackOpenStaticList(listsContainingDomain[0].name)}
            >
              <SWReactIcons iconName="similar-icon-bw" size="xs" />
            </a>
          </StyledInfoButton>
        </Tooltip>
      ) : (
        <>
          <StyledInfoButton onClick={handleClickListButton} isActive={isDropdownOpened}>
            <SWReactIcons iconName="similar-icon-bw" size="xs" />
          </StyledInfoButton>
          <StyledDropdown isOpened={isDropdownOpened} onClose={handleCloseDropdown} minWidth={234} placement="right">
            {listsContainingDomain.map(({ id, name, type }) => (
              <a
                href={`${STATIC_LIST_URL}${id}`}
                key={id}
                target="_blank"
                rel="noreferrer"
                onMouseDown={() => handleTrackOpenStaticList(name)}
              >
                <StyledListDropdownOption>
                  <SWReactIcons
                    iconName={type === OpportunityListTypeEnum.Shared ? 'assign-to-user' : 'snippet-list'}
                    iconColor={colorsPalettes.carbon[200]}
                  />
                  {name}
                </StyledListDropdownOption>
              </a>
            ))}
          </StyledDropdown>
        </>
      )}
    </StyledInfoButtonWrapper>
  );
};
