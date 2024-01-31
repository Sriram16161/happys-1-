import React, { FC, useEffect, useRef, useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { StyledIndustry, StyledIndustryTooltip } from './styles';
import { colorsPalettes } from '@similarweb/styles';

export type CompanyIndustryProps = {
  industry: string;
};

const ROW_HEIGHT = 24;

export const CompanyIndustry: FC<CompanyIndustryProps> = ({ industry }) => {
  const namesRef = useRef<HTMLDivElement>(null);
  const [isMoreThanOneRow, setIsMoreThanOneRow] = useState(false);

  useEffect(() => {
    if (namesRef?.current) {
      if (namesRef.current.clientHeight / ROW_HEIGHT > 1) setIsMoreThanOneRow(true);
    }
  }, []);

  return (
    <StyledIndustryTooltip content={industry} placement="top" minWidth={240} enabled={isMoreThanOneRow}>
      <StyledIndustry ref={namesRef}>
        <SWReactIcons size="xs" iconName="market" iconColor={colorsPalettes.bluegrey['500']} />
        {isMoreThanOneRow ? <span>{industry}</span> : industry}
      </StyledIndustry>
    </StyledIndustryTooltip>
  );
};
