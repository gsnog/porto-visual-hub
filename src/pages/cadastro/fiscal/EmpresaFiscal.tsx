import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Building2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const validationFields = [
  { name: "razaoSocial", label: "Razão Social", required: true, minLength: 3, maxLength: 200 },
  { name: "cnpj", label: "CNPJ", required: true, minLength: 14, maxLength: 18 },
  { name: "uf", label: "UF", required: true, minLength: 2, maxLength: 2 },
  { name: "municipio", label: "Município", required: true, minLength: 2, maxLength: 100 },
];

const EmpresaFiscal = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();
  const [regimeTributario, setRegimeTributario] = useState("");
  const [ambiente, setAmbiente] = useState("homologacao");
  const [observacaoPadrao, setObservacaoPadrao] = useState("");

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation(
    { razaoSocial: "", cnpj: "", enderecoFiscal: "", uf: "", municipio: "", ie: "", im: "", cnaePrincipal: "" },
    validationFields
  );

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/", "Dados fiscais da empresa salvos com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Empresa — Dados Fiscais">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados Fiscais da Empresa</h2>
                <p className="text-sm text-muted-foreground">Parâmetros fiscais — editável apenas por Contador / Admin</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Razão Social" required value={formData.razaoSocial} onChange={(e) => setFieldValue("razaoSocial", e.target.value)} onBlur={() => setFieldTouched("razaoSocial")} error={getFieldError("razaoSocial")} touched={touched.razaoSocial} />
              <ValidatedInput label="CNPJ" required placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={(e) => setFieldValue("cnpj", e.target.value)} onBlur={() => setFieldTouched("cnpj")} error={getFieldError("cnpj")} touched={touched.cnpj} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValidatedInput label="Endereço Fiscal" value={formData.enderecoFiscal} onChange={(e) => setFieldValue("enderecoFiscal", e.target.value)} onBlur={() => setFieldTouched("enderecoFiscal")} error={getFieldError("enderecoFiscal")} touched={touched.enderecoFiscal} />
              <ValidatedInput label="UF" required placeholder="SP" value={formData.uf} onChange={(e) => setFieldValue("uf", e.target.value.toUpperCase())} onBlur={() => setFieldTouched("uf")} error={getFieldError("uf")} touched={touched.uf} />
              <ValidatedInput label="Município" required value={formData.municipio} onChange={(e) => setFieldValue("municipio", e.target.value)} onBlur={() => setFieldTouched("municipio")} error={getFieldError("municipio")} touched={touched.municipio} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Inscrição Estadual (IE)" placeholder="Opcional" value={formData.ie} onChange={(e) => setFieldValue("ie", e.target.value)} onBlur={() => setFieldTouched("ie")} error={getFieldError("ie")} touched={touched.ie} />
              <ValidatedInput label="Inscrição Municipal (IM)" placeholder="Opcional" value={formData.im} onChange={(e) => setFieldValue("im", e.target.value)} onBlur={() => setFieldTouched("im")} error={getFieldError("im")} touched={touched.im} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Regime Tributário <span className="text-destructive">*</span></Label>
                <Select value={regimeTributario} onValueChange={setRegimeTributario}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecionar" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="simples">Simples Nacional</SelectItem>
                    <SelectItem value="presumido">Lucro Presumido</SelectItem>
                    <SelectItem value="real">Lucro Real</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ValidatedInput label="CNAE Principal" placeholder="Opcional" value={formData.cnaePrincipal} onChange={(e) => setFieldValue("cnaePrincipal", e.target.value)} onBlur={() => setFieldTouched("cnaePrincipal")} error={getFieldError("cnaePrincipal")} touched={touched.cnaePrincipal} />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Ambiente de Emissão <span className="text-destructive">*</span></Label>
                <Select value={ambiente} onValueChange={setAmbiente}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecionar" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="homologacao">Homologação</SelectItem>
                    <SelectItem value="producao">Produção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Observação Padrão para Nota</Label>
              <Textarea placeholder="Texto padrão que será inserido nas notas fiscais emitidas..." className="form-input min-h-[80px]" value={observacaoPadrao} onChange={(e) => setObservacaoPadrao(e.target.value)} />
            </div>

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default EmpresaFiscal;