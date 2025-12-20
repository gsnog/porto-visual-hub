import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NovaOrdemServico() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tipoOrdem: "", descricao: "" });

  const handleSalvar = () => navigate("/estoque/ordem-servico");
  const handleCancelar = () => navigate("/estoque/ordem-servico");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Nova Ordem de Serviço</h1>

        <div className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="tipoOrdem">Tipo de Ordem</Label>
            <Select value={formData.tipoOrdem} onValueChange={(value) => setFormData({ ...formData, tipoOrdem: value })}>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                <SelectValue placeholder="Selecione o tipo de ordem" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="servicos-gerais">Serviços Gerais</SelectItem>
                <SelectItem value="patrimonio">Patrimônio</SelectItem>
                <SelectItem value="suporte">Suporte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea id="descricao" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} placeholder="Digite a descrição da ordem de serviço" rows={5} className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 px-3 rounded-lg" />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSalvar} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Salvar</Button>
            <Button variant="outline" onClick={handleCancelar} className="rounded-lg border-primary text-primary hover:bg-primary/10">Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}