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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrdemCompra() {
  const navigate = useNavigate();

  const selectTriggerClass = "bg-[#efefef] text-black placeholder:text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg";
  const rowBase = "bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white";

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      <div className="p-6 space-y-6 overflow-x-hidden w-full max-w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Ordem de Compra</h1>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <Button
            className="rounded-lg bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate("/estoque/ordem-compra/nova")}
          >
            Nova Ordem
          </Button>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Relatório
          </Button>
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <Select>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Status" className="!text-[#22265B]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="analise">Análise</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="negado">Negado</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            type="date" 
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-full max-w-[16rem] rounded-lg" 
          />

          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        <div className="w-full overflow-hidden rounded-lg border border-[#E3E3E3]">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] hover:text-black cursor-default select-none">
                <TableHead className="!text-black font-medium">ID</TableHead>
                <TableHead className="!text-black font-medium">Data</TableHead>
                <TableHead className="!text-black font-medium">Data de Compra</TableHead>
                <TableHead className="!text-black font-medium">Data de Entrega</TableHead>
                <TableHead className="!text-black font-medium">Item</TableHead>
                <TableHead className="!text-black font-medium">Marca</TableHead>
                <TableHead className="!text-black font-medium">Quantidade</TableHead>
                <TableHead className="!text-black font-medium">Requisitante</TableHead>
                <TableHead className="!text-black font-medium">Unidade</TableHead>
                <TableHead className="!text-black font-medium">Setor</TableHead>
                <TableHead className="!text-black font-medium">Gestor</TableHead>
                <TableHead className="!text-black font-medium">Status</TableHead>
                <TableHead className="!text-black font-medium">Status da Compra</TableHead>
                <TableHead className="!text-black font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className={rowBase}>
                <TableCell>1</TableCell>
                <TableCell>19/12/2024</TableCell>
                <TableCell>20/12/2024</TableCell>
                <TableCell>25/12/2024</TableCell>
                <TableCell>Papel A4</TableCell>
                <TableCell>Chamex</TableCell>
                <TableCell>100</TableCell>
                <TableCell>João Silva</TableCell>
                <TableCell>Resma</TableCell>
                <TableCell>Administrativo</TableCell>
                <TableCell>Maria Santos</TableCell>
                <TableCell>Aprovado</TableCell>
                <TableCell>Em Processo</TableCell>
                <TableCell>
                  <Button size="sm" className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    </div>
  );
}