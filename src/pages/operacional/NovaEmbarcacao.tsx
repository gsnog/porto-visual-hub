import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Ship, Plus } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";

const validationFields = [
  { name: "nome", label: "Nome", required: true, minLength: 2, maxLength: 100 },
  { name: "setores", label: "Setores", required: true },
  { name: "cliente", label: "Cliente", required: true },
  { name: "dimensoes", label: "Dimensões", required: true },
];

const NovaEmbarcacao = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation(
    { nome: "", setores: "", cliente: "", dimensoes: "" },
    validationFields
  );

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/operacional/embarcacoes", "Embarcação salva com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/operacional/embarcacoes");
  };

  return (
    <SimpleFormWizard title="Nova Embarcação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Ship className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Embarcação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                label="Nome"
                required
                value={formData.nome}
                onChange={(e) => setFieldValue("nome", e.target.value)}
                onBlur={() => setFieldTouched("nome")}
                error={getFieldError("nome")}
                touched={touched.nome}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Setores <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select value={formData.setores} onValueChange={(value) => setFieldValue("setores", value)}>
                    <SelectTrigger className="form-input" onBlur={() => setFieldTouched("setores")}>
                      <SelectValue placeholder="Selecionar Setores" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="setor1">Setor 1</SelectItem>
                      <SelectItem value="setor2">Setor 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6" onClick={() => navigate("/operacional/novo-setor")}><Plus className="w-4 h-4" />Adicionar</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cliente <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select value={formData.cliente} onValueChange={(value) => setFieldValue("cliente", value)}>
                    <SelectTrigger className="form-input" onBlur={() => setFieldTouched("cliente")}>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cliente1">Cliente 1</SelectItem>
                      <SelectItem value="cliente2">Cliente 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6" onClick={() => navigate("/cadastro/financeiro/novo-cliente")}><Plus className="w-4 h-4" />Adicionar</Button>
                </div>
              </div>

              <ValidatedInput
                label="Dimensões"
                required
                value={formData.dimensoes}
                onChange={(e) => setFieldValue("dimensoes", e.target.value)}
                onBlur={() => setFieldTouched("dimensoes")}
                error={getFieldError("dimensoes")}
                touched={touched.dimensoes}
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
};

export default NovaEmbarcacao;
