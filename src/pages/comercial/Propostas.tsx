import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { Plus, Search, FileText, Send, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { propostasMock, getContaById, oportunidadesMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export default function Propostas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("__all__");

  const filteredPropostas = propostasMock.filter(proposta => {
    const conta = getContaById(proposta.contaId);
    const matchSearch = proposta.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta?.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "__all__" || proposta.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) {
      case 'rascunho': return 'Processando';
      case 'enviada': return 'Em andamento';
      case 'aprovada': return 'Entrada';
      case 'recusada': return 'Vencida';
      case 'expirada': return 'Crítico';
      default: return 'Em aberto';
    }
  };

  const getOwnerName = (ownerId: string) => {
    const pessoa = pessoasMock.find(p => p.id === ownerId);
    return pessoa?.nome.split(' ')[0] || 'N/A';
  };

  const getOportunidadeTitulo = (opId: string) => {
    const op = oportunidadesMock.find(o => o.id === opId);
    return op?.titulo || 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar propostas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[300px]"
          />
        </div>
        <Button onClick={() => navigate('/comercial/propostas/nova')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Proposta
        </Button>
      </div>

      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Todos</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
                <SelectItem value="enviada">Enviada</SelectItem>
                <SelectItem value="aprovada">Aprovada</SelectItem>
                <SelectItem value="recusada">Recusada</SelectItem>
                <SelectItem value="expirada">Expirada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setStatusFilter("__all__");
              setSearchTerm("");
            }}
          >
            Limpar Filtros
          </Button>

          <span className="ml-auto text-sm text-muted-foreground">
            {filteredPropostas.length} resultado(s)
          </span>
        </div>
      </Card>

      {/* Tabela */}
      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header">
              <TableHead>Nº Proposta</TableHead>
              <TableHead>Conta</TableHead>
              <TableHead>Oportunidade</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Versão</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPropostas.map((proposta) => {
              const conta = getContaById(proposta.contaId);
              const isExpired = new Date(proposta.validade) < new Date() && proposta.status === 'enviada';
              
              return (
                <TableRow key={proposta.id} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="font-medium">{proposta.numero}</span>
                    </div>
                  </TableCell>
                  <TableCell>{conta?.nomeFantasia}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                    {getOportunidadeTitulo(proposta.oportunidadeId)}
                  </TableCell>
                  <TableCell className="font-semibold">{formatCurrency(proposta.valor)}</TableCell>
                  <TableCell>
                    <StatusBadge status={isExpired ? 'Crítico' : getStatusBadgeStatus(proposta.status)} />
                  </TableCell>
                  <TableCell className={isExpired ? 'text-destructive' : ''}>
                    {new Date(proposta.validade).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">v{proposta.versao}</Badge>
                  </TableCell>
                  <TableCell>{getOwnerName(proposta.responsavelId)}</TableCell>
                  <TableCell>
                    <TableActions 
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
