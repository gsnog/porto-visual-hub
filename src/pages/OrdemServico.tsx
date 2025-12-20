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

export default function OrdemServico() {
  const navigate = useNavigate();

  const selectTriggerClass = "bg-[#efefef] text-black placeholder:text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg";

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      <div className="p-6 space-y-6 overflow-x-hidden w-full max-w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Ordens de Serviço</h1>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <Button
            className="rounded-lg bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate("/estoque/ordem-servico/nova")}
          >
            Nova Ordem
          </Button>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <Select>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Tipo de Ordem" className="!text-[#22265B]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="servicoes_gerais">Serviços Gerais</SelectItem>
              <SelectItem value="patrimonio">Patrimônio</SelectItem>
              <SelectItem value="suporte">Suporte</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            type="date" 
            placeholder="Data de Início"
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg" 
          />

          <Input 
            type="date" 
            placeholder="Data de Fim"
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg" 
          />

          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        <div className="rounded-lg bg-[#efefef] border border-[#E3E3E3] p-6 text-center">
          <p className="text-[#22265B]">Selecione um tipo de Ordem.</p>
        </div>
      </div>
    </div>
  );
}