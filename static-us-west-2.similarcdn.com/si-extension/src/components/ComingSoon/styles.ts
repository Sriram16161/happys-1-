import { SWReactIcons } from '@similarweb/icons';
import { $dmSansFontFamily, colorsPalettes } from '@similarweb/styles';
import styled from 'styled-components';
import { Button } from '../Button';

export const StyledComingSoonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 90px 10px 0;
`;

export const StyledComingSoonTitle = styled.h1`
  margin: 24px 0 11px;
  color: ${colorsPalettes.carbon[400]};
  font-family: ${$dmSansFontFamily};
  font-size: 30px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.005em;
  text-align: center;
`;

export const StyledComingSoonDescription = styled.h2`
  margin: 12px 0 24px;
  color: ${colorsPalettes.carbon[300]};
  font-family: ${$dmSansFontFamily};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.005em;
  text-align: center;
`;

export const StyledComingSoonImage = styled.div`
  margin: 85px 0 16px;
`;

export const StyledComingSoonThanksImage = styled.img`
  width: 138px;
  height: 143px;
  margin: 23px 0 0 -8px;
`;

export const StyledComingSoonButton = styled(Button)`
  display: flex;
  align-items: center;
`;

export const StyledComingSoonIconButton = styled(SWReactIcons)`
  margin-right: 6px;
`;
