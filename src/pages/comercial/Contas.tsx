import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { Plus, Download, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contasMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { toast } from "@/hooks/use-toast";
import { ExportButton } from "@/components/ExportButton";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function Contas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [segmentoFilter, setSegmentoFilter] = useState("");

  const segmentos = [...new Set(contasMock.map(c => c.segmento))];

  const filteredContas = contasMock.filter(conta => {
    const matchSearch = !searchTerm || conta.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta.cnpj.includes(searchTerm);
    const matchStatus = !statusFilter || conta.status === statusFilter;
    const matchSegmento = !segmentoFilter || conta.segmento === segmentoFilter;
    return matchSearch && matchStatus && matchSegmento;
  });

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) {
      case 'cliente': return 'Entrada';
      case 'prospect': return 'Em andamento';
      case 'inativo': return 'Processando';
      case 'churned': return 'Vencida';
      default: return 'Em aberto';
    }
  };

  const getPorteLabel = (porte: string) => {
    const labels: Record<string, string> = { 'micro': 'Micro', 'pequena': 'Pequena', 'media': 'Média', 'grande': 'Grande' };
    return labels[porte] || porte;
  };

  const getOwnerName = (ownerId: string) => {
    const pessoa = pessoasMock.find(p => p.id === ownerId);
    return pessoa?.nome.split(' ')[0] || 'N/A';
  };

  const getExportData = () => filteredContas.map(c => ({
    "Nome Fantasia": c.nomeFantasia, "Razão Social": c.razaoSocial, CNPJ: c.cnpj,
    Segmento: c.segmento, Porte: getPorteLabel(c.porte), Cidade: c.cidade, UF: c.uf,
    Status: c.status, "Limite Crédito": c.limiteCredito || "", Responsável: getOwnerName(c.responsavelId)
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate('/comercial/contas/nova')} className="gap-2">
          <Plus className="w-4 h-4" /> Nova Conta
        </Button>
        <ExportButton getData={getExportData} fileName="contas" sheetName="Contas" />
      </div>

      <FilterSection
        fields={[
          { type: "text", label: "Buscar", placeholder: "Empresa ou CNPJ...", value: searchTerm, onChange: setSearchTerm, width: "flex-1 min-w-[200px]" },
          { type: "select", label: "Status", placeholder: "Todos", value: statusFilter, onChange: setStatusFilter, options: [
            { value: "prospect", label: "Prospect" }, { value: "cliente", label: "Cliente" },
            { value: "inativo", label: "Inativo" }, { value: "churned", label: "Churned" }
          ], width: "min-w-[160px]" },
          { type: "select", label: "Segmento", placeholder: "Todos", value: segmentoFilter, onChange: setSegmentoFilter,
            options: segmentos.map(s => ({ value: s, label: s })), width: "min-w-[160px]" }
        ]}
        resultsCount={filteredContas.length}
      />

      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header">
              <TableHead>Empresa</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Porte</TableHead>
              <TableHead>Cidade/UF</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Limite Crédito</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContas.map((conta) => (
              <TableRow key={conta.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{conta.nomeFantasia}</p>
                      <p className="text-xs text-muted-foreground">{conta.razaoSocial}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm whitespace-nowrap">{conta.cnpj}</TableCell>
                <TableCell><Badge variant="outline">{conta.segmento}</Badge></TableCell>
                <TableCell>{getPorteLabel(conta.porte)}</TableCell>
                <TableCell>{conta.cidade}/{conta.uf}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <StatusBadge status={getStatusBadgeStatus(conta.status)} />
                </TableCell>
                <TableCell>{conta.limiteCredito ? formatCurrency(conta.limiteCredito) : '-'}</TableCell>
                <TableCell>{getOwnerName(conta.responsavelId)}</TableCell>
                <TableCell>
                  <TableActions onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
