import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { FileText } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const validationFields = [
  { name: "item", label: "Item/Serviço", required: true },
];

const NovaRegraFiscal = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();
  const [tipo, setTipo] = useState("Produto");

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { item: "", ncm: "", cest: "", codigoServico: "", cstCsosn: "", origem: "", icms: "", ipi: "", pis: "", cofins: "", iss: "" },
    validationFields
  );

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/cadastro/fiscal/regras-fiscais", "Regra fiscal salva com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Nova Regra Fiscal">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Regra Fiscal</h2>
                <p className="text-sm text-muted-foreground">Vincule a um item/serviço do cadastro</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Item/Serviço" required placeholder="Selecionar do cadastro..." value={formData.item} onChange={(e) => setFieldValue("item", e.target.value)} onBlur={() => setFieldTouched("item")} error={getFieldError("item")} touched={touched.item} />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo <span className="text-destructive">*</span></Label>
                <Select value={tipo} onValueChange={setTipo}>
                  <SelectTrigger className="form-input"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Produto">Produto</SelectItem>
                    <SelectItem value="Serviço">Serviço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {tipo === "Produto" && (
              <>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">Código Fiscal</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ValidatedInput label="NCM" placeholder="Opcional" value={formData.ncm} onChange={(e) => setFieldValue("ncm", e.target.value)} onBlur={() => setFieldTouched("ncm")} error={getFieldError("ncm")} touched={touched.ncm} />
                  <ValidatedInput label="CEST" placeholder="Opcional" value={formData.cest} onChange={(e) => setFieldValue("cest", e.target.value)} onBlur={() => setFieldTouched("cest")} error={getFieldError("cest")} touched={touched.cest} />
                  <ValidatedInput label="Origem da Mercadoria" placeholder="0" value={formData.origem} onChange={(e) => setFieldValue("origem", e.target.value)} onBlur={() => setFieldTouched("origem")} error={getFieldError("origem")} touched={touched.origem} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ValidatedInput label="CST/CSOSN" placeholder="Ex: 00, 102..." value={formData.cstCsosn} onChange={(e) => setFieldValue("cstCsosn", e.target.value)} onBlur={() => setFieldTouched("cstCsosn")} error={getFieldError("cstCsosn")} touched={touched.cstCsosn} />
                </div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">Alíquotas Padrão</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ValidatedInput label="ICMS (%)" placeholder="0" value={formData.icms} onChange={(e) => setFieldValue("icms", e.target.value)} onBlur={() => setFieldTouched("icms")} error={getFieldError("icms")} touched={touched.icms} />
                  <ValidatedInput label="IPI (%)" placeholder="0" value={formData.ipi} onChange={(e) => setFieldValue("ipi", e.target.value)} onBlur={() => setFieldTouched("ipi")} error={getFieldError("ipi")} touched={touched.ipi} />
                  <ValidatedInput label="PIS (%)" placeholder="0" value={formData.pis} onChange={(e) => setFieldValue("pis", e.target.value)} onBlur={() => setFieldTouched("pis")} error={getFieldError("pis")} touched={touched.pis} />
                  <ValidatedInput label="COFINS (%)" placeholder="0" value={formData.cofins} onChange={(e) => setFieldValue("cofins", e.target.value)} onBlur={() => setFieldTouched("cofins")} error={getFieldError("cofins")} touched={touched.cofins} />
                </div>
              </>
            )}

            {tipo === "Serviço" && (
              <>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">Código Fiscal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ValidatedInput label="Código de Serviço (LC116)" placeholder="Ex: 1.05" value={formData.codigoServico} onChange={(e) => setFieldValue("codigoServico", e.target.value)} onBlur={() => setFieldTouched("codigoServico")} error={getFieldError("codigoServico")} touched={touched.codigoServico} />
                </div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">Alíquota</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ValidatedInput label="ISS (%)" placeholder="0" value={formData.iss} onChange={(e) => setFieldValue("iss", e.target.value)} onBlur={() => setFieldTouched("iss")} error={getFieldError("iss")} touched={touched.iss} />
                </div>
              </>
            )}

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/cadastro/fiscal/regras-fiscais")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovaRegraFiscal;