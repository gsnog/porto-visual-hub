import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Calculator, ShieldAlert } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const ImpostosAliquotas = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();
  const [icmsModalidade, setIcmsModalidade] = useState("margem_valor");

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { icms: "18", ipi: "5", pis: "1.65", cofins: "7.6", iss: "5", retIrrf: "", retInss: "", retCsll: "", retPis: "", retCofins: "" },
    []
  );

  const handleSalvar = async () => {
    await handleSave("/", "Parâmetros de impostos salvos com sucesso! Auditoria registrada.");
  };

  return (
    <SimpleFormWizard title="Impostos e Alíquotas">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Impostos e Alíquotas — Parâmetros Globais</h2>
                <p className="text-sm text-muted-foreground">Esses parâmetros alimentam o cálculo estimado. O contador pode ajustar no documento.</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 flex items-center gap-2 text-sm">
              <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
              <span className="text-muted-foreground">Alterações são registradas na <strong>auditoria</strong>. Editável apenas por <strong>Contador / Admin</strong>.</span>
            </div>

            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Impostos sobre Produtos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ValidatedInput label="ICMS (%)" value={formData.icms} onChange={(e) => setFieldValue("icms", e.target.value)} onBlur={() => setFieldTouched("icms")} error={getFieldError("icms")} touched={touched.icms} />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Modalidade Base ICMS</Label>
                <Select value={icmsModalidade} onValueChange={setIcmsModalidade}>
                  <SelectTrigger className="form-input"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="margem_valor">Margem Valor Agregado</SelectItem>
                    <SelectItem value="pauta">Pauta (Valor)</SelectItem>
                    <SelectItem value="preco_tabelado">Preço Tabelado</SelectItem>
                    <SelectItem value="valor_operacao">Valor da Operação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ValidatedInput label="IPI (%)" value={formData.ipi} onChange={(e) => setFieldValue("ipi", e.target.value)} onBlur={() => setFieldTouched("ipi")} error={getFieldError("ipi")} touched={touched.ipi} />
              <div />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ValidatedInput label="PIS (%)" value={formData.pis} onChange={(e) => setFieldValue("pis", e.target.value)} onBlur={() => setFieldTouched("pis")} error={getFieldError("pis")} touched={touched.pis} />
              <ValidatedInput label="COFINS (%)" value={formData.cofins} onChange={(e) => setFieldValue("cofins", e.target.value)} onBlur={() => setFieldTouched("cofins")} error={getFieldError("cofins")} touched={touched.cofins} />
            </div>

            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-4">Impostos sobre Serviços</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ValidatedInput label="ISS (%)" value={formData.iss} onChange={(e) => setFieldValue("iss", e.target.value)} onBlur={() => setFieldTouched("iss")} error={getFieldError("iss")} touched={touched.iss} />
            </div>

            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-4">Retenções (opcionais)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <ValidatedInput label="IRRF (%)" placeholder="0" value={formData.retIrrf} onChange={(e) => setFieldValue("retIrrf", e.target.value)} onBlur={() => setFieldTouched("retIrrf")} error={getFieldError("retIrrf")} touched={touched.retIrrf} />
              <ValidatedInput label="INSS (%)" placeholder="0" value={formData.retInss} onChange={(e) => setFieldValue("retInss", e.target.value)} onBlur={() => setFieldTouched("retInss")} error={getFieldError("retInss")} touched={touched.retInss} />
              <ValidatedInput label="CSLL (%)" placeholder="0" value={formData.retCsll} onChange={(e) => setFieldValue("retCsll", e.target.value)} onBlur={() => setFieldTouched("retCsll")} error={getFieldError("retCsll")} touched={touched.retCsll} />
              <ValidatedInput label="PIS (%)" placeholder="0" value={formData.retPis} onChange={(e) => setFieldValue("retPis", e.target.value)} onBlur={() => setFieldTouched("retPis")} error={getFieldError("retPis")} touched={touched.retPis} />
              <ValidatedInput label="COFINS (%)" placeholder="0" value={formData.retCofins} onChange={(e) => setFieldValue("retCofins", e.target.value)} onBlur={() => setFieldTouched("retCofins")} error={getFieldError("retCofins")} touched={touched.retCofins} />
            </div>

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default ImpostosAliquotas;