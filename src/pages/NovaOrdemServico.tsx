import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NovaOrdemServico() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tipoOrdem: "", descricao: "" });

  const handleSalvar = () => navigate("/estoque/ordem-servico");
  const handleCancelar = () => navigate("/estoque/ordem-servico");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Nova Ordem de Serviço</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Tipo de Ordem</label>
            <Select value={formData.tipoOrdem} onValueChange={(value) => setFormData({ ...formData, tipoOrdem: value })}>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-52 border border-[#22265B]">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="servicos-gerais">Serviços Gerais</SelectItem>
                <SelectItem value="patrimonio">Patrimônio</SelectItem>
                <SelectItem value="suporte">Suporte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-8">
            <label className="text-foreground font-medium w-40 pt-2">Descrição</label>
            <div className="flex-1">
              <Textarea 
                value={formData.descricao} 
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} 
                placeholder="Digite a descrição da ordem de serviço" 
                className="bg-[#efefef] !text-[#22265B] px-3 rounded-lg border border-[#22265B] w-80 min-h-[150px]" 
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSalvar} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6">Salvar</Button>
            <Button onClick={handleCancelar} variant="destructive" className="rounded-lg px-6">Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
