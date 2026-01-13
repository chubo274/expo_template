import React from "react";
import { TooltipMesure } from "./TooltipMesure";
import { TooltipModal } from "./TooltipModal";

export interface IAppTooltipProps {
  children: React.ReactNode;
  tooltipContent: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  triangularColor?: string;
  type?: 'measure' | 'modal';
}

const AppTooltip = React.memo((props: IAppTooltipProps) => {
  const { children, tooltipContent, side = 'top', type = 'modal', triangularColor = 'white' } = props;

  if (type === 'measure') {
    return (
      <TooltipMesure tooltipContent={tooltipContent} side={side} triangularColor={triangularColor}>
        {children}
      </TooltipMesure>
    )
  }

  if (type === 'modal') {
    return (
      <TooltipModal tooltipContent={tooltipContent} side={side} triangularColor={triangularColor}>
        {children}
      </TooltipModal>
    )
  }
})

export default AppTooltip;