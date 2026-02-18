import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { ExportButton } from "@/components/ExportButton";
import { Plus, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contasMock } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function Contas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [segmentoFilter, setSegmentoFilter] = useState("");
  const [contas, setContas] = useState(contasMock);
  const [viewItem, setViewItem] = useState<typeof contasMock[0] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<typeof contasMock[0] | null>(null);
  const [editData, setEditData] = useState({ nomeFantasia: "", razaoSocial: "", cnpj: "" });

  const segmentos = [...new Set(contas.map(c => c.segmento))];

  const filteredContas = contas.filter(conta => {
    const matchSearch = !searchTerm || conta.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) || conta.cnpj.includes(searchTerm);
    const matchStatus = !statusFilter || conta.status === statusFilter;
    const matchSegmento = !segmentoFilter || conta.segmento === segmentoFilter;
    return matchSearch && matchStatus && matchSegmento;
  });

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) { case 'cliente': return 'Entrada'; case 'prospect': return 'Em andamento'; case 'inativo': return 'Processando'; case 'churned': return 'Vencida'; default: return 'Em aberto'; }
  };
  const getPorteLabel = (porte: string) => { const labels: Record<string, string> = { 'micro': 'Micro', 'pequena': 'Pequena', 'media': 'Média', 'grande': 'Grande' }; return labels[porte] || porte; };
  const getOwnerName = (ownerId: string) => pessoasMock.find(p => p.id === ownerId)?.nome.split(' ')[0] || 'N/A';

  const getExportData = () => filteredContas.map(c => ({
    "Nome Fantasia": c.nomeFantasia, "Razão Social": c.razaoSocial, CNPJ: c.cnpj,
    Segmento: c.segmento, Porte: getPorteLabel(c.porte), Cidade: c.cidade, UF: c.uf,
    Status: c.status, "Limite Crédito": c.limiteCredito || "", Responsável: getOwnerName(c.responsavelId)
  }));

  const openEdit = (c: typeof contasMock[0]) => { setEditItem(c); setEditData({ nomeFantasia: c.nomeFantasia, razaoSocial: c.razaoSocial, cnpj: c.cnpj }) };
  const handleSaveEdit = () => { if (editItem) { setContas(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Conta atualizada." }) } };
  const handleDelete = () => { if (deleteId) { setContas(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Conta excluída." }) } };
  const deleteItemData = contas.find(i => i.id === deleteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate('/comercial/contas/nova')} className="gap-2"><Plus className="w-4 h-4" /> Nova Conta</Button>
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
          <TableHeader><TableRow className="bg-table-header">
            <TableHead>Empresa</TableHead><TableHead>CNPJ</TableHead><TableHead>Segmento</TableHead><TableHead>Porte</TableHead><TableHead>Cidade/UF</TableHead><TableHead>Status</TableHead><TableHead>Limite Crédito</TableHead><TableHead>Responsável</TableHead><TableHead className="w-[50px]"></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filteredContas.map((conta) => (
              <TableRow key={conta.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell><div className="flex items-center gap-2"><div className="p-2 rounded bg-primary/10"><Building2 className="h-4 w-4 text-primary" /></div><div><p className="font-medium">{conta.nomeFantasia}</p><p className="text-xs text-muted-foreground">{conta.razaoSocial}</p></div></div></TableCell>
                <TableCell className="font-mono text-sm whitespace-nowrap">{conta.cnpj}</TableCell>
                <TableCell><Badge variant="outline">{conta.segmento}</Badge></TableCell>
                <TableCell>{getPorteLabel(conta.porte)}</TableCell>
                <TableCell>{conta.cidade}/{conta.uf}</TableCell>
                <TableCell className="whitespace-nowrap"><StatusBadge status={getStatusBadgeStatus(conta.status)} /></TableCell>
                <TableCell>{conta.limiteCredito ? formatCurrency(conta.limiteCredito) : '-'}</TableCell>
                <TableCell>{getOwnerName(conta.responsavelId)}</TableCell>
                <TableCell><TableActions onView={() => setViewItem(conta)} onEdit={() => openEdit(conta)} onDelete={() => setDeleteId(conta.id)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Conta</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ "Nome Fantasia": viewItem.nomeFantasia, "Razão Social": viewItem.razaoSocial, CNPJ: viewItem.cnpj, Segmento: viewItem.segmento, Porte: getPorteLabel(viewItem.porte), Cidade: `${viewItem.cidade}/${viewItem.uf}`, Status: viewItem.status, "Limite Crédito": viewItem.limiteCredito ? formatCurrency(viewItem.limiteCredito) : '-', Responsável: getOwnerName(viewItem.responsavelId) }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Conta</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome Fantasia</Label><Input value={editData.nomeFantasia} onChange={e => setEditData({ ...editData, nomeFantasia: e.target.value })} /></div>
            <div><Label>Razão Social</Label><Input value={editData.razaoSocial} onChange={e => setEditData({ ...editData, razaoSocial: e.target.value })} /></div>
            <div><Label>CNPJ</Label><Input value={editData.cnpj} onChange={e => setEditData({ ...editData, cnpj: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir conta?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.nomeFantasia}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
