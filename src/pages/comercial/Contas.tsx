import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { Plus, Search, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contasMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export default function Contas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("__all__");
  const [segmentoFilter, setSegmentoFilter] = useState("__all__");

  const segmentos = [...new Set(contasMock.map(c => c.segmento))];

  const filteredContas = contasMock.filter(conta => {
    const matchSearch = conta.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta.cnpj.includes(searchTerm);
    const matchStatus = statusFilter === "__all__" || conta.status === statusFilter;
    const matchSegmento = segmentoFilter === "__all__" || conta.segmento === segmentoFilter;
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
    const labels: Record<string, string> = {
      'micro': 'Micro',
      'pequena': 'Pequena',
      'media': 'Média',
      'grande': 'Grande'
    };
    return labels[porte] || porte;
  };

  const getOwnerName = (ownerId: string) => {
    const pessoa = pessoasMock.find(p => p.id === ownerId);
    return pessoa?.nome.split(' ')[0] || 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[300px]"
          />
        </div>
        <Button onClick={() => navigate('/comercial/contas/nova')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Conta
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
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="churned">Churned</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Segmento:</span>
            <Select value={segmentoFilter} onValueChange={setSegmentoFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Todos</SelectItem>
                {segmentos.map(seg => (
                  <SelectItem key={seg} value={seg}>{seg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setStatusFilter("__all__");
              setSegmentoFilter("__all__");
              setSearchTerm("");
            }}
          >
            Limpar Filtros
          </Button>

          <span className="ml-auto text-sm text-muted-foreground">
            {filteredContas.length} resultado(s)
          </span>
        </div>
      </Card>

      {/* Tabela */}
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
                <TableCell className="font-mono text-sm">{conta.cnpj}</TableCell>
                <TableCell>
                  <Badge variant="outline">{conta.segmento}</Badge>
                </TableCell>
                <TableCell>{getPorteLabel(conta.porte)}</TableCell>
                <TableCell>{conta.cidade}/{conta.uf}</TableCell>
                <TableCell>
                  <StatusBadge status={getStatusBadgeStatus(conta.status)} />
                </TableCell>
                <TableCell>
                  {conta.limiteCredito ? formatCurrency(conta.limiteCredito) : '-'}
                </TableCell>
                <TableCell>{getOwnerName(conta.responsavelId)}</TableCell>
                <TableCell>
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
    </div>
  );
}
