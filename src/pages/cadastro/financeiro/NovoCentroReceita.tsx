import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { TrendingUp } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";

const NovoCentroReceita = () => {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/cadastro/financeiro/centro-receita",
    successMessage: "Centro de receita salvo!",
    successDescription: "O registro foi salvo com sucesso.",
  });
  const [diretoria, setDiretoria] = useState("");
  const [diretorias, setDiretorias] = useState([
    { value: "dir1", label: "Diretoria 1" },
    { value: "dir2", label: "Diretoria 2" },
  ]);

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/centro-receita");
  };

  return (
    <SimpleFormWizard title="Novo Centro de Receita">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Centro de Receita</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Diretoria"
                required
                value={diretoria}
                onChange={setDiretoria}
                options={diretorias}
                onAddNew={(name) => {
                  const newVal = name.toLowerCase().replace(/\s/g, "-");
                  setDiretorias(prev => [...prev, { value: newVal, label: name }]);
                  setDiretoria(newVal);
                }}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Gerência</Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Departamento</Label>
                <Input placeholder="" className="form-input" />
              </div>
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

export default NovoCentroReceita;
