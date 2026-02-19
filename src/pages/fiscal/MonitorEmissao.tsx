import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "@/hooks/use-toast";
import { RotateCcw, Eye, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

const mockMonitor = [
  { id: 1, numero: 151, cliente: "XYZ SA", data: "17/02/2026", status: "Rejeitada", mensagem: "Erro 539 - Duplicidade de NF-e", tentativas: 2 },
  { id: 2, numero: 149, cliente: "GHI Consultoria", data: "16/02/2026", status: "Enviada", mensagem: "Aguardando retorno da SEFAZ", tentativas: 1 },
  { id: 3, numero: 147, cliente: "ABC Ltda", data: "15/02/2026", status: "Em validação", mensagem: "Validando XML...", tentativas: 1 },
];

const MonitorEmissao = () => {
  const [items] = useState(mockMonitor);
  const [filter, setFilter] = useState("todos");

  const filtered = items.filter(i => filter === "todos" || i.status === filter);

  return (
    <div className="flex flex-col h-full bg-background"><div className="space-y-6">
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 rounded border border-border bg-card">
          <div className="p-2 rounded bg-primary/10"><CheckCircle2 className="h-5 w-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground font-medium">Integração API</p><p className="text-sm font-bold text-primary">OK</p></div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded border border-border bg-card">
          <div className="p-2 rounded bg-primary/10"><CheckCircle2 className="h-5 w-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground font-medium">Certificado Digital</p><p className="text-sm font-bold text-primary">OK</p></div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded border border-border bg-card">
          <div className="p-2 rounded bg-amber-500/10"><AlertTriangle className="h-5 w-5 text-amber-500" /></div>
          <div><p className="text-xs text-muted-foreground font-medium">Notas Pendentes</p><p className="text-sm font-bold text-amber-600 dark:text-amber-400">{items.length}</p></div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["todos", "Em validação", "Rejeitada", "Enviada"].map(f => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="text-xs">
            {f === "todos" ? "Todos" : f}
          </Button>
        ))}
      </div>

      <div className="rounded border border-border overflow-hidden">
        <Table>
          <TableHeader><TableRow className="bg-table-header">
            <TableHead className="text-center font-semibold">Nº</TableHead>
            <TableHead className="font-semibold">Cliente</TableHead>
            <TableHead className="text-center font-semibold">Data</TableHead>
            <TableHead className="text-center font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Última Mensagem</TableHead>
            <TableHead className="text-center font-semibold">Tentativas</TableHead>
            <TableHead className="text-center font-semibold">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.length === 0 ? <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma nota pendente.</TableCell></TableRow> :
              filtered.map(n => (
                <TableRow key={n.id} className="hover:bg-table-hover transition-colors">
                  <TableCell className="text-center font-mono font-bold">{n.numero}</TableCell>
                  <TableCell className="font-medium">{n.cliente}</TableCell>
                  <TableCell className="text-center text-sm">{n.data}</TableCell>
                  <TableCell className="text-center"><StatusBadge status={n.status} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[250px] truncate">{n.mensagem}</TableCell>
                  <TableCell className="text-center font-mono">{n.tentativas}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toast({ title: "Reprocessando...", description: `Nota #${n.numero} reenviada.` })}><RotateCcw className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div></div>
  );
};

export default MonitorEmissao;