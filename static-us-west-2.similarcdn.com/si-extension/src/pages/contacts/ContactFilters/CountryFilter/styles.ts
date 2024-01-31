import { SWReactCountryIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import styled from 'styled-components';
import SearchTextBox from '../../../../components/SearchTextBox/SearchTextBox';
import { StyledClearIconContainer } from '../../../../components/SearchTextBox/styles';

export const StyledCountriesSearch = styled(SearchTextBox)`
  border-radius: 0;
  border: none;
  padding: 8px 16px;

  ${StyledClearIconContainer} {
    right: 20px;
  }
`;

export const StyledDivider = styled.div<{ color?: string }>`
  width: 100%;
  height: 1px;
  background-color: ${({ color }) => color || colorsPalettes.blue[400]};
  margin: 8px 0 7px;
  flex-shrink: 0;
`;

export const StyledCountryList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 245px;
  overflow-y: auto;
  width: 100%;
`;

export const StyledCountryIcon = styled(SWReactCountryIcons)`
  width: 22px;
  height: 22px;
  margin-right: 8px;
`;
