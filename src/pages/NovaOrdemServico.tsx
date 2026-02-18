import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { ClipboardCheck } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";

export default function NovaOrdemServico() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();
  const [formData, setFormData] = useState({ tipoOrdem: "", descricao: "" });

  const [tipoOptions, setTipoOptions] = useState([
    { value: "servicos-gerais", label: "Serviços Gerais" },
    { value: "patrimonio", label: "Patrimônio" },
    { value: "suporte", label: "Suporte" },
  ]);

  const handleSalvar = () => handleSave("/estoque/ordem-servico", "Ordem de serviço salva com sucesso!");
  const handleCancelar = () => navigate("/estoque/ordem-servico");

  return (
    <SimpleFormWizard title="Nova Ordem de Serviço">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Ordem de Serviço</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Tipo de Ordem"
                required
                value={formData.tipoOrdem}
                onChange={(value) => setFormData({ ...formData, tipoOrdem: value })}
                options={tipoOptions}
                onAddNew={(name) => {
                  const newValue = name.toLowerCase().replace(/\s+/g, "-");
                  setTipoOptions(prev => [...prev, { value: newValue, label: name }]);
                  setFormData(prev => ({ ...prev, tipoOrdem: newValue }));
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Textarea 
                  value={formData.descricao} 
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} 
                  placeholder="Digite a descrição da ordem de serviço" 
                  className="form-input min-h-[120px]" 
                />
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
}
