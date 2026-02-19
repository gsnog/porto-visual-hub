import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Receipt } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const NovaSerie = () => {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();
  const [tipo, setTipo] = useState("NF-e");

  const handleSalvar = () => {
    handleSave("/cadastro/fiscal/series", "Série cadastrada com sucesso!");
  };

  const handleCancelar = () => {
    navigate("/cadastro/fiscal/series");
  };

  return (
    <SimpleFormWizard title="Nova Série">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Série</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo <span className="text-destructive">*</span></Label>
                <Select value={tipo} onValueChange={setTipo}>
                  <SelectTrigger className="form-input"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="NF-e">NF-e</SelectItem>
                    <SelectItem value="NFS-e">NFS-e</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Série <span className="text-destructive">*</span></Label>
                <Input placeholder="Ex: 1" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Próximo Número</Label>
                <Input type="number" defaultValue={1} min={1} className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Prefixo</Label>
                <Input placeholder="Opcional" className="form-input" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Observação</Label>
              <Input placeholder="Observação opcional..." className="form-input" />
            </div>

            <FormActionBar
              onSave={handleSalvar}
              onCancel={handleCancelar}
              isSaving={isSaving}
            />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovaSerie;
