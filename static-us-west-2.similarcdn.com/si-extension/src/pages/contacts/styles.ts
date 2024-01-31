import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../components/Header/styles';
import { NAV_HEIGHT } from '../../components/Tabs/styles';
import { CONTAINER_MARGIN } from '../styles';

export const StyledContactsScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 1 auto;
  max-height: calc(100vh - ${NAV_HEIGHT}px - ${HEADER_HEIGHT}px - ${CONTAINER_MARGIN}px - 2px);
  overflow: auto;
  margin-top: ${CONTAINER_MARGIN}px;
  border-radius: 8px 8px 0px 0px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px -1px 16px 0px;
  border: 1px solid rgb(239, 239, 239);
  border-top: none;
`;

export const StyledContactsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  position: sticky;
  top: 0px;
  z-index: 1;
  background: #fff;
  border-radius: 8px 8px 0px 0px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  box-shadow: 0px -1px 16px 0px rgba(0, 0, 0, 0.05);
`;

export const StyledContactsSearchHeader = styled(StyledContactsHeader)`
  border: none;
`;

export const StyledCompanyName = styled.div`
  margin-bottom: 16px;
`;
