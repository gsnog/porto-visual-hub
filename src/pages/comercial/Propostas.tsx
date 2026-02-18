import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { Plus, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { propostasMock, getContaById, oportunidadesMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function Propostas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredPropostas = propostasMock.filter(proposta => {
    const conta = getContaById(proposta.contaId);
    const matchSearch = !searchTerm || proposta.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta?.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !statusFilter || proposta.status === statusFilter;
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

  const getOwnerName = (ownerId: string) => pessoasMock.find(p => p.id === ownerId)?.nome.split(' ')[0] || 'N/A';
  const getOportunidadeTitulo = (opId: string) => oportunidadesMock.find(o => o.id === opId)?.titulo || 'N/A';

  const handleExport = () => {
    const exportData = filteredPropostas.map(p => {
      const conta = getContaById(p.contaId);
      return {
        "Nº Proposta": p.numero, Conta: conta?.nomeFantasia || '', Oportunidade: getOportunidadeTitulo(p.oportunidadeId),
        Valor: p.valor, Status: p.status, Validade: p.validade, Versão: p.versao, Responsável: getOwnerName(p.responsavelId)
      };
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Propostas");
    XLSX.writeFile(wb, "propostas.xlsx");
    toast({ title: "Exportação concluída" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate('/comercial/propostas/nova')} className="gap-2">
          <Plus className="w-4 h-4" /> Nova Proposta
        </Button>
        <Button variant="outline" onClick={handleExport} className="gap-2 border-border">
          <Download className="w-4 h-4" /> Exportar
        </Button>
      </div>

      <FilterSection
        fields={[
          { type: "text", label: "Buscar", placeholder: "Nº proposta ou conta...", value: searchTerm, onChange: setSearchTerm, width: "flex-1 min-w-[200px]" },
          { type: "select", label: "Status", placeholder: "Todos", value: statusFilter, onChange: setStatusFilter, options: [
            { value: "rascunho", label: "Rascunho" }, { value: "enviada", label: "Enviada" },
            { value: "aprovada", label: "Aprovada" }, { value: "recusada", label: "Recusada" }, { value: "expirada", label: "Expirada" }
          ], width: "min-w-[160px]" }
        ]}
        resultsCount={filteredPropostas.length}
      />

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
                  <TableCell><Badge variant="outline">v{proposta.versao}</Badge></TableCell>
                  <TableCell>{getOwnerName(proposta.responsavelId)}</TableCell>
                  <TableCell>
                    <TableActions onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
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
