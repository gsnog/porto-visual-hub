import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { FileText, Plus } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";

const validationFields = [
  { name: "categoria", label: "Categoria", required: false },
  { name: "subcategoria", label: "Subcategoria", required: true },
  { name: "contabil", label: "Contábil", required: true },
  { name: "id", label: "ID", required: true },
];

const NovoPlanoContas = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation({ categoria: "", subcategoria: "", contabil: "", id: "" }, validationFields);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/cadastro/financeiro/plano-contas", "Plano de contas salvo com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/plano-contas");
  };

  return (
    <SimpleFormWizard title="Novo Plano de Contas">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Plano de Contas</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoria</Label>
                <div className="flex gap-3">
                  <Select value={formData.categoria} onValueChange={(value) => setFieldValue("categoria", value)}>
                    <SelectTrigger className="form-input" onBlur={() => setFieldTouched("categoria")}>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cat1">Categoria 1</SelectItem>
                      <SelectItem value="cat2">Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6"><Plus className="w-4 h-4" />Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Subcategoria <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select value={formData.subcategoria} onValueChange={(value) => setFieldValue("subcategoria", value)}>
                    <SelectTrigger className="form-input" onBlur={() => setFieldTouched("subcategoria")}>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="sub1">Subcategoria 1</SelectItem>
                      <SelectItem value="sub2">Subcategoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6"><Plus className="w-4 h-4" />Adicionar</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contábil <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select value={formData.contabil} onValueChange={(value) => setFieldValue("contabil", value)}>
                    <SelectTrigger className="form-input" onBlur={() => setFieldTouched("contabil")}>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cont1">Contábil 1</SelectItem>
                      <SelectItem value="cont2">Contábil 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6"><Plus className="w-4 h-4" />Adicionar</Button>
                </div>
              </div>

              <ValidatedInput
                label="ID"
                required
                value={formData.id}
                onChange={(e) => setFieldValue("id", e.target.value)}
                onBlur={() => setFieldTouched("id")}
                error={getFieldError("id")}
                touched={touched.id}
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

export default NovoPlanoContas;
