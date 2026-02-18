import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { Button } from "@/components/ui/button";
import { Building2, ChevronLeft, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { setoresMock, pessoasMock } from "@/data/pessoas-mock";

export default function NovoSetor() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();
  const [formData, setFormData] = useState({
    nome: "",
    areaPai: "",
    responsavel: "",
    status: "Ativo",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSalvar = () => {
    handleSave("/cadastro/pessoas/setores", "Setor cadastrado com sucesso!");
  };

  const gestoresDisponiveis = pessoasMock.filter(p => p.status === 'Ativo');

  return (
    <div className="flex flex-col h-full bg-background items-center">
      <div className="max-w-3xl w-full">


        <Card className="border-border shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Setor</h2>
                <p className="text-sm text-muted-foreground">Informações do setor/área da empresa</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nome do Setor/Área <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Ex: Tecnologia, RH, Financeiro..."
                  className="form-input"
                  value={formData.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ValidatedSelect label="Área Pai (Hierarquia)" value={formData.areaPai} onValueChange={(v) => updateField("areaPai", v)}
                  placeholder="Selecionar área pai" options={[
                    { value: "none", label: "Nenhuma (Área Raiz)" },
                    ...setoresMock.map(s => ({ value: s.id, label: s.nome }))
                  ]} />

                <ValidatedSelect label="Responsável" value={formData.responsavel} onValueChange={(v) => updateField("responsavel", v)}
                  placeholder="Selecionar responsável" options={gestoresDisponiveis.map(p => ({ value: p.id, label: `${p.nome} - ${p.cargo}` }))} />
              </div>

              <ValidatedSelect label="Status" value={formData.status} onValueChange={(v) => updateField("status", v)}
                options={[
                  { value: "Ativo", label: "Ativo" },
                  { value: "Inativo", label: "Inativo" },
                ]} />
            </div>
          </CardContent>
        </Card>

        {/* Action Bar */}
        <div className="flex justify-between mt-6 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => navigate("/cadastro/pessoas/setores")}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4 nav-arrow" />
            Cancelar
          </Button>
          <Button onClick={handleSalvar} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
