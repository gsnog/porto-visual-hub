import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, FileText } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { setoresMock } from "@/data/pessoas-mock";

export default function SetoresAreas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSetores = setoresMock.filter((setor) => {
    const matchesSearch = setor.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || setor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/cadastro/pessoas/setores/novo")} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Setor
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filter-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do setor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela */}
      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[hsl(var(--sidebar-bg))] hover:bg-[hsl(var(--sidebar-bg))]">
              <TableHead className="text-white font-semibold">Nome</TableHead>
              <TableHead className="text-white font-semibold">Área Pai</TableHead>
              <TableHead className="text-white font-semibold">Responsável</TableHead>
              <TableHead className="text-white font-semibold text-center">Qtde Pessoas</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSetores.map((setor) => (
              <TableRow key={setor.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{setor.nome}</TableCell>
                <TableCell>{setor.areaPaiNome || "-"}</TableCell>
                <TableCell>{setor.responsavelNome || "-"}</TableCell>
                <TableCell className="text-center">{setor.qtdePessoas}</TableCell>
                <TableCell>
                  <StatusBadge status={setor.status} />
                </TableCell>
                <TableCell className="text-center">
                  <TableActions
                    onEdit={() => navigate(`/cadastro/pessoas/setores/${setor.id}/editar`)}
                    onDelete={() => console.log("Inativar:", setor.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Resumo */}
      <div className="text-sm text-muted-foreground">
        Exibindo {filteredSetores.length} de {setoresMock.length} setores
      </div>
    </div>
  );
}
