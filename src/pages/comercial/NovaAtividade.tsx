import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Calendar } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";
import { oportunidadesMock, leadsMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const validationFields = [
  { name: "titulo", label: "Título", required: true, minLength: 2 },
  { name: "tipo", label: "Tipo", required: true },
  { name: "data", label: "Data", required: true },
  { name: "responsavelId", label: "Responsável", required: true },
];

export default function NovaAtividade() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { titulo: "", tipo: "", data: "", hora: "", responsavelId: "", relacionadoTipo: "", relacionadoId: "", descricao: "" },
    validationFields
  );

  const getRelacionadoOptions = () => {
    if (formData.relacionadoTipo === 'oportunidade') return oportunidadesMock.map(o => ({ value: o.id, label: o.titulo }));
    if (formData.relacionadoTipo === 'lead') return leadsMock.map(l => ({ value: l.id, label: l.nome }));
    return [];
  };

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/comercial/atividades", "Atividade salva com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Nova Atividade">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Nova Atividade</h2>
                <p className="text-sm text-muted-foreground">Agende uma nova atividade</p>
              </div>
            </div>

            <ValidatedInput label="Título" required value={formData.titulo} onChange={(e) => setFieldValue("titulo", e.target.value)}
              onBlur={() => setFieldTouched("titulo")} error={getFieldError("titulo")} touched={touched.titulo} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValidatedSelect label="Tipo" required value={formData.tipo} onChange={(v) => setFieldValue("tipo", v)}
                onBlur={() => setFieldTouched("tipo")} error={getFieldError("tipo")} touched={touched.tipo}
                options={[
                  { value: "reuniao", label: "Reunião" }, { value: "ligacao", label: "Ligação" },
                  { value: "email", label: "Email" }, { value: "tarefa", label: "Tarefa" }, { value: "follow-up", label: "Follow-up" }
                ]} />
              <ValidatedInput label="Data" required type="date" value={formData.data}
                onChange={(e) => setFieldValue("data", e.target.value)} onBlur={() => setFieldTouched("data")}
                error={getFieldError("data")} touched={touched.data} />
              <ValidatedInput label="Hora" type="time" value={formData.hora}
                onChange={(e) => setFieldValue("hora", e.target.value)} onBlur={() => setFieldTouched("hora")}
                error={getFieldError("hora")} touched={touched.hora} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedSelect label="Responsável" required value={formData.responsavelId} onChange={(v) => setFieldValue("responsavelId", v)}
                onBlur={() => setFieldTouched("responsavelId")} error={getFieldError("responsavelId")} touched={touched.responsavelId}
                options={pessoasMock.map(p => ({ value: p.id, label: p.nome }))} />
              <ValidatedSelect label="Relacionado a" value={formData.relacionadoTipo} onChange={(v) => { setFieldValue("relacionadoTipo", v); setFieldValue("relacionadoId", ""); }}
                onBlur={() => setFieldTouched("relacionadoTipo")} error={getFieldError("relacionadoTipo")} touched={touched.relacionadoTipo}
                options={[{ value: "oportunidade", label: "Oportunidade" }, { value: "lead", label: "Lead" }]} />
            </div>

            {formData.relacionadoTipo && (
              <ValidatedSelect label={formData.relacionadoTipo === 'oportunidade' ? 'Oportunidade' : 'Lead'}
                value={formData.relacionadoId} onChange={(v) => setFieldValue("relacionadoId", v)}
                onBlur={() => setFieldTouched("relacionadoId")} error={getFieldError("relacionadoId")} touched={touched.relacionadoId}
                options={getRelacionadoOptions()} />
            )}

            <ValidatedTextarea label="Descrição" value={formData.descricao} onChange={(e) => setFieldValue("descricao", e.target.value)}
              onBlur={() => setFieldTouched("descricao")} error={getFieldError("descricao")} touched={touched.descricao} />

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/comercial/atividades")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
