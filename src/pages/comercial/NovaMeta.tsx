import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Target } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { pessoasMock } from "@/data/pessoas-mock";

const validationFields = [
  { name: "vendedorId", label: "Vendedor", required: true },
  { name: "tipo", label: "Tipo de Meta", required: true },
  { name: "area", label: "Área", required: true },
  { name: "periodo", label: "Período", required: true },
  { name: "valorMeta", label: "Valor da Meta", required: true },
];

export default function NovaMeta() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { vendedorId: "", tipo: "", area: "", periodo: "", valorMeta: "" },
    validationFields
  );

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/comercial/metas", "Meta criada com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Criar Meta">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Criar Meta</h2>
                <p className="text-sm text-muted-foreground">Defina uma meta vinculada ao sistema</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedSelect label="Vendedor / Responsável" required value={formData.vendedorId} onChange={(v) => setFieldValue("vendedorId", v)}
                onBlur={() => setFieldTouched("vendedorId")} error={getFieldError("vendedorId")} touched={touched.vendedorId}
                options={pessoasMock.map(p => ({ value: p.id, label: p.nome }))} />
              <ValidatedSelect label="Área" required value={formData.area} onChange={(v) => setFieldValue("area", v)}
                onBlur={() => setFieldTouched("area")} error={getFieldError("area")} touched={touched.area}
                options={[
                  { value: "comercial", label: "Comercial" },
                  { value: "financeiro", label: "Financeiro" },
                  { value: "estoque", label: "Estoque" },
                  { value: "operacional", label: "Operacional" },
                  { value: "rh", label: "Gestão de Pessoas" },
                ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValidatedSelect label="Tipo de Meta" required value={formData.tipo} onChange={(v) => setFieldValue("tipo", v)}
                onBlur={() => setFieldTouched("tipo")} error={getFieldError("tipo")} touched={touched.tipo}
                options={[
                  { value: "receita", label: "Receita" },
                  { value: "novos_clientes", label: "Novos Clientes" },
                  { value: "margem", label: "Margem" },
                  { value: "renovacoes", label: "Renovações" },
                  { value: "reducao_custos", label: "Redução de Custos" },
                  { value: "producao", label: "Produção" },
                ]} />
              <ValidatedSelect label="Período" required value={formData.periodo} onChange={(v) => setFieldValue("periodo", v)}
                onBlur={() => setFieldTouched("periodo")} error={getFieldError("periodo")} touched={touched.periodo}
                options={[
                  { value: "2026-01", label: "Janeiro 2026" }, { value: "2026-02", label: "Fevereiro 2026" },
                  { value: "2026-03", label: "Março 2026" }, { value: "2026-Q1", label: "Q1 2026" },
                  { value: "2026-Q2", label: "Q2 2026" }, { value: "2026", label: "Ano 2026" }
                ]} />
              <ValidatedInput label="Valor da Meta" required type="number" placeholder="0" value={formData.valorMeta}
                onChange={(e) => setFieldValue("valorMeta", e.target.value)} onBlur={() => setFieldTouched("valorMeta")}
                error={getFieldError("valorMeta")} touched={touched.valorMeta} />
            </div>

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/comercial/metas")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
