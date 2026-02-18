import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { DollarSign, HelpCircle } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const validationFields = [
  { name: "nome", label: "Nome da Regra", required: true, minLength: 2 },
  { name: "tipo", label: "Tipo", required: true },
  { name: "percentual", label: "Percentual", required: true },
  { name: "aplicacao", label: "Aplicação", required: true },
];

export default function NovaRegra() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { nome: "", tipo: "", percentual: "", aplicacao: "", metaMinima: "", observacoes: "" },
    validationFields
  );

  const [tipoOptions, setTipoOptions] = useState([
    { value: "sobre_faturamento", label: "Sobre Faturamento" },
    { value: "adicional", label: "Adicional por Meta" },
    { value: "bonus", label: "Bônus" },
    { value: "estorno", label: "Estorno" },
  ]);

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
                <p className="text-sm text-muted-foreground">Configure como a comissão será calculada</p>
              </div>
            </div>

            {/* Explanation card */}
            <Card className="border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Como funciona?</p>
                  <p>Defina um nome para a regra, o tipo de cálculo, o percentual e quando ela se aplica. Exemplo: "Comissão padrão de 5% sobre faturamento quando a meta mínima de 80% é atingida."</p>
                </div>
              </div>
            </Card>

            <ValidatedInput label="Nome da Regra" required placeholder="Ex: Comissão Padrão sobre Vendas"
              value={formData.nome} onChange={(e) => setFieldValue("nome", e.target.value)}
              onBlur={() => setFieldTouched("nome")} error={getFieldError("nome")} touched={touched.nome} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Tipo de Cálculo" required value={formData.tipo} onChange={(v) => setFieldValue("tipo", v)}
                options={tipoOptions} onAddNew={(item) => setTipoOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ValidatedInput label="Percentual (%)" required type="number" placeholder="Ex: 5" value={formData.percentual}
                        onChange={(e) => setFieldValue("percentual", e.target.value)} onBlur={() => setFieldTouched("percentual")}
                        error={getFieldError("percentual")} touched={touched.percentual} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent><p>Percentual que será aplicado sobre o valor base</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedSelect label="Quando aplicar" required value={formData.aplicacao} onChange={(v) => setFieldValue("aplicacao", v)}
                onBlur={() => setFieldTouched("aplicacao")} error={getFieldError("aplicacao")} touched={touched.aplicacao}
                options={[
                  { value: "sempre", label: "Sempre (toda venda)" },
                  { value: "meta_atingida", label: "Somente quando meta atingida" },
                  { value: "acima_meta", label: "Somente acima da meta" },
                  { value: "produto_especifico", label: "Produto/serviço específico" },
                ]} />
              <ValidatedInput label="Meta mínima (%)" type="number" placeholder="Ex: 80 (opcional)" value={formData.metaMinima}
                onChange={(e) => setFieldValue("metaMinima", e.target.value)} onBlur={() => setFieldTouched("metaMinima")}
                error={getFieldError("metaMinima")} touched={touched.metaMinima} />
            </div>

            <ValidatedTextarea label="Observações" placeholder="Detalhes adicionais sobre a regra..." value={formData.observacoes}
              onChange={(e) => setFieldValue("observacoes", e.target.value)}
              onBlur={() => setFieldTouched("observacoes")} error={getFieldError("observacoes")} touched={touched.observacoes} />

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/comercial/comissoes")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
