import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
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
      onChange,
      onBlur,
      className,
      disabled,
      searchable = true,
      searchPlaceholder = "Buscar...",
    },
    ref
  ) => {
    const hasError = touched && !!error;
    const handleChange = onValueChange || onChange;
    const [search, setSearch] = useState("");

    const filteredOptions = searchable
      ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
      : options;

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <Select value={value} onValueChange={handleChange} disabled={disabled}>
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
            {searchable && (
              <div className="p-2">
                <Input
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            {searchable && filteredOptions.length === 0 && (
              <div className="p-2 text-sm text-muted-foreground text-center">Nenhum resultado</div>
            )}
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
