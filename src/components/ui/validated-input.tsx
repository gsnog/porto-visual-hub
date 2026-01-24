import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface ValidatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ className, label, required, error, touched, onBlur, ...props }, ref) => {
    const hasError = touched && !!error;

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
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
