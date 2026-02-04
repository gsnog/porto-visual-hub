import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { Plus, Search, Users, ArrowRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { leadsMarketingMock, campanhasMock, canaisMock } from "@/data/marketing-mock";

export default function LeadsMarketing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("__all__");
  const [canalFilter, setCanalFilter] = useState("__all__");

  const filteredLeads = leadsMarketingMock.filter(lead => {
    const matchSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (lead.empresa?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = statusFilter === "__all__" || lead.status === statusFilter;
    const matchCanal = canalFilter === "__all__" || lead.canalId === canalFilter;
    return matchSearch && matchStatus && matchCanal;
  });

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) {
      case 'lead': return 'Em aberto';
      case 'mql': return 'Em andamento';
      case 'sql': return 'Processando';
      case 'convertido': return 'Entrada';
      case 'descartado': return 'Vencida';
      default: return 'Em aberto';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'lead': 'Lead',
      'mql': 'MQL',
      'sql': 'SQL',
      'convertido': 'Convertido',
      'descartado': 'Descartado'
    };
    return labels[status] || status;
  };

  const getCampanhaNome = (campanhaId?: string) => {
    if (!campanhaId) return '-';
    const campanha = campanhasMock.find(c => c.id === campanhaId);
    return campanha?.nome || '-';
  };

  const getCanalNome = (canalId: string) => {
    const canal = canaisMock.find(c => c.id === canalId);
    return canal?.nome || '-';
  };

  // Contadores
  const countByStatus = {
    lead: leadsMarketingMock.filter(l => l.status === 'lead').length,
    mql: leadsMarketingMock.filter(l => l.status === 'mql').length,
    sql: leadsMarketingMock.filter(l => l.status === 'sql').length,
    convertido: leadsMarketingMock.filter(l => l.status === 'convertido').length,
  };

  return (
    <div className="space-y-6">
      {/* Funil visual */}
      <div className="flex items-center justify-center gap-2 p-4 bg-muted/30 rounded">
        <div className="text-center px-6 py-3 bg-card rounded border border-border">
          <p className="text-2xl font-bold">{countByStatus.lead}</p>
          <p className="text-sm text-muted-foreground">Leads</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
        <div className="text-center px-6 py-3 bg-card rounded border border-border">
          <p className="text-2xl font-bold text-warning">{countByStatus.mql}</p>
          <p className="text-sm text-muted-foreground">MQL</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
        <div className="text-center px-6 py-3 bg-card rounded border border-border">
          <p className="text-2xl font-bold text-primary">{countByStatus.sql}</p>
          <p className="text-sm text-muted-foreground">SQL</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
        <div className="text-center px-6 py-3 bg-card rounded border border-border">
          <p className="text-2xl font-bold text-success">{countByStatus.convertido}</p>
          <p className="text-sm text-muted-foreground">Convertidos</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[300px]"
          />
        </div>
        <Button onClick={() => navigate('/marketing/leads/novo')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Lead
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
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="mql">MQL</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="convertido">Convertido</SelectItem>
                <SelectItem value="descartado">Descartado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Canal:</span>
            <Select value={canalFilter} onValueChange={setCanalFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Todos</SelectItem>
                {canaisMock.map(canal => (
                  <SelectItem key={canal.id} value={canal.id}>{canal.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setStatusFilter("__all__");
              setCanalFilter("__all__");
              setSearchTerm("");
            }}
          >
            Limpar Filtros
          </Button>

          <span className="ml-auto text-sm text-muted-foreground">
            {filteredLeads.length} resultado(s)
          </span>
        </div>
      </Card>

      {/* Tabela */}
      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header">
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Campanha</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{lead.nome}</span>
                  </div>
                </TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.empresa || '-'}</TableCell>
                <TableCell>{lead.origem}</TableCell>
                <TableCell>
                  <Badge variant="outline">{getCanalNome(lead.canalId)}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                  {getCampanhaNome(lead.campanhaId)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          lead.score >= 70 ? 'bg-success' : 
                          lead.score >= 40 ? 'bg-warning' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm">{lead.score}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {lead.status === 'mql' && <Target className="h-3 w-3 text-warning" />}
                    {lead.status === 'sql' && <Target className="h-3 w-3 text-primary" />}
                    <StatusBadge status={getStatusBadgeStatus(lead.status)} />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                </TableCell>
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
