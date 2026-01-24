import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface ValidatedSelectProps {
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
}

const ValidatedSelect = React.forwardRef<HTMLButtonElement, ValidatedSelectProps>(
  (
    {
      label,
      required,
      error,
      touched,
      placeholder = "Selecionar",
      options,
      value,
      onValueChange,
      onBlur,
      className,
      disabled,
    },
    ref
  ) => {
    const hasError = touched && !!error;

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            className={cn(
              "form-input transition-colors",
              hasError && "border-destructive focus-visible:ring-destructive/30",
              className
            )}
            onBlur={onBlur}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasError && (
          <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);
ValidatedSelect.displayName = "ValidatedSelect";

export { ValidatedSelect };
