import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Package } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";

const validationFields = [
  { name: "forma", label: "Forma", required: true, minLength: 2, maxLength: 100 },
];

const NovaFormaApresentacao = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation({ forma: "" }, validationFields);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/cadastro/estoque/formas-apresentacao", "Forma de apresentação salva com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/formas-apresentacao");
  };

  return (
    <SimpleFormWizard title="Nova Forma de Apresentação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Forma de Apresentação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                label="Forma"
                required
                value={formData.forma}
                onChange={(e) => setFieldValue("forma", e.target.value)}
                onBlur={() => setFieldTouched("forma")}
                error={getFieldError("forma")}
                touched={touched.forma}
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

export default NovaFormaApresentacao;
