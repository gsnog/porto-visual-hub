import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { CircleDollarSign } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";

const validationFields = [
  { name: "diretoria", label: "Diretoria", required: true },
  { name: "gerencia", label: "Gerência", required: false },
  { name: "departamento", label: "Departamento", required: false },
];

const NovoCentroCusto = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();
  const [diretorias, setDiretorias] = useState([
    { value: "dir1", label: "Diretoria 1" },
    { value: "dir2", label: "Diretoria 2" },
  ]);

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation({ diretoria: "", gerencia: "", departamento: "" }, validationFields);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/cadastro/financeiro/centro-custo", "Centro de custo salvo com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/centro-custo");
  };

  return (
    <SimpleFormWizard title="Novo Centro de Custo">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <CircleDollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Centro de Custo</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd
                label="Diretoria"
                required
                value={formData.diretoria}
                onChange={(value) => setFieldValue("diretoria", value)}
                options={diretorias}
                onAddNew={(name) => {
                  const newVal = name.toLowerCase().replace(/\s/g, "-");
                  setDiretorias(prev => [...prev, { value: newVal, label: name }]);
                  setFieldValue("diretoria", newVal);
                }}
              />

              <ValidatedInput
                label="Gerência"
                value={formData.gerencia}
                onChange={(e) => setFieldValue("gerencia", e.target.value)}
                onBlur={() => setFieldTouched("gerencia")}
                error={getFieldError("gerencia")}
                touched={touched.gerencia}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                label="Departamento"
                value={formData.departamento}
                onChange={(e) => setFieldValue("departamento", e.target.value)}
                onBlur={() => setFieldTouched("departamento")}
                error={getFieldError("departamento")}
                touched={touched.departamento}
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

export default NovoCentroCusto;
