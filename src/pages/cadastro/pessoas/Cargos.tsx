import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Search, FileText } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { cargosMock } from "@/data/pessoas-mock";

export default function Cargos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [nivelFilter, setNivelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const niveis = [...new Set(cargosMock.map(c => c.nivel))];

  const filtered = cargosMock.filter(c => {
    const matchesSearch = c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNivel = nivelFilter === "all" || c.nivel === nivelFilter;
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesNivel && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/cadastro/pessoas/cargos/novo")} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cargo
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="filter-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar cargo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={nivelFilter} onValueChange={setNivelFilter}>
            <SelectTrigger><SelectValue placeholder="Nível" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              {niveis.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[hsl(var(--sidebar-bg))] hover:bg-[hsl(var(--sidebar-bg))]">
              <TableHead className="text-white font-semibold">Cargo</TableHead>
              <TableHead className="text-white font-semibold">Descrição</TableHead>
              <TableHead className="text-white font-semibold">Nível</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(cargo => (
              <TableRow key={cargo.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{cargo.nome}</TableCell>
                <TableCell>{cargo.descricao}</TableCell>
                <TableCell>{cargo.nivel}</TableCell>
                <TableCell><StatusBadge status={cargo.status} /></TableCell>
                <TableCell className="text-center">
                  <TableActions
                    onView={() => {}}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Exibindo {filtered.length} de {cargosMock.length} cargos
      </div>
    </div>
  );
}
