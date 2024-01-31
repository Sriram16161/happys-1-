import styled from 'styled-components';
import { colorsPalettes } from '@similarweb/styles';
import { ActionButton } from '../../../components/ActionButton';
import { Dropdown } from '../../../components/Dropdown';
import { StyledActionButtonSmall } from '../../../components/ActionButton/styles';
import { StyledDropdownOption } from '../../../components/Dropdown/styles';
import { Tooltip } from '../../../components/Tooltip';

export const StyledActionButtonWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 0 0 16px;
`;

export const StyledActionButton = styled(ActionButton)`
  width: 100%;
  justify-content: center;
`;

export const StyledDropdown = styled(Dropdown)`
  padding: 8px 0;
  overflow: visible;
}`;

export const StyledInfoButton = styled(StyledActionButtonSmall)`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

export const StyledInfoButtonWrapper = styled.div`
  margin-left: 6px;
`;

export const StyledExportDropdownOption = styled(StyledDropdownOption)<{ isDisabled?: boolean }>`
  color: ${({ isDisabled }) => (isDisabled ? colorsPalettes.carbon[100] : colorsPalettes.carbon[500])};
`;

export const StyledExportDropdownOptionTooltip = styled(Tooltip)`
  width: 100%;
`;

export const StyledTooltipTitle = styled.p`
  font-weight: 700;
  margin: 0;
}`;

export const StyledTooltipText = styled.p`
  margin: 0;
}`;
