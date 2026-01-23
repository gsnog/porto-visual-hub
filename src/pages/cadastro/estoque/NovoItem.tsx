import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Package, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";

const NovoItem = () => {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/cadastro/estoque/itens",
    successMessage: "Item salvo!",
    successDescription: "O registro foi salvo com sucesso.",
  });

  const handleCancelar = () => {
    navigate("/cadastro/estoque/itens");
  };

  return (
    <SimpleFormWizard title="Novo Item">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Item</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nome <span className="text-destructive">*</span></Label>
                <Input placeholder="" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Nomenclaturas</Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar Nomenclaturas" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="nom1">Nomenclatura 1</SelectItem>
                      <SelectItem value="nom2">Nomenclatura 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6">Adicionar</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Apresentação</Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="ap1">Apresentação 1</SelectItem>
                      <SelectItem value="ap2">Apresentação 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6">Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Fornecedores <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar Fornecedores" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="forn1">Fornecedor 1</SelectItem>
                      <SelectItem value="forn2">Fornecedor 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6">Adicionar</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Setor</Label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Selecionar Setores" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="setor1">Setor 1</SelectItem>
                      <SelectItem value="setor2">Setor 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-6">Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Frequência de Compra <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="diario">Diário</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Frequência de Saída</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="diario">Diário</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Descrição</Label>
                <Textarea placeholder="" className="form-input min-h-[120px]" />
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

export default NovoItem;
