import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { leadsMock, origensLead } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { toast } from "@/hooks/use-toast";
import { ExportButton } from "@/components/ExportButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";

export default function Leads() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [origemFilter, setOrigemFilter] = useState("");
  const [leads, setLeads] = useState(leadsMock);
  const [viewItem, setViewItem] = useState<typeof leadsMock[0] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<typeof leadsMock[0] | null>(null);
  const [editData, setEditData] = useState({ nome: "", empresa: "", email: "", telefone: "" });

  const filteredLeads = leads.filter(lead => {
    const matchSearch = !searchTerm || lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !statusFilter || lead.status === statusFilter;
    const matchOrigem = !origemFilter || lead.origem === origemFilter;
    return matchSearch && matchStatus && matchOrigem;
  });

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = { 'novo': 'Novo', 'quente': 'Quente', 'morno': 'Morno', 'frio': 'Frio', 'convertido': 'Convertido', 'perdido': 'Perdido' };
    return labels[status] || status;
  };

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) {
      case 'quente': return 'Crítico'; case 'morno': return 'Em andamento'; case 'frio': return 'Processando';
      case 'convertido': return 'Entrada'; case 'perdido': return 'Vencida'; default: return 'Em aberto';
    }
  };

  const getOwnerName = (ownerId: string) => pessoasMock.find(p => p.id === ownerId)?.nome.split(' ')[0] || 'N/A';

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        toast({ title: "Importação concluída", description: `${jsonData.length} registros importados com sucesso.` });
      } catch { toast({ title: "Erro na importação", description: "Arquivo inválido.", variant: "destructive" }); }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const getExportData = () => filteredLeads.map(l => ({
    Nome: l.nome, Empresa: l.empresa, Email: l.email, Telefone: l.telefone,
    Origem: l.origem, Status: getStatusLabel(l.status), Score: l.score,
    Proprietário: getOwnerName(l.proprietarioId), "Última Atividade": l.ultimaAtividade
  }));

  const openEdit = (l: typeof leadsMock[0]) => { setEditItem(l); setEditData({ nome: l.nome, empresa: l.empresa, email: l.email, telefone: l.telefone }) };
  const handleSaveEdit = () => { if (editItem) { setLeads(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Lead atualizado." }) } };
  const handleDelete = () => { if (deleteId) { setLeads(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Lead excluído." }) } };
  const deleteItemData = leads.find(i => i.id === deleteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate('/comercial/leads/novo')} className="gap-2"><Plus className="w-4 h-4" /> Novo Lead</Button>
        <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleImport} />
        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2 border-border"><Upload className="w-4 h-4" /> Importar</Button>
        <ExportButton getData={getExportData} fileName="leads" sheetName="Leads" />
      </div>

      <FilterSection
        fields={[
          { type: "text", label: "Buscar", placeholder: "Nome, empresa ou email...", value: searchTerm, onChange: setSearchTerm, width: "flex-1 min-w-[200px]" },
          { type: "select", label: "Status", placeholder: "Todos", value: statusFilter, onChange: setStatusFilter, options: [
            { value: "novo", label: "Novo" }, { value: "quente", label: "Quente" }, { value: "morno", label: "Morno" },
            { value: "frio", label: "Frio" }, { value: "convertido", label: "Convertido" }, { value: "perdido", label: "Perdido" }
          ], width: "min-w-[160px]" },
          { type: "select", label: "Origem", placeholder: "Todas", value: origemFilter, onChange: setOrigemFilter,
            options: origensLead.map(o => ({ value: o, label: o })), width: "min-w-[160px]" }
        ]}
        resultsCount={filteredLeads.length}
      />

      <div className="rounded border border-border">
        <Table>
          <TableHeader><TableRow className="bg-table-header">
            <TableHead>Nome</TableHead><TableHead>Empresa</TableHead><TableHead>Contato</TableHead><TableHead>Origem</TableHead><TableHead>Status</TableHead><TableHead>Score</TableHead><TableHead>Proprietário</TableHead><TableHead>Última Atividade</TableHead><TableHead className="w-[50px]"></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{lead.nome}</TableCell>
                <TableCell>{lead.empresa}</TableCell>
                <TableCell><div className="text-sm"><p>{lead.email}</p><p className="text-muted-foreground">{lead.telefone}</p></div></TableCell>
                <TableCell>{lead.origem}</TableCell>
                <TableCell><StatusBadge status={getStatusBadgeStatus(lead.status)} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden"><div className={`h-full rounded-full ${lead.score >= 70 ? 'bg-success' : lead.score >= 40 ? 'bg-warning' : 'bg-muted-foreground'}`} style={{ width: `${lead.score}%` }} /></div>
                    <span className="text-sm">{lead.score}</span>
                  </div>
                </TableCell>
                <TableCell>{getOwnerName(lead.proprietarioId)}</TableCell>
                <TableCell className="text-muted-foreground">{lead.ultimaAtividade}</TableCell>
                <TableCell><TableActions onView={() => setViewItem(lead)} onEdit={() => openEdit(lead)} onDelete={() => setDeleteId(lead.id)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes do Lead</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Nome: viewItem.nome, Empresa: viewItem.empresa, Email: viewItem.email, Telefone: viewItem.telefone, Origem: viewItem.origem, Status: getStatusLabel(viewItem.status), Score: String(viewItem.score), Proprietário: getOwnerName(viewItem.proprietarioId), "Última Atividade": viewItem.ultimaAtividade }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Lead</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData({ ...editData, nome: e.target.value })} /></div>
            <div><Label>Empresa</Label><Input value={editData.empresa} onChange={e => setEditData({ ...editData, empresa: e.target.value })} /></div>
            <div><Label>Email</Label><Input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} /></div>
            <div><Label>Telefone</Label><Input value={editData.telefone} onChange={e => setEditData({ ...editData, telefone: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir lead?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.nome}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
