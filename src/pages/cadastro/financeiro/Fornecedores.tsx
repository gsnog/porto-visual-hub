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
import { ExportButton } from "@/components/ExportButton";
import { toast } from "@/hooks/use-toast";

const mockFornecedores = [
  { id: 1, fornecedor: "Fornecedor ABC", cnpj: "12.345.678/0001-90", razaoSocial: "ABC Ltda", vendedor: "João", email: "contato@abc.com", telefone: "(11) 1234-5678" },
  { id: 2, fornecedor: "Fornecedor XYZ", cnpj: "98.765.432/0001-10", razaoSocial: "XYZ S.A.", vendedor: "Maria", email: "contato@xyz.com", telefone: "(21) 9876-5432" },
];
type Fornecedor = typeof mockFornecedores[0];

const FornecedoresFinanceiro = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockFornecedores);
  const [searchNome, setSearchNome] = useState("");
  const [searchCnpj, setSearchCnpj] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<Fornecedor | null>(null);
  const [editItem, setEditItem] = useState<Fornecedor | null>(null);
  const [editData, setEditData] = useState({ fornecedor: "", cnpj: "", razaoSocial: "", vendedor: "", email: "", telefone: "" });
  const filtered = items.filter(f => f.fornecedor.toLowerCase().includes(searchNome.toLowerCase()) && f.cnpj.includes(searchCnpj));
  const getExportData = () => filtered.map(f => ({ Fornecedor: f.fornecedor, CNPJ: f.cnpj, "Razão Social": f.razaoSocial, Vendedor: f.vendedor, Email: f.email, Telefone: f.telefone }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Fornecedor excluído." }); } };
  const deleteItem = items.find(i => i.id === deleteId);
  const openEdit = (f: Fornecedor) => { setEditItem(f); setEditData({ fornecedor: f.fornecedor, cnpj: f.cnpj, razaoSocial: f.razaoSocial, vendedor: f.vendedor, email: f.email, telefone: f.telefone }); };

  return (
    <div className="flex flex-col h-full bg-background"><div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate("/cadastro/financeiro/fornecedores/novo")} className="gap-2"><Plus className="w-4 h-4" />Novo Fornecedor</Button>
        <ExportButton getData={getExportData} fileName="fornecedores-financeiro" />
      </div>
      <FilterSection fields={[
        { type: "text" as const, label: "Nome do Fornecedor", placeholder: "Buscar fornecedor...", value: searchNome, onChange: setSearchNome, width: "flex-1 min-w-[200px]" },
        { type: "text" as const, label: "CNPJ", placeholder: "Buscar por CNPJ...", value: searchCnpj, onChange: setSearchCnpj, width: "min-w-[180px]" }
      ]} resultsCount={filtered.length} />
      <div className="rounded border border-border overflow-hidden"><Table><TableHeader><TableRow className="bg-table-header">
        <TableHead className="text-center font-semibold">Fornecedor</TableHead><TableHead className="text-center font-semibold">CNPJ/CPF</TableHead><TableHead className="text-center font-semibold">Razão Social</TableHead><TableHead className="text-center font-semibold">Vendedor</TableHead><TableHead className="text-center font-semibold">Email</TableHead><TableHead className="text-center font-semibold">Telefone</TableHead><TableHead className="text-center font-semibold">Ações</TableHead>
      </TableRow></TableHeader><TableBody>
        {filtered.length === 0 ? <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhum fornecedor encontrado.</TableCell></TableRow> :
          filtered.map(f => <TableRow key={f.id} className="hover:bg-table-hover transition-colors"><TableCell className="text-center font-medium">{f.fornecedor}</TableCell><TableCell className="text-center">{f.cnpj}</TableCell><TableCell className="text-center">{f.razaoSocial}</TableCell><TableCell className="text-center">{f.vendedor}</TableCell><TableCell className="text-center">{f.email}</TableCell><TableCell className="text-center">{f.telefone}</TableCell><TableCell className="text-center"><TableActions onView={() => setViewItem(f)} onEdit={() => openEdit(f)} onDelete={() => setDeleteId(f.id)} /></TableCell></TableRow>)}
      </TableBody></Table></div>
    </div>
    <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}><DialogContent><DialogHeader><DialogTitle>{viewItem?.fornecedor}</DialogTitle></DialogHeader>{viewItem && <div className="space-y-2 py-2"><InfoRow label="CNPJ" value={viewItem.cnpj} /><InfoRow label="Razão Social" value={viewItem.razaoSocial} /><InfoRow label="Vendedor" value={viewItem.vendedor} /><InfoRow label="Email" value={viewItem.email} /><InfoRow label="Telefone" value={viewItem.telefone} /></div>}</DialogContent></Dialog>
    <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Editar Fornecedor</DialogTitle></DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2"><Label>Fornecedor</Label><Input value={editData.fornecedor} onChange={e => setEditData(p => ({ ...p, fornecedor: e.target.value }))} /></div>
          <div className="space-y-2"><Label>CNPJ</Label><Input value={editData.cnpj} onChange={e => setEditData(p => ({ ...p, cnpj: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Razão Social</Label><Input value={editData.razaoSocial} onChange={e => setEditData(p => ({ ...p, razaoSocial: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Vendedor</Label><Input value={editData.vendedor} onChange={e => setEditData(p => ({ ...p, vendedor: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Email</Label><Input value={editData.email} onChange={e => setEditData(p => ({ ...p, email: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Telefone</Label><Input value={editData.telefone} onChange={e => setEditData(p => ({ ...p, telefone: e.target.value }))} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
          <Button onClick={() => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Fornecedor atualizado." }); } }}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.fornecedor}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
};
function InfoRow({ label, value }: { label: string; value: string }) { return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>; }
export default FornecedoresFinanceiro;
