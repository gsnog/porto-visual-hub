import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { DollarSign } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";

const validationFields = [
  { name: "descricao", label: "Descrição", required: true, minLength: 2 },
  { name: "tipo", label: "Tipo", required: true },
  { name: "percentual", label: "Percentual", required: true },
  { name: "condicao", label: "Condição", required: true },
];

export default function NovaRegra() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { descricao: "", tipo: "", percentual: "", condicao: "", observacoes: "" },
    validationFields
  );

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/comercial/comissoes", "Regra de comissão salva com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Nova Regra de Comissão">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Nova Regra de Comissão</h2>
                <p className="text-sm text-muted-foreground">Configure uma nova regra de comissionamento</p>
              </div>
            </div>

            <ValidatedInput label="Descrição" required value={formData.descricao} onChange={(e) => setFieldValue("descricao", e.target.value)}
              onBlur={() => setFieldTouched("descricao")} error={getFieldError("descricao")} touched={touched.descricao} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValidatedSelect label="Tipo" required value={formData.tipo} onChange={(v) => setFieldValue("tipo", v)}
                onBlur={() => setFieldTouched("tipo")} error={getFieldError("tipo")} touched={touched.tipo}
                options={[
                  { value: "sobre_faturamento", label: "Sobre Faturamento" },
                  { value: "adicional", label: "Adicional" },
                  { value: "estorno", label: "Estorno" },
                  { value: "bonus", label: "Bônus" }
                ]} />
              <ValidatedInput label="Percentual (%)" required type="number" placeholder="0" value={formData.percentual}
                onChange={(e) => setFieldValue("percentual", e.target.value)} onBlur={() => setFieldTouched("percentual")}
                error={getFieldError("percentual")} touched={touched.percentual} />
              <ValidatedInput label="Condição" required placeholder="Ex: Meta >= 100%" value={formData.condicao}
                onChange={(e) => setFieldValue("condicao", e.target.value)} onBlur={() => setFieldTouched("condicao")}
                error={getFieldError("condicao")} touched={touched.condicao} />
            </div>

            <ValidatedTextarea label="Observações" value={formData.observacoes} onChange={(e) => setFieldValue("observacoes", e.target.value)}
              onBlur={() => setFieldTouched("observacoes")} error={getFieldError("observacoes")} touched={touched.observacoes} />

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/comercial/comissoes")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
