import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { Receipt } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";

const validationFields = [
  { name: "cliente", label: "Cliente", required: true },
  { name: "documento", label: "Documento", required: true },
  { name: "valor", label: "Valor do Título", required: true },
  { name: "dataFaturamento", label: "Data de Faturamento", required: true },
  { name: "dataVencimento", label: "Data de Vencimento", required: true },
];

export default function NovaContaReceber() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { cliente: "", centroReceita: "", planoContas: "", documento: "", valor: "", multa: "0", encargos: "0", juros: "0", desconto: "0", valorTotal: "", dataFaturamento: "", dataVencimento: "", parcelas: "1", descricao: "" },
    validationFields
  );

  const [clienteOptions, setClienteOptions] = useState([
    { value: "cliente1", label: "Cliente 1" }, { value: "cliente2", label: "Cliente 2" }
  ]);
  const [centroReceitaOptions, setCentroReceitaOptions] = useState([
    { value: "centro1", label: "Centro 1" }, { value: "centro2", label: "Centro 2" }
  ]);
  const [planoContasOptions, setPlanoContasOptions] = useState([
    { value: "plano1", label: "Plano 1" }, { value: "plano2", label: "Plano 2" }
  ]);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/financeiro/contas-receber", "Conta a receber salva com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Nova Conta a Receber">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Conta a Receber</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Cliente" required value={formData.cliente} onChange={(v) => setFieldValue("cliente", v)}
                options={clienteOptions} onAddNew={(item) => setClienteOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <DropdownWithAdd label="Centro de Receita" value={formData.centroReceita} onChange={(v) => setFieldValue("centroReceita", v)}
                options={centroReceitaOptions} onAddNew={(item) => setCentroReceitaOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Plano de Contas" value={formData.planoContas} onChange={(v) => setFieldValue("planoContas", v)}
                options={planoContasOptions} onAddNew={(item) => setPlanoContasOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <ValidatedInput label="Documento" required value={formData.documento}
                onChange={(e) => setFieldValue("documento", e.target.value)} onBlur={() => setFieldTouched("documento")}
                error={getFieldError("documento")} touched={touched.documento} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValidatedInput label="Valor do Título" required value={formData.valor}
                onChange={(e) => setFieldValue("valor", e.target.value)} onBlur={() => setFieldTouched("valor")}
                error={getFieldError("valor")} touched={touched.valor} />
              <ValidatedInput label="Multa" type="number" value={formData.multa}
                onChange={(e) => setFieldValue("multa", e.target.value)} onBlur={() => setFieldTouched("multa")}
                error={getFieldError("multa")} touched={touched.multa} />
              <ValidatedInput label="Encargos" type="number" value={formData.encargos}
                onChange={(e) => setFieldValue("encargos", e.target.value)} onBlur={() => setFieldTouched("encargos")}
                error={getFieldError("encargos")} touched={touched.encargos} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValidatedInput label="Juros" type="number" value={formData.juros}
                onChange={(e) => setFieldValue("juros", e.target.value)} onBlur={() => setFieldTouched("juros")}
                error={getFieldError("juros")} touched={touched.juros} />
              <ValidatedInput label="Desconto" type="number" value={formData.desconto}
                onChange={(e) => setFieldValue("desconto", e.target.value)} onBlur={() => setFieldTouched("desconto")}
                error={getFieldError("desconto")} touched={touched.desconto} />
              <ValidatedInput label="Valor Total" value={formData.valorTotal}
                onChange={(e) => setFieldValue("valorTotal", e.target.value)} onBlur={() => setFieldTouched("valorTotal")}
                error={getFieldError("valorTotal")} touched={touched.valorTotal} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Data de Faturamento" required type="date" value={formData.dataFaturamento}
                onChange={(e) => setFieldValue("dataFaturamento", e.target.value)} onBlur={() => setFieldTouched("dataFaturamento")}
                error={getFieldError("dataFaturamento")} touched={touched.dataFaturamento} />
              <ValidatedInput label="Data de Vencimento" required type="date" value={formData.dataVencimento}
                onChange={(e) => setFieldValue("dataVencimento", e.target.value)} onBlur={() => setFieldTouched("dataVencimento")}
                error={getFieldError("dataVencimento")} touched={touched.dataVencimento} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Documento PDF</Label>
                <Input type="file" accept=".pdf" className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              </div>
              <ValidatedInput label="Número de Parcelas" type="number" value={formData.parcelas}
                onChange={(e) => setFieldValue("parcelas", e.target.value)} onBlur={() => setFieldTouched("parcelas")}
                error={getFieldError("parcelas")} touched={touched.parcelas} />
            </div>

            <ValidatedTextarea label="Descrição" value={formData.descricao} onChange={(e) => setFieldValue("descricao", e.target.value)}
              onBlur={() => setFieldTouched("descricao")} error={getFieldError("descricao")} touched={touched.descricao} />

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/financeiro/contas-receber")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
