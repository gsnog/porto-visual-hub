import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FileText, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";

const NovoPlanoContas = () => {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/cadastro/financeiro/plano-contas",
    successMessage: "Plano de contas salvo!",
    successDescription: "O registro foi salvo com sucesso.",
  });

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/plano-contas");
  };

  return (
    <SimpleFormWizard title="Novo Plano de Contas">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Plano de Contas</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoria</Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cat1">Categoria 1</SelectItem>
                      <SelectItem value="cat2">Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-4">Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Subcategoria <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="sub1">Subcategoria 1</SelectItem>
                      <SelectItem value="sub2">Subcategoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-4">Adicionar</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contábil <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cont1">Contábil 1</SelectItem>
                      <SelectItem value="cont2">Contábil 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-4">Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">ID <span className="text-destructive">*</span></Label>
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

export default NovoPlanoContas;
