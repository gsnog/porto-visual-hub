import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function OrdemServico() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Ordens de Serviço</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/estoque/ordem-servico/nova")}
          >
            Nova Ordem
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Select>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded-lg">
              <SelectValue placeholder="Tipo de Ordem" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="servicoes_gerais">Serviços Gerais</SelectItem>
              <SelectItem value="patrimonio">Patrimônio</SelectItem>
              <SelectItem value="suporte">Suporte</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            type="date" 
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />
          <Input 
            type="date" 
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />

          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

        <div className="rounded-lg bg-muted/50 p-6 text-center border border-[#E3E3E3]">
          <p className="text-muted-foreground">Selecione um tipo de Ordem.</p>
        </div>
      </div>
    </div>
  );
}