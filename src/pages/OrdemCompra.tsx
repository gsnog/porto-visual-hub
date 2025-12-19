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
import { Search } from "lucide-react";

export default function OrdemCompra() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ordem de Compra</h1>

      {/* Botões de ação */}
      <div className="flex flex-wrap items-center gap-3">
        <Button className="bg-green-600 hover:bg-green-700">Nova Ordem</Button>
        <Button variant="outline">Relatório</Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-48">
          <Select>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="analise">Análise</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="negado">Negado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Input type="date" className="w-40 rounded-lg" />
        </div>

        <Button className="gap-2">
          <Search size={16} />
          Filtrar
        </Button>
      </div>

      {/* Paginação info */}
      <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Data de Compra</TableHead>
              <TableHead>Data de Entrega</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Requisitante</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Gestor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Status da Compra</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
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
                <Button variant="outline" size="sm">
                  Ações
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
