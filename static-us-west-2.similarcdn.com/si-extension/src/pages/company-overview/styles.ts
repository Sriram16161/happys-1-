import styled from 'styled-components';
import { $dmSansFontFamily, colorsPalettes } from '@similarweb/styles';
import { CompanyInfoItem } from './CompanyInfoItem';

export const StyledCompanyOverview = styled.div`
  padding: 14px 24px;
`;

export const StyledExpandableText = styled.div`
  color: ${colorsPalettes.carbon[400]};
  font-family: ${$dmSansFontFamily};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 12px 0;
`;

export const StyledCompanyInfoItem = styled(CompanyInfoItem)`
  margin-bottom: 24px;
`;

export const StyledSectionView = styled.div<{ withPadding?: boolean }>`
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  padding: ${({ withPadding }) => (withPadding ? '23px' : '23px 0 12px')};
  margin-bottom: 16px;
  border: 1px solid #f3f3f3;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
`;

export const StyledSeparator = styled.div`
  border-bottom: 0.5px solid ${colorsPalettes.carbon['200']};
  width: 100%;
  margin: 8px 0 24px;
`;
