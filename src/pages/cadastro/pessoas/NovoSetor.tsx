import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Building2, Check, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
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
        {/* Simple Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-primary text-primary-foreground scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-primary hidden md:block">Dados do Setor</span>
              </div>
              <div className="w-12 h-1 mx-2 rounded-full bg-muted" />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center gap-2 opacity-60">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-muted text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground hidden md:block">Finalizado</span>
              </div>
            </div>
          </div>
        </div>

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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Área Pai (Hierarquia)</Label>
                  <Select value={formData.areaPai} onValueChange={(v) => updateField("areaPai", v)}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar área pai" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="none">Nenhuma (Área Raiz)</SelectItem>
                      {setoresMock.map((setor) => (
                        <SelectItem key={setor.id} value={setor.id}>
                          {setor.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Responsável</Label>
                  <Select value={formData.responsavel} onValueChange={(v) => updateField("responsavel", v)}>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar responsável" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {gestoresDisponiveis.map((pessoa) => (
                        <SelectItem key={pessoa.id} value={pessoa.id}>
                          {pessoa.nome} - {pessoa.cargo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={(v) => updateField("status", v)}>
                  <SelectTrigger className="form-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            <ChevronLeft className="h-4 w-4" />
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
