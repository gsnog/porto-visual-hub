import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Clock, User, Settings, FileText, DollarSign, Shield } from "lucide-react";

// Logs de auditoria — dados estáticos temporários (futuro: endpoint /api/auditoria/)
const auditLogs = [
  { id: 1, tipo: "acesso", acao: "Perfil alterado para 'Gestor'", pessoa: "Usuário", pessoaId: "0", usuario: "Admin", dataHora: "04/02/2026 15:30:45", detalhes: "Perfil anterior: Usuário" },
  { id: 2, tipo: "salario", acao: "Salário atualizado", pessoa: "Usuário", pessoaId: "0", usuario: "Admin", dataHora: "04/02/2026 14:20:00", detalhes: "Aguardando dados reais" },
];

const tipoIcons: Record<string, typeof Clock> = {
  acesso: Shield, salario: DollarSign, gestor: User, dashboard: Settings, documento: FileText, setor: User,
};

const tipoColors: Record<string, string> = {
  acesso: "bg-blue-500/10 text-blue-600", salario: "bg-primary/10 text-primary",
  gestor: "bg-purple-500/10 text-purple-600", dashboard: "bg-orange-500/10 text-orange-600",
  documento: "bg-yellow-500/10 text-yellow-600", setor: "bg-cyan-500/10 text-cyan-600",
};

export default function Auditoria() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState("all");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.pessoa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = tipoFilter === "all" || log.tipo === tipoFilter;
    return matchesSearch && matchesTipo;
  });

  return (
    <div className="space-y-6">
      <div className="filter-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ação, pessoa ou detalhes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger><SelectValue placeholder="Tipo de Alteração" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="acesso">Acesso</SelectItem>
              <SelectItem value="salario">Salário</SelectItem>
              <SelectItem value="gestor">Gestor</SelectItem>
              <SelectItem value="dashboard">Dashboard</SelectItem>
              <SelectItem value="documento">Documento</SelectItem>
              <SelectItem value="setor">Setor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Histórico de Alterações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Tipo</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Pessoa</TableHead>
                  <TableHead>Por</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const Icon = tipoIcons[log.tipo] || Clock;
                  const colorClass = tipoColors[log.tipo] || "bg-muted text-muted-foreground";
                  return (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className={`inline-flex items-center justify-center p-2 rounded ${colorClass}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{log.acao}</TableCell>
                      <TableCell>{log.pessoa}</TableCell>
                      <TableCell className="text-muted-foreground">{log.usuario}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.dataHora}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.detalhes}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Exibindo {filteredLogs.length} de {auditLogs.length} registros
      </div>
    </div>
  );
}
