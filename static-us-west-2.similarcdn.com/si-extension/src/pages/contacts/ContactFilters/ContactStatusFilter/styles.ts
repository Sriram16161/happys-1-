import styled from 'styled-components';
import { StyledFilterDetails } from '../styles';
import { Checkbox } from '../../../../components/Checkbox';

export const StyledStatusFilterDetails = styled(StyledFilterDetails)`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 0px 24px;
  row-gap: 16px;
`;

export const StyledRevealedGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-left: 30px;
`;
