import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionBarProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  saveLabel?: string;
  savingLabel?: string;
  cancelLabel?: string;
}

export function FormActionBar({
  onSave,
  onCancel,
  isSaving = false,
  saveLabel = "Salvar",
  savingLabel = "Salvando...",
  cancelLabel = "Cancelar",
}: FormActionBarProps) {
  return (
    <div className="flex items-center justify-end mt-8 pt-6 border-t border-border gap-3">
      <Button
        onClick={onCancel}
        variant="ghost"
        className="text-muted-foreground hover:text-foreground dark:hover:text-primary-foreground"
        disabled={isSaving}
      >
        {cancelLabel}
      </Button>
      <Button
        onClick={onSave}
        className="btn-action px-8"
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {savingLabel}
          </>
        ) : (
          saveLabel
        )}
      </Button>
    </div>
  );
}

export default FormActionBar;
