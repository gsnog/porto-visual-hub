import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import SimpleFormWizard from "@/components/SimpleFormWizard";

export default function NovoCargo() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    if (!nome.trim()) {
      return;
    }
    handleSave("/cadastro/pessoas/cargos", "Cargo criado com sucesso!");
  };

  return (
    <SimpleFormWizard>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/cadastro/pessoas/cargos")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Novo Cargo</h1>
      </div>

      <Card className="border-border">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do Cargo <span className="text-destructive">*</span></label>
            <Input placeholder="Ex: Analista de Sistemas" value={nome} onChange={(e) => setNome(e.target.value)} className="form-input" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea placeholder="Descreva as responsabilidades do cargo..." value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => navigate("/cadastro/pessoas/cargos")}>Cancelar</Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Salvando...</> : "Salvar Cargo"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
