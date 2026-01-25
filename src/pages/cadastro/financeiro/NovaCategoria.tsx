import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Tag } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";

const validationFields = [
  { name: "nome", label: "Nome", required: true, minLength: 2, maxLength: 100 },
];

const NovaCategoria = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation({ nome: "" }, validationFields);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/cadastro/financeiro/categorias", "Categoria salva com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/categorias");
  };

  return (
    <SimpleFormWizard title="Nova Categoria">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Categoria</h2>
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

export default NovaCategoria;
