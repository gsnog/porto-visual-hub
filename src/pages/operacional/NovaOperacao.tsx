import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Settings } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";

const NovaOperacao = () => {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();

  const handleSalvar = () => {
    handleSave("/operacional/operacao", "Operação salva com sucesso!");
  };

  const handleCancelar = () => {
    navigate("/operacional/operacao");
  };

  return (
    <SimpleFormWizard title="Nova Operação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Operação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Entrada <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Embarcação <span className="text-destructive">*</span></Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="embarcacao1">Embarcação 1</SelectItem>
                    <SelectItem value="embarcacao2">Embarcação 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Previsão de Entrega <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Serviço</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="servico1">Serviço 1</SelectItem>
                    <SelectItem value="servico2">Serviço 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="btn-action px-6 mt-2" onClick={() => navigate("/operacional/novo-servico")}>
                  Adicionar Serviço
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Setor</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="setor1">Setor 1</SelectItem>
                    <SelectItem value="setor2">Setor 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="btn-action px-6 mt-2" onClick={() => navigate("/operacional/novo-setor")}>
                  Adicionar Setor
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Início</Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Desconto</Label>
                <Input defaultValue="R$ 0,00" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor Adicional</Label>
                <Input defaultValue="R$ 0,00" className="form-input" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="btn-outline px-6">Adicionar Serviço</Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Serviços e Setores</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Serviço</TableHead>
                    <TableHead className="text-center">Setor</TableHead>
                    <TableHead className="text-center">Data de Início</TableHead>
                    <TableHead className="text-center">Desconto</TableHead>
                    <TableHead className="text-center">Valor Adicional</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">Nenhum serviço adicionado.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <FormActionBar
              onSave={handleSalvar}
              onCancel={handleCancelar}
              isSaving={isSaving}
            />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovaOperacao;
