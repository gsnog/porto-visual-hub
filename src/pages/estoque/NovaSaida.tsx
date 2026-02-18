import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { PackageMinus } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { ValidatedSelect } from "@/components/ui/validated-select";

export default function NovaSaida() {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/estoque/saidas",
    successMessage: "Saída salva!",
    successDescription: "O registro foi salvo com sucesso.",
  });

  const [estoqueOrigem, setEstoqueOrigem] = useState("");
  const [setor, setSetor] = useState("");
  const [origens, setOrigens] = useState([
    { value: "origem1", label: "Estoque 1" },
    { value: "origem2", label: "Estoque 2" },
  ]);
  const [setores, setSetores] = useState([
    { value: "setor1", label: "Setor 1" },
    { value: "setor2", label: "Setor 2" },
  ]);

  const handleCancelar = () => {
    navigate("/estoque/saidas");
  };

  return (
    <SimpleFormWizard title="Nova Saída">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <PackageMinus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Saída</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data</Label>
                <Input type="date" className="form-input" />
              </div>

              <DropdownWithAdd
                label="Estoque de Origem"
                required
                value={estoqueOrigem}
                onChange={setEstoqueOrigem}
                options={origens}
                onAddNew={(name) => {
                  const newVal = name.toLowerCase().replace(/\s/g, "-");
                  setOrigens(prev => [...prev, { value: newVal, label: name }]);
                  setEstoqueOrigem(newVal);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Setor"
                required
                value={setor}
                onChange={setSetor}
                options={setores}
                onAddNew={(name) => {
                  const newVal = name.toLowerCase().replace(/\s/g, "-");
                  setSetores(prev => [...prev, { value: newVal, label: name }]);
                  setSetor(newVal);
                }}
              />

              <ValidatedSelect
                label="Operação"
                options={[
                  { value: "consumo", label: "Consumo" },
                  { value: "transferencia", label: "Transferência" },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedSelect
                label="Item"
                required
                options={[
                  { value: "item1", label: "Item 1" },
                  { value: "item2", label: "Item 2" },
                ]}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Quantidade <span className="text-destructive">*</span></Label>
                <Input type="number" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedSelect
                label="Estoque de Destino"
                required
                options={[
                  { value: "destino1", label: "Estoque 1" },
                  { value: "destino2", label: "Estoque 2" },
                ]}
              />
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
}
