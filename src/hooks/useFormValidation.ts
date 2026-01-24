import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export interface ValidationField {
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  validate?: (value: string) => string | null;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormValidationReturn<T> {
  formData: T;
  errors: ValidationErrors;
  touched: Record<string, boolean>;
  setFieldValue: (field: keyof T, value: string) => void;
  setFieldTouched: (field: keyof T) => void;
  validateField: (field: keyof T) => boolean;
  validateAll: () => boolean;
  resetForm: () => void;
  getFieldError: (field: keyof T) => string | undefined;
  isFieldInvalid: (field: keyof T) => boolean;
}

export function useFormValidation<T extends Record<string, string>>(
  initialData: T,
  fields: ValidationField[]
): UseFormValidationReturn<T> {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateSingleField = useCallback(
    (fieldName: string, value: string): string | null => {
      const fieldConfig = fields.find((f) => f.name === fieldName);
      if (!fieldConfig) return null;

      const trimmedValue = value.trim();

      // Required check
      if (fieldConfig.required && !trimmedValue) {
        return `${fieldConfig.label} é obrigatório`;
      }

      // Skip other validations if empty and not required
      if (!trimmedValue) return null;

      // Min length check
      if (fieldConfig.minLength && trimmedValue.length < fieldConfig.minLength) {
        return `${fieldConfig.label} deve ter pelo menos ${fieldConfig.minLength} caracteres`;
      }

      // Max length check
      if (fieldConfig.maxLength && trimmedValue.length > fieldConfig.maxLength) {
        return `${fieldConfig.label} deve ter no máximo ${fieldConfig.maxLength} caracteres`;
      }

      // Pattern check
      if (fieldConfig.pattern && !fieldConfig.pattern.test(trimmedValue)) {
        return fieldConfig.patternMessage || `${fieldConfig.label} está em formato inválido`;
      }

      // Custom validation
      if (fieldConfig.validate) {
        return fieldConfig.validate(trimmedValue);
      }

      return null;
    },
    [fields]
  );

  const setFieldValue = useCallback(
    (field: keyof T, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      
      // Clear error when user starts typing
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validate on blur
    const error = validateSingleField(field as string, formData[field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  }, [formData, validateSingleField]);

  const validateField = useCallback(
    (field: keyof T): boolean => {
      const error = validateSingleField(field as string, formData[field]);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
        return false;
      }
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
      return true;
    },
    [formData, validateSingleField]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    const missingFields: string[] = [];

    fields.forEach((field) => {
      const error = validateSingleField(field.name, formData[field.name as keyof T] || "");
      if (error) {
        newErrors[field.name] = error;
        if (field.required && !formData[field.name as keyof T]?.trim()) {
          missingFields.push(field.label);
        }
      }
    });

    setErrors(newErrors);
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach((field) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: missingFields.length > 0 
          ? `Preencha: ${missingFields.join(", ")}`
          : "Corrija os erros no formulário",
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [fields, formData, validateSingleField]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  const getFieldError = useCallback(
    (field: keyof T): string | undefined => {
      return touched[field as string] ? errors[field as string] : undefined;
    },
    [errors, touched]
  );

  const isFieldInvalid = useCallback(
    (field: keyof T): boolean => {
      return touched[field as string] && !!errors[field as string];
    },
    [errors, touched]
  );

  return {
    formData,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateAll,
    resetForm,
    getFieldError,
    isFieldInvalid,
  };
}
