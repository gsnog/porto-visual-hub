import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { ClipboardCheck } from "lucide-react";

export default function NovaOrdemServico() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tipoOrdem: "", descricao: "" });

  const handleSalvar = () => navigate("/estoque/ordem-servico");
  const handleCancelar = () => navigate("/estoque/ordem-servico");

  return (
    <SimpleFormWizard title="Nova Ordem de Serviço">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Ordem de Serviço</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div className="form-row">
                <label className="form-label">Tipo de Ordem</label>
                <Select value={formData.tipoOrdem} onValueChange={(value) => setFormData({ ...formData, tipoOrdem: value })}>
                  <SelectTrigger className="form-input w-52">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="servicos-gerais">Serviços Gerais</SelectItem>
                    <SelectItem value="patrimonio">Patrimônio</SelectItem>
                    <SelectItem value="suporte">Suporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-4">
                <label className="form-label pt-2">Descrição</label>
                <div className="flex-1">
                  <Textarea 
                    value={formData.descricao} 
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} 
                    placeholder="Digite a descrição da ordem de serviço" 
                    className="form-input w-80 min-h-[150px]" 
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
                <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}