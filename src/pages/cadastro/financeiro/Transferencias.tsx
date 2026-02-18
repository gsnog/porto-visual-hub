import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, FileText } from "lucide-react";
import { exportToExcel } from "@/lib/exportToExcel";
import { toast } from "@/hooks/use-toast";

const mockTransferencias = [
  { id: 1, data: "15/01/2026", contaOrigem: "Banco do Brasil - 12345-6", contaDestino: "Itaú - 98765-4", valor: "R$ 10.000,00" },
  { id: 2, data: "18/01/2026", contaOrigem: "Itaú - 98765-4", contaDestino: "Bradesco - 54321-0", valor: "R$ 5.000,00" },
];
type Transferencia = typeof mockTransferencias[0];

const Transferencias = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockTransferencias);
  const [searchData, setSearchData] = useState("");
  const [searchConta, setSearchConta] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<Transferencia | null>(null);
  const [editItem, setEditItem] = useState<Transferencia | null>(null);
  const [editData, setEditData] = useState({ data: "", contaOrigem: "", contaDestino: "", valor: "" });
  const filtered = items.filter(t => t.contaOrigem.toLowerCase().includes(searchConta.toLowerCase()));
  const handleExport = () => { exportToExcel(filtered.map(t => ({ Data: t.data, "Conta Origem": t.contaOrigem, "Conta Destino": t.contaDestino, Valor: t.valor })), "transferencias"); };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Transferência excluída." }); } };
  const deleteItem = items.find(i => i.id === deleteId);
  const openEdit = (t: Transferencia) => { setEditItem(t); setEditData({ data: t.data, contaOrigem: t.contaOrigem, contaDestino: t.contaDestino, valor: t.valor }); };

  return (
    <div className="flex flex-col h-full bg-background"><div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate("/cadastro/financeiro/transferencias/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Transferência</Button>
        <Button variant="outline" className="gap-2" onClick={handleExport}><FileText className="w-4 h-4" />Exportar</Button>
      </div>
      <FilterSection fields={[
        { type: "text" as const, label: "Conta Origem", placeholder: "Buscar conta origem...", value: searchConta, onChange: setSearchConta, width: "flex-1 min-w-[200px]" },
        { type: "date" as const, label: "Data", value: searchData, onChange: setSearchData, width: "min-w-[160px]" }
      ]} resultsCount={filtered.length} />
      <div className="rounded border border-border overflow-hidden"><Table><TableHeader><TableRow className="bg-table-header">
        <TableHead className="text-center font-semibold">Data</TableHead><TableHead className="text-center font-semibold">Conta Origem</TableHead><TableHead className="text-center font-semibold">Conta Destino</TableHead><TableHead className="text-center font-semibold">Valor</TableHead><TableHead className="text-center font-semibold">Ações</TableHead>
      </TableRow></TableHeader><TableBody>
        {filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhuma transferência encontrada.</TableCell></TableRow> :
          filtered.map(t => <TableRow key={t.id} className="hover:bg-table-hover transition-colors"><TableCell className="text-center">{t.data}</TableCell><TableCell className="text-center font-medium">{t.contaOrigem}</TableCell><TableCell className="text-center">{t.contaDestino}</TableCell><TableCell className="text-center font-semibold">{t.valor}</TableCell><TableCell className="text-center"><TableActions onView={() => setViewItem(t)} onEdit={() => openEdit(t)} onDelete={() => setDeleteId(t.id)} /></TableCell></TableRow>)}
      </TableBody></Table></div>
    </div>
    <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}><DialogContent><DialogHeader><DialogTitle>Transferência</DialogTitle></DialogHeader>{viewItem && <div className="space-y-2 py-2"><InfoRow label="Data" value={viewItem.data} /><InfoRow label="Conta Origem" value={viewItem.contaOrigem} /><InfoRow label="Conta Destino" value={viewItem.contaDestino} /><InfoRow label="Valor" value={viewItem.valor} /></div>}</DialogContent></Dialog>
    <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar Transferência</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2"><Label>Data</Label><Input value={editData.data} onChange={e => setEditData(p => ({ ...p, data: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Conta Origem</Label><Input value={editData.contaOrigem} onChange={e => setEditData(p => ({ ...p, contaOrigem: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Conta Destino</Label><Input value={editData.contaDestino} onChange={e => setEditData(p => ({ ...p, contaDestino: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Valor</Label><Input value={editData.valor} onChange={e => setEditData(p => ({ ...p, valor: e.target.value }))} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
          <Button onClick={() => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Transferência atualizada." }); } }}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir esta transferência de <strong>{deleteItem?.valor}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
};
function InfoRow({ label, value }: { label: string; value: string }) { return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>; }
export default Transferencias;
