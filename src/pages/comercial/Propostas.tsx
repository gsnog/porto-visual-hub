import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { ExportButton } from "@/components/ExportButton";
import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { propostasMock, getContaById, oportunidadesMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function Propostas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [propostas, setPropostas] = useState(propostasMock);
  const [viewItem, setViewItem] = useState<typeof propostasMock[0] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<typeof propostasMock[0] | null>(null);
  const [editData, setEditData] = useState({ numero: "", valor: "", validade: "" });

  const filteredPropostas = propostas.filter(proposta => {
    const conta = getContaById(proposta.contaId);
    const matchSearch = !searchTerm || proposta.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta?.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !statusFilter || proposta.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) { case 'rascunho': return 'Processando'; case 'enviada': return 'Em andamento'; case 'aprovada': return 'Entrada'; case 'recusada': return 'Vencida'; case 'expirada': return 'Crítico'; default: return 'Em aberto'; }
  };
  const getOwnerName = (ownerId: string) => pessoasMock.find(p => p.id === ownerId)?.nome.split(' ')[0] || 'N/A';
  const getOportunidadeTitulo = (opId: string) => oportunidadesMock.find(o => o.id === opId)?.titulo || 'N/A';

  const getExportData = () => filteredPropostas.map(p => {
    const conta = getContaById(p.contaId);
    return { "Nº Proposta": p.numero, Conta: conta?.nomeFantasia || '', Oportunidade: getOportunidadeTitulo(p.oportunidadeId), Valor: p.valor, Status: p.status, Validade: p.validade, Versão: p.versao, Responsável: getOwnerName(p.responsavelId) };
  });

  const openEdit = (p: typeof propostasMock[0]) => { setEditItem(p); setEditData({ numero: p.numero, valor: String(p.valor), validade: p.validade }) };
  const handleSaveEdit = () => { if (editItem) { setPropostas(prev => prev.map(i => i.id === editItem.id ? { ...i, numero: editData.numero, valor: Number(editData.valor), validade: editData.validade } : i)); setEditItem(null); toast({ title: "Salvo", description: "Proposta atualizada." }) } };
  const handleDelete = () => { if (deleteId) { setPropostas(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Proposta excluída." }) } };
  const deleteItemData = propostas.find(i => i.id === deleteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate('/comercial/propostas/nova')} className="gap-2"><Plus className="w-4 h-4" /> Nova Proposta</Button>
        <ExportButton getData={getExportData} fileName="propostas" sheetName="Propostas" />
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
          <TableHeader><TableRow className="bg-table-header">
            <TableHead>Nº Proposta</TableHead><TableHead>Conta</TableHead><TableHead>Oportunidade</TableHead><TableHead>Valor</TableHead><TableHead>Status</TableHead><TableHead>Validade</TableHead><TableHead>Versão</TableHead><TableHead>Responsável</TableHead><TableHead className="w-[50px]"></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filteredPropostas.map((proposta) => {
              const conta = getContaById(proposta.contaId);
              const isExpired = new Date(proposta.validade) < new Date() && proposta.status === 'enviada';
              return (
                <TableRow key={proposta.id} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /><span className="font-medium">{proposta.numero}</span></div></TableCell>
                  <TableCell>{conta?.nomeFantasia}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{getOportunidadeTitulo(proposta.oportunidadeId)}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(proposta.valor)}</TableCell>
                  <TableCell><StatusBadge status={isExpired ? 'Crítico' : getStatusBadgeStatus(proposta.status)} /></TableCell>
                  <TableCell className={isExpired ? 'text-destructive' : ''}>{new Date(proposta.validade).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell><Badge variant="outline">v{proposta.versao}</Badge></TableCell>
                  <TableCell>{getOwnerName(proposta.responsavelId)}</TableCell>
                  <TableCell><TableActions onView={() => setViewItem(proposta)} onEdit={() => openEdit(proposta)} onDelete={() => setDeleteId(proposta.id)} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Proposta</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ "Nº Proposta": viewItem.numero, Conta: getContaById(viewItem.contaId)?.nomeFantasia || '', Oportunidade: getOportunidadeTitulo(viewItem.oportunidadeId), Valor: formatCurrency(viewItem.valor), Status: viewItem.status, Validade: new Date(viewItem.validade).toLocaleDateString('pt-BR'), Versão: `v${viewItem.versao}`, Responsável: getOwnerName(viewItem.responsavelId) }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Proposta</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Número</Label><Input value={editData.numero} onChange={e => setEditData({ ...editData, numero: e.target.value })} /></div>
            <div><Label>Valor</Label><Input type="number" value={editData.valor} onChange={e => setEditData({ ...editData, valor: e.target.value })} /></div>
            <div><Label>Validade</Label><Input type="date" value={editData.validade} onChange={e => setEditData({ ...editData, validade: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir proposta?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.numero}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
