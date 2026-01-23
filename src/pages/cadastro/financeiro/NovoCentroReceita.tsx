import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { TrendingUp, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";

const NovoCentroReceita = () => {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/cadastro/financeiro/centro-receita",
    successMessage: "Centro de receita salvo!",
    successDescription: "O registro foi salvo com sucesso.",
  });

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/centro-receita");
  };

  return (
    <SimpleFormWizard title="Novo Centro de Receita">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Centro de Receita</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Diretoria <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="dir1">Diretoria 1</SelectItem>
                      <SelectItem value="dir2">Diretoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6">Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Gerência</Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Departamento</Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSalvar} disabled={isSaving} className="btn-action px-6">
                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvando...</> : "Salvar"}
              </Button>
              <Button onClick={handleCancelar} disabled={isSaving} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoCentroReceita;
