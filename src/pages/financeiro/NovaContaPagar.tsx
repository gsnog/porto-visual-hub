import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { CreditCard } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";

const validationFields = [
  { name: "beneficiario", label: "Beneficiário", required: true },
  { name: "documento", label: "Documento", required: true },
  { name: "valor", label: "Valor do Título", required: true },
  { name: "dataFaturamento", label: "Data de Faturamento", required: true },
  { name: "dataVencimento", label: "Data de Vencimento", required: true },
];

export default function NovaContaPagar() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { beneficiario: "", centroCusto: "", documento: "", valor: "", dataFaturamento: "", dataVencimento: "", descricao: "" },
    validationFields
  );

  const [beneficiarioOptions, setBeneficiarioOptions] = useState([
    { value: "beneficiario1", label: "Beneficiário 1" }, { value: "beneficiario2", label: "Beneficiário 2" }
  ]);
  const [centroCustoOptions, setCentroCustoOptions] = useState([
    { value: "centro1", label: "Centro 1" }, { value: "centro2", label: "Centro 2" }
  ]);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/financeiro/contas-pagar", "Conta a pagar salva com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Nova Conta a Pagar">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Conta a Pagar</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Beneficiário" required value={formData.beneficiario} onChange={(v) => setFieldValue("beneficiario", v)}
                options={beneficiarioOptions} onAddNew={(item) => setBeneficiarioOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <DropdownWithAdd label="Centro de Custo" value={formData.centroCusto} onChange={(v) => setFieldValue("centroCusto", v)}
                options={centroCustoOptions} onAddNew={(item) => setCentroCustoOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Documento" required value={formData.documento}
                onChange={(e) => setFieldValue("documento", e.target.value)} onBlur={() => setFieldTouched("documento")}
                error={getFieldError("documento")} touched={touched.documento} />
              <ValidatedInput label="Valor do Título" required value={formData.valor}
                onChange={(e) => setFieldValue("valor", e.target.value)} onBlur={() => setFieldTouched("valor")}
                error={getFieldError("valor")} touched={touched.valor} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Data de Faturamento" required type="date" value={formData.dataFaturamento}
                onChange={(e) => setFieldValue("dataFaturamento", e.target.value)} onBlur={() => setFieldTouched("dataFaturamento")}
                error={getFieldError("dataFaturamento")} touched={touched.dataFaturamento} />
              <ValidatedInput label="Data de Vencimento" required type="date" value={formData.dataVencimento}
                onChange={(e) => setFieldValue("dataVencimento", e.target.value)} onBlur={() => setFieldTouched("dataVencimento")}
                error={getFieldError("dataVencimento")} touched={touched.dataVencimento} />
            </div>

            <ValidatedTextarea label="Descrição" value={formData.descricao} onChange={(e) => setFieldValue("descricao", e.target.value)}
              onBlur={() => setFieldTouched("descricao")} error={getFieldError("descricao")} touched={touched.descricao} />

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/financeiro/contas-pagar")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
