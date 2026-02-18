import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Building2, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { useCnpjLookup, formatCnpj } from "@/hooks/useCnpjLookup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const validationFields = [
  { name: "razaoSocial", label: "Razão Social", required: true, minLength: 2 },
  { name: "nomeFantasia", label: "Nome Fantasia", required: true, minLength: 2 },
  { name: "cnpj", label: "CNPJ", required: true },
  { name: "segmento", label: "Segmento", required: true },
  { name: "porte", label: "Porte", required: true },
  { name: "cidade", label: "Cidade", required: false },
  { name: "uf", label: "UF", required: false },
  { name: "site", label: "Site", required: false },
];

export default function NovaConta() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { razaoSocial: "", nomeFantasia: "", cnpj: "", segmento: "", porte: "", cidade: "", uf: "", site: "" },
    validationFields
  );

  const { consultarCnpj, isSearching } = useCnpjLookup(setFieldValue);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/comercial/contas", "Conta salva com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Nova Conta">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Conta</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações da empresa</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">CNPJ <span className="text-destructive">*</span></Label>
                <div className="flex gap-3 items-center">
                  <Input placeholder="00.000.000/0000-00" className="form-input" value={formData.cnpj}
                    onChange={(e) => setFieldValue("cnpj", formatCnpj(e.target.value))} onBlur={() => setFieldTouched("cnpj")} maxLength={18} />
                  <Button className="btn-action px-6" onClick={() => consultarCnpj(formData.cnpj)} disabled={isSearching} type="button">
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Consultar"}
                  </Button>
                </div>
              </div>
              <ValidatedInput label="Razão Social" required value={formData.razaoSocial} onChange={(e) => setFieldValue("razaoSocial", e.target.value)}
                onBlur={() => setFieldTouched("razaoSocial")} error={getFieldError("razaoSocial")} touched={touched.razaoSocial} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Nome Fantasia" required value={formData.nomeFantasia} onChange={(e) => setFieldValue("nomeFantasia", e.target.value)}
                onBlur={() => setFieldTouched("nomeFantasia")} error={getFieldError("nomeFantasia")} touched={touched.nomeFantasia} />
              <ValidatedInput label="Segmento" required value={formData.segmento} onChange={(e) => setFieldValue("segmento", e.target.value)}
                onBlur={() => setFieldTouched("segmento")} error={getFieldError("segmento")} touched={touched.segmento} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValidatedSelect label="Porte" required value={formData.porte} onChange={(v) => setFieldValue("porte", v)}
                onBlur={() => setFieldTouched("porte")} error={getFieldError("porte")} touched={touched.porte}
                options={[{ value: "micro", label: "Micro" }, { value: "pequena", label: "Pequena" }, { value: "media", label: "Média" }, { value: "grande", label: "Grande" }]} />
              <ValidatedInput label="Cidade" value={formData.cidade} onChange={(e) => setFieldValue("cidade", e.target.value)}
                onBlur={() => setFieldTouched("cidade")} error={getFieldError("cidade")} touched={touched.cidade} />
              <ValidatedInput label="UF" value={formData.uf} onChange={(e) => setFieldValue("uf", e.target.value)}
                onBlur={() => setFieldTouched("uf")} error={getFieldError("uf")} touched={touched.uf} maxLength={2} />
            </div>

            <ValidatedInput label="Site" placeholder="www.empresa.com" value={formData.site} onChange={(e) => setFieldValue("site", e.target.value)}
              onBlur={() => setFieldTouched("site")} error={getFieldError("site")} touched={touched.site} />

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/comercial/contas")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
