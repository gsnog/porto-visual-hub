import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { HelpTooltip } from "@/components/HelpTooltip";

interface DropdownWithAddProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  onAddNew: (newItem: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
}

export function DropdownWithAdd({ label, value, onChange, options, onAddNew, placeholder, required, helpText }: DropdownWithAddProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (newItemName.trim()) {
      onAddNew(newItemName.trim());
      setNewItemName("");
      setDialogOpen(false);
    }
  };

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <HelpTooltip text={helpText || `Selecione um(a) ${label.toLowerCase()} da lista ou clique em "+" para adicionar um(a) novo(a).`} size={13} />
      </div>
      <div className="flex gap-2 items-center">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="form-input flex-1">
            <SelectValue placeholder={placeholder || `Selecione ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <div className="p-2">
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {filteredOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-2 text-sm text-muted-foreground text-center">Nenhum resultado</div>
            )}
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" size="icon" onClick={() => setDialogOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar {label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={`Nome do novo ${label.toLowerCase()}`}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}