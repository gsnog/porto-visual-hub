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
import { pessoasMock, setoresMock, cargosMock, tiposVinculo } from "@/data/pessoas-mock";

export default function Pessoas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [setorFilter, setSetorFilter] = useState("all");
  const [cargoFilter, setCargoFilter] = useState("all");
  const [vinculoFilter, setVinculoFilter] = useState("all");

  const filteredPessoas = pessoasMock.filter((pessoa) => {
    const matchesSearch = pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pessoa.status === statusFilter;
    const matchesSetor = setorFilter === "all" || pessoa.setorId === setorFilter;
    const matchesCargo = cargoFilter === "all" || pessoa.cargo === cargoFilter;
    const matchesVinculo = vinculoFilter === "all" || pessoa.tipoVinculo === vinculoFilter;
    
    return matchesSearch && matchesStatus && matchesSetor && matchesCargo && matchesVinculo;
  });

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/cadastro/pessoas/pessoas/nova")} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Pessoa
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filter-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou e-mail..."
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
              <SelectItem value="Afastado">Afastado</SelectItem>
              <SelectItem value="Desligado">Desligado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={setorFilter} onValueChange={setSetorFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Setor/Área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os setores</SelectItem>
              {setoresMock.map((setor) => (
                <SelectItem key={setor.id} value={setor.id}>
                  {setor.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={cargoFilter} onValueChange={setCargoFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os cargos</SelectItem>
              {cargosMock.map((cargo) => (
                <SelectItem key={cargo.id} value={cargo.nome}>
                  {cargo.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={vinculoFilter} onValueChange={setVinculoFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Vínculo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os vínculos</SelectItem>
              {tiposVinculo.map((tipo) => (
                <SelectItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </SelectItem>
              ))}
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
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">Setor/Área</TableHead>
              <TableHead className="text-white font-semibold">Cargo</TableHead>
              <TableHead className="text-white font-semibold">Gestor Direto</TableHead>
              <TableHead className="text-white font-semibold">Vínculo</TableHead>
              <TableHead className="text-white font-semibold text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPessoas.map((pessoa) => (
              <TableRow key={pessoa.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
                      {pessoa.iniciais}
                    </div>
                    <div>
                      <div className="font-medium">{pessoa.nome}</div>
                      <div className="text-sm text-muted-foreground">{pessoa.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={pessoa.status} />
                </TableCell>
                <TableCell>{pessoa.setor}</TableCell>
                <TableCell>{pessoa.cargo}</TableCell>
                <TableCell>{pessoa.gestorNome || "-"}</TableCell>
                <TableCell>{pessoa.tipoVinculo}</TableCell>
                <TableCell className="text-center">
                  <TableActions
                    onView={() => navigate(`/gestao-pessoas/pessoas/${pessoa.id}`)}
                    onEdit={() => navigate(`/cadastro/pessoas/pessoas/${pessoa.id}/editar`)}
                    onDelete={() => console.log("Inativar:", pessoa.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Resumo */}
      <div className="text-sm text-muted-foreground">
        Exibindo {filteredPessoas.length} de {pessoasMock.length} pessoas
      </div>
    </div>
  );
}
