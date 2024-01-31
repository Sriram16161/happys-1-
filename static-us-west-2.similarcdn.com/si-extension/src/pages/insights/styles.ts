import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';

export const StyledInsightsPage = styled.div`
  border-radius: 8px;
  margin: 14px 24px;
  padding: 24px;
  border: 1px solid ${colorsPalettes.carbon[100]};
  box-shadow: 0px 3px 6px 0px rgba(14, 30, 62, 0.08);
  display: flex;
  flex-direction: column;
`;

export const StyledInsightsPageHeading = styled.h1`
  ${setFontVariant('h4')};
  margin-top: 0;
`;

export const StyledTextArea = styled(TextArea)`
  margin-bottom: 8px;
`;

export const StyledTextAreaLabel = styled.span`
  display: inline-block;
  width: 100%;
  ${setFontVariant('subtitle2', colorsPalettes.carbon[400])};
  margin-bottom: 4px;
`;

export const StyledUseCaseField = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const StyledUseCaseLabel = styled.span`
  display: inline-block;
  ${setFontVariant('subtitle2', colorsPalettes.carbon[400])};
  margin-right: 8px;
`;

export const StyledButton = styled(Button)`
  margin-top: 12px;
`;
