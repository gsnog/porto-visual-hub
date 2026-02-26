import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Landmark } from "lucide-react";
import { useState } from "react";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";

const NovaContaBancaria = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("");
  const [tipoOptions, setTipoOptions] = useState([
    { value: "corrente", label: "Corrente" },
    { value: "poupanca", label: "Poupança" },
    { value: "investimento", label: "Investimento" },
    { value: "caixa-pequeno", label: "Caixa Pequeno" },
  ]);

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/conta-bancaria");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/conta-bancaria");
  };

  return (
    <SimpleFormWizard title="Nova Conta Bancária">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Landmark className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Conta Bancária</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Tipo"
                required
                value={tipo}
                onChange={setTipo}
                options={tipoOptions}
                onAddNew={(name) => {
                  const newValue = name.toLowerCase().replace(/\s+/g, "-");
                  setTipoOptions(prev => [...prev, { value: newValue, label: name }]);
                  setTipo(newValue);
                }}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Código do Banco <span className="text-destructive">*</span></Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Banco <span className="text-destructive">*</span></Label>
                <Input placeholder="" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Agência <span className="text-destructive">*</span></Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Número da Conta <span className="text-destructive">*</span></Label>
                <Input placeholder="" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Saldo Inicial</Label>
                <Input placeholder="0,00" className="form-input" />
                <p className="text-xs text-muted-foreground">Após criação, o saldo só pode ser alterado pelo sistema</p>
              </div>
            </div>

            <FormActionBar
              onSave={handleSalvar}
              onCancel={handleCancelar}
            />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovaContaBancaria;
