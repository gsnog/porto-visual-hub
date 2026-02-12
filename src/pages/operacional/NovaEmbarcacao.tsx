import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Ship } from "lucide-react";
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
                <div className="flex gap-3 items-center">
                  <ValidatedSelect
                    label=""
                    required
                    placeholder="Selecionar Setores"
                    options={[
                      { value: "setor1", label: "Setor 1" },
                      { value: "setor2", label: "Setor 2" },
                    ]}
                    value={formData.setores}
                    onValueChange={(value) => setFieldValue("setores", value)}
                    onBlur={() => setFieldTouched("setores")}
                    error={getFieldError("setores")}
                    touched={touched.setores}
                  />
                  <Button className="btn-action px-6" onClick={() => navigate("/operacional/novo-setor")}>Adicionar</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cliente <span className="text-destructive">*</span></Label>
                <div className="flex gap-3 items-center">
                  <ValidatedSelect
                    label=""
                    required
                    placeholder="Selecionar"
                    options={[
                      { value: "cliente1", label: "Cliente 1" },
                      { value: "cliente2", label: "Cliente 2" },
                    ]}
                    value={formData.cliente}
                    onValueChange={(value) => setFieldValue("cliente", value)}
                    onBlur={() => setFieldTouched("cliente")}
                    error={getFieldError("cliente")}
                    touched={touched.cliente}
                  />
                  <Button className="btn-action px-6" onClick={() => navigate("/cadastro/financeiro/novo-cliente")}>Adicionar</Button>
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
