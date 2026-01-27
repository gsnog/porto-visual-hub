import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { FileText } from "lucide-react";

export default function RelatorioOrdemCompra() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay({
    redirectTo: "/estoque/ordem-compra",
    successMessage: "Relatório gerado com sucesso!"
  });

  return (
    <SimpleFormWizard currentStep="Relatório">
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Relatório de Ordem de Compra</h2>
              <p className="text-sm text-muted-foreground">Configure os filtros para gerar o relatório</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Data Início</Label>
              <Input type="date" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input type="date" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="analise">Análise</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="negado">Negado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Setor</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="administrativo">Administrativo</SelectItem>
                  <SelectItem value="ti">TI</SelectItem>
                  <SelectItem value="producao">Produção</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Requisitante</Label>
              <Input type="text" placeholder="Nome do requisitante" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>Item</Label>
              <Input type="text" placeholder="Nome do item" className="w-full" />
            </div>
          </div>

          <FormActionBar
            onSave={() => handleSave()}
            onCancel={() => navigate("/estoque/ordem-compra")}
            isSaving={isSaving}
            saveLabel="Gerar"
            savingLabel="Gerando..."
            cancelLabel="Voltar"
          />
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
