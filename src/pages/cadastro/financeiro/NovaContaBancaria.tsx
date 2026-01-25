import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Landmark } from "lucide-react";

const NovaContaBancaria = () => {
  const navigate = useNavigate();

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
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="corrente">Corrente</SelectItem>
                    <SelectItem value="poupanca">Poupança</SelectItem>
                    <SelectItem value="investimento">Investimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                <Label className="text-sm font-medium">Saldo <span className="text-destructive">*</span></Label>
                <Input placeholder="0,00" className="form-input" />
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
