import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { 
  Plus, Search, Upload, Users, Flame, Thermometer, Snowflake, CheckCircle, XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { leadsMock, origensLead } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

export default function Leads() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("__all__");
  const [origemFilter, setOrigemFilter] = useState("__all__");

  const filteredLeads = leadsMock.filter(lead => {
    const matchSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "__all__" || lead.status === statusFilter;
    const matchOrigem = origemFilter === "__all__" || lead.origem === origemFilter;
    return matchSearch && matchStatus && matchOrigem;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'quente': return <Flame className="h-4 w-4 text-destructive" />;
      case 'morno': return <Thermometer className="h-4 w-4 text-warning" />;
      case 'frio': return <Snowflake className="h-4 w-4 text-info" />;
      case 'convertido': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'perdido': return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <Users className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'novo': 'Novo',
      'quente': 'Quente',
      'morno': 'Morno',
      'frio': 'Frio',
      'convertido': 'Convertido',
      'perdido': 'Perdido'
    };
    return labels[status] || status;
  };

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) {
      case 'quente': return 'Crítico';
      case 'morno': return 'Em andamento';
      case 'frio': return 'Processando';
      case 'convertido': return 'Entrada';
      case 'perdido': return 'Vencida';
      default: return 'Em aberto';
    }
  };

  const getOwnerName = (ownerId: string) => {
    const pessoa = pessoasMock.find(p => p.id === ownerId);
    return pessoa?.nome.split(' ')[0] || 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[300px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button onClick={() => navigate('/comercial/leads/novo')}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
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
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="quente">Quente</SelectItem>
                <SelectItem value="morno">Morno</SelectItem>
                <SelectItem value="frio">Frio</SelectItem>
                <SelectItem value="convertido">Convertido</SelectItem>
                <SelectItem value="perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Origem:</span>
            <Select value={origemFilter} onValueChange={setOrigemFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Todas</SelectItem>
                {origensLead.map(origem => (
                  <SelectItem key={origem} value={origem}>{origem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setStatusFilter("__all__");
              setOrigemFilter("__all__");
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
              <TableHead>Empresa</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Proprietário</TableHead>
              <TableHead>Última Atividade</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{lead.nome}</TableCell>
                <TableCell>{lead.empresa}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{lead.email}</p>
                    <p className="text-muted-foreground">{lead.telefone}</p>
                  </div>
                </TableCell>
                <TableCell>{lead.origem}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(lead.status)}
                    <StatusBadge status={getStatusBadgeStatus(lead.status)} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
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
                <TableCell>{getOwnerName(lead.proprietarioId)}</TableCell>
                <TableCell className="text-muted-foreground">{lead.ultimaAtividade}</TableCell>
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
