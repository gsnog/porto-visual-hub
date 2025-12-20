import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export default function OrdemCompra() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Ordem de Compra</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/estoque/ordem-compra/nova")}
          >
            Nova Ordem
          </Button>
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Relatório
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Select>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded-lg">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="analise">Análise</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="negado">Negado</SelectItem>
            </SelectContent>
          </Select>

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

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">ID</TableHead>
                <TableHead className="!text-white font-medium text-center">Data</TableHead>
                <TableHead className="!text-white font-medium text-center">Data Compra</TableHead>
                <TableHead className="!text-white font-medium text-center">Data Entrega</TableHead>
                <TableHead className="!text-white font-medium text-center">Item</TableHead>
                <TableHead className="!text-white font-medium text-center">Marca</TableHead>
                <TableHead className="!text-white font-medium text-center">Qtd</TableHead>
                <TableHead className="!text-white font-medium text-center">Requisitante</TableHead>
                <TableHead className="!text-white font-medium text-center">Setor</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                <TableCell className="text-center">1</TableCell>
                <TableCell className="text-center">19/12/2024</TableCell>
                <TableCell className="text-center">20/12/2024</TableCell>
                <TableCell className="text-center">25/12/2024</TableCell>
                <TableCell className="text-center">Papel A4</TableCell>
                <TableCell className="text-center">Chamex</TableCell>
                <TableCell className="text-center">100</TableCell>
                <TableCell className="text-center">João Silva</TableCell>
                <TableCell className="text-center">Administrativo</TableCell>
                <TableCell className="text-center">
                  <span className="text-green-600 font-medium">Aprovado</span>
                </TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}