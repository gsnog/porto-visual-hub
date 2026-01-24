import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Wrench, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";

const validationFields = [
  { name: "nome", label: "Nome", required: true, minLength: 2, maxLength: 100 },
  { name: "valor", label: "Valor", required: true },
  { name: "descricao", label: "Descrição", required: true, minLength: 5 },
];

const NovoServico = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation({ nome: "", valor: "0", descricao: "" }, validationFields);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/operacional/servicos", "Serviço salvo com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/operacional/servicos");
  };

  return (
    <SimpleFormWizard title="Novo Serviço">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Serviço</h2>
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

              <ValidatedInput
                label="Valor"
                required
                value={formData.valor}
                onChange={(e) => setFieldValue("valor", e.target.value)}
                onBlur={() => setFieldTouched("valor")}
                error={getFieldError("valor")}
                touched={touched.valor}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ValidatedTextarea
                label="Descrição"
                required
                className="min-h-[120px]"
                value={formData.descricao}
                onChange={(e) => setFieldValue("descricao", e.target.value)}
                onBlur={() => setFieldTouched("descricao")}
                error={getFieldError("descricao")}
                touched={touched.descricao}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSalvar} className="btn-action px-6" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
              </Button>
              <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6" disabled={isSaving}>Cancelar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoServico;
