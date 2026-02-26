import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { FileText } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const validationFields = [
  { name: "categoria", label: "Categoria", required: false },
  { name: "subcategoria", label: "Subcategoria", required: true },
  { name: "contabil", label: "Contábil", required: true },
  { name: "id", label: "ID", required: true },
];

const categoriaOptions = [
  { value: "cat1", label: "Categoria 1" },
  { value: "cat2", label: "Categoria 2" },
];
const subcategoriaOptions = [
  { value: "sub1", label: "Subcategoria 1" },
  { value: "sub2", label: "Subcategoria 2" },
];
const contabilOptions = [
  { value: "cont1", label: "Contábil 1" },
  { value: "cont2", label: "Contábil 2" },
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
                <Select value={formData.categoria} onValueChange={(v) => setFieldValue("categoria", v)}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a categoria" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {categoriaOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Subcategoria <span className="text-destructive">*</span></Label>
                <Select value={formData.subcategoria} onValueChange={(v) => setFieldValue("subcategoria", v)}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a subcategoria" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {subcategoriaOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contábil <span className="text-destructive">*</span></Label>
                <Select value={formData.contabil} onValueChange={(v) => setFieldValue("contabil", v)}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione o contábil" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {contabilOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
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
