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
import { Search, Eye, Settings, LayoutDashboard } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { pessoasMock, setoresMock } from "@/data/pessoas-mock";

export default function PessoasVisao360() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [setorFilter, setSetorFilter] = useState("all");

  const filteredPessoas = pessoasMock.filter((pessoa) => {
    const matchesSearch = pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pessoa.status === statusFilter;
    const matchesSetor = setorFilter === "all" || pessoa.setorId === setorFilter;
    
    return matchesSearch && matchesStatus && matchesSetor;
  });

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="filter-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>

      {/* Tabela */}
      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Gestor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Ações Rápidas</TableHead>
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
                <TableCell>{pessoa.setor}</TableCell>
                <TableCell>{pessoa.cargo}</TableCell>
                <TableCell>{pessoa.gestorNome || "-"}</TableCell>
                <TableCell>
                  <StatusBadge status={pessoa.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => navigate(`/gestao-pessoas/pessoas/${pessoa.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                      Perfil 360º
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => navigate(`/gestao-pessoas/acessos?pessoa=${pessoa.id}`)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => navigate(`/gestao-pessoas/dashboards?pessoa=${pessoa.id}`)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                    </Button>
                  </div>
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
