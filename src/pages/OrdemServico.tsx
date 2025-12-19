import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function OrdemServico() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ordens de Serviço</h1>

      {/* Botão de ação */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate("/estoque/ordem-servico/nova")}
        >
          Nova Ordem
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">Tipo de Ordem</label>
          <Select>
            <SelectTrigger className="w-48 rounded-lg">
              <SelectValue placeholder="Tipo de Ordem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="manutencao">Manutenção</SelectItem>
              <SelectItem value="instalacao">Instalação</SelectItem>
              <SelectItem value="reparo">Reparo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">Data de Início</label>
          <Input type="date" className="w-40 rounded-lg" />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-muted-foreground">Data de Fim</label>
          <Input type="date" className="w-40 rounded-lg" />
        </div>

        <Button className="gap-2">
          <Search size={16} />
          Filtrar
        </Button>
      </div>

      {/* Mensagem quando nenhum tipo selecionado */}
      <div className="rounded-lg bg-muted/50 p-6 text-center">
        <p className="text-muted-foreground">Selecione um tipo de Ordem.</p>
      </div>
    </div>
  );
}
