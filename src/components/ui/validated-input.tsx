import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HelpTooltip } from "@/components/HelpTooltip";

export interface ValidatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  helpText?: string;
}

const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ className, label, required, error, touched, onBlur, helpText, ...props }, ref) => {
    const hasError = touched && !!error;

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label className="text-sm font-medium">
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
          <HelpTooltip text={helpText || `Campo ${label.toLowerCase()}${required ? ' (obrigatório)' : ' (opcional)'}.`} size={12} />
        </div>
        <Input
          ref={ref}
          className={cn(
            "form-input transition-colors",
            hasError && "border-destructive focus-visible:ring-destructive/30",
            className
          )}
          onBlur={onBlur}
          {...props}
        />
        {hasError && (
          <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);
ValidatedInput.displayName = "ValidatedInput";

export { ValidatedInput };