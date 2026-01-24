import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface ValidatedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

const ValidatedTextarea = React.forwardRef<HTMLTextAreaElement, ValidatedTextareaProps>(
  ({ className, label, required, error, touched, onBlur, ...props }, ref) => {
    const hasError = touched && !!error;

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <Textarea
          ref={ref}
          className={cn(
            "form-input min-h-[100px] transition-colors",
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
ValidatedTextarea.displayName = "ValidatedTextarea";

export { ValidatedTextarea };
