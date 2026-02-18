import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface HelpTooltipProps {
  text: string;
  className?: string;
  size?: number;
  side?: "top" | "bottom" | "left" | "right";
}

export function HelpTooltip({ text, className, size = 14, side = "top" }: HelpTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex items-center justify-center cursor-help text-muted-foreground hover:text-foreground transition-colors",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <HelpCircle size={size} />
          </span>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className="max-w-[260px] text-xs leading-relaxed bg-popover text-popover-foreground border border-border shadow-lg z-[100]"
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}