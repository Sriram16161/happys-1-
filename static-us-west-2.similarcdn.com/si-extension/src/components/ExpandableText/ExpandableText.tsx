import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import generateCollapsedText from './generateCollapsedText';
import { StyledExpandableText, StyledExpandableTextCollapsable, StyledExpandCollapseButton } from './styles';

export type ExpandableTextProps = {
  lineHeight: number;
  text?: string;
  oneTime?: boolean;
};

export function ExpandableText({ lineHeight, text, oneTime = false }: ExpandableTextProps) {
  const { t } = useTranslation();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isThreeLinesRender, setIsThreeLinesRender] = useState(true);
  const [isTwoLinesRender, setIsTwoLinesRender] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [maxLinesQuantity, setMaxLinesQuantity] = useState(3);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [collapsedText, setCollapsedText] = useState('');

  useEffect(() => {
    if (isThreeLinesRender && elementRef.current && !isLongEnough) {
      if (elementRef.current.scrollHeight > elementRef.current.clientHeight) {
        setIsLongEnough(true);
        if (elementRef.current.scrollHeight === 4 * lineHeight) {
          setIsTwoLinesRender(true);
          setIsThreeLinesRender(false);
          setMaxLinesQuantity(2);
        }
      } else {
        setIsThreeLinesRender(false);
      }
    }
  }, [isThreeLinesRender]);

  useEffect(() => {
    if (isLongEnough && elementRef.current) {
      const collapsedText = generateCollapsedText(elementRef.current, elementRef.current.textContent || '');
      setCollapsedText(collapsedText.substring(0, collapsedText.length - t('common.show_more').length - 10));
      setIsThreeLinesRender(false);
      setIsTwoLinesRender(false);
    }
  }, [isLongEnough]);

  const handleExpandToggle = () => {
    if (oneTime && !isCollapsed) return;
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const renderText = (linesQuantity: number) => (
    <StyledExpandableText ref={elementRef} height={lineHeight * linesQuantity} data-automation="ExpandableText">
      <span>{text}</span>
    </StyledExpandableText>
  );

  if (isThreeLinesRender) return renderText(3);
  if (isTwoLinesRender) return renderText(2);

  return (
    <>
      {isLongEnough ? (
        <StyledExpandableTextCollapsable
          height={lineHeight * maxLinesQuantity}
          isCollapsed={isCollapsed}
          data-automation="ExpandableTextCollapsable"
        >
          <span>{isCollapsed ? collapsedText : text}</span>
          {oneTime && isCollapsed && (
            <StyledExpandCollapseButton onClick={handleExpandToggle}>
              {t('common.show_more')}
            </StyledExpandCollapseButton>
          )}
          {!oneTime && (
            <StyledExpandCollapseButton onClick={handleExpandToggle}>
              {isCollapsed ? t('common.show_more') : t('common.show_less')}
            </StyledExpandCollapseButton>
          )}
        </StyledExpandableTextCollapsable>
      ) : (
        <span>{text}</span>
      )}
    </>
  );
}
