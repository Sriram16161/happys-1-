import React, { ReactNode, useEffect, useState } from 'react';
import { TooltipWrapper, TooltipContent, Placement, TooltipFixedWrapper, TooltipFixedContent } from './styles';

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  placement?: Placement;
  enabled?: boolean;
  minWidth?: number;
  isPositionFixed?: boolean;
};

export const Tooltip = ({
  content,
  children,
  className,
  placement = 'top',
  enabled = true,
  minWidth = 0,
  isPositionFixed = false,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    tooltip.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
  }, [visible]);

  const handleMouseEnter = () => {
    if (!enabled) return;

    setVisible(true);
  };

  const handleMouseLeave = () => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const animation = tooltip.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
    animation.onfinish = () => setVisible(false);
  };

  return (
    <TooltipWrapper
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      className={className}
      enabled={enabled}
    >
      {children}
      {visible && (
        <>
          {isPositionFixed ? (
            <TooltipFixedWrapper>
              <TooltipFixedContent ref={tooltipRef} placement={placement} minWidth={minWidth}>
                {content}
              </TooltipFixedContent>
            </TooltipFixedWrapper>
          ) : (
            <TooltipContent ref={tooltipRef} placement={placement} minWidth={minWidth}>
              {content}
            </TooltipContent>
          )}
        </>
      )}
    </TooltipWrapper>
  );
};
