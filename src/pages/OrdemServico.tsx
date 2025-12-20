import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
=======
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
>>>>>>> 955fc2bef83f9964c05eb90bcf99cc1a25fcc21f

export default function OrdemServico() {
  const navigate = useNavigate();

  const selectTriggerClass = "bg-[#efefef] text-black placeholder:text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg";

  return (
<<<<<<< HEAD
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      <div className="p-6 space-y-6 overflow-x-hidden w-full max-w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Ordens de Serviço</h1>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <Button
            className="rounded-lg bg-green-600 hover:bg-green-700 text-white"
=======
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Ordens de Serviço</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
>>>>>>> 955fc2bef83f9964c05eb90bcf99cc1a25fcc21f
            onClick={() => navigate("/estoque/ordem-servico/nova")}
          >
            Nova Ordem
          </Button>
        </div>

<<<<<<< HEAD
        <div className="flex gap-4 items-center flex-wrap">
          <Select>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Tipo de Ordem" className="!text-[#22265B]" />
=======
        <div className="flex flex-wrap gap-4 items-center">
          <Select>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded-lg">
              <SelectValue placeholder="Tipo de Ordem" />
>>>>>>> 955fc2bef83f9964c05eb90bcf99cc1a25fcc21f
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
<<<<<<< HEAD
            placeholder="Data de Início"
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg" 
          />

          <Input 
            type="date" 
            placeholder="Data de Fim"
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg" 
          />

          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
=======
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />
          <Input 
            type="date" 
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />

          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
>>>>>>> 955fc2bef83f9964c05eb90bcf99cc1a25fcc21f
            Filtrar
          </Button>
        </div>

<<<<<<< HEAD
        <div className="rounded-lg bg-[#efefef] border border-[#E3E3E3] p-6 text-center">
          <p className="text-[#22265B]">Selecione um tipo de Ordem.</p>
=======
        <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

        <div className="rounded-lg bg-muted/50 p-6 text-center border border-[#E3E3E3]">
          <p className="text-muted-foreground">Selecione um tipo de Ordem.</p>
>>>>>>> 955fc2bef83f9964c05eb90bcf99cc1a25fcc21f
        </div>
      </div>
    </div>
  );
}