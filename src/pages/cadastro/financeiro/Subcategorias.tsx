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

const mockSubcategorias = [{ id: 1, nome: "Energia Elétrica", categoria: "Despesas Operacionais" }, { id: 2, nome: "Água e Esgoto", categoria: "Despesas Operacionais" }, { id: 3, nome: "Consultoria", categoria: "Receitas de Serviços" }];
type Sub = typeof mockSubcategorias[0];

const Subcategorias = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockSubcategorias);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<Sub | null>(null);
  const [editItem, setEditItem] = useState<Sub | null>(null);
  const [editData, setEditData] = useState({ nome: "", categoria: "" });
  const filtered = items.filter(s => s.nome.toLowerCase().includes(search.toLowerCase()));
  const handleExport = () => { exportToExcel(filtered.map(s => ({ Subcategoria: s.nome, Categoria: s.categoria })), "subcategorias"); };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Subcategoria excluída." }); } };
  const deleteItem = items.find(i => i.id === deleteId);
  const openEdit = (s: Sub) => { setEditItem(s); setEditData({ nome: s.nome, categoria: s.categoria }); };

  return (
    <div className="flex flex-col h-full bg-background"><div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate("/cadastro/financeiro/subcategorias/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Subcategoria</Button>
        <Button variant="outline" className="gap-2" onClick={handleExport}><FileText className="w-4 h-4" />Exportar</Button>
      </div>
      <FilterSection fields={[{ type: "text" as const, label: "Subcategoria", placeholder: "Buscar subcategoria...", value: search, onChange: setSearch, width: "flex-1 min-w-[200px]" }]} resultsCount={filtered.length} />
      <div className="rounded border border-border overflow-hidden"><Table><TableHeader><TableRow className="bg-table-header"><TableHead className="text-center font-semibold">Subcategoria</TableHead><TableHead className="text-center font-semibold">Categoria</TableHead><TableHead className="text-center font-semibold">Ações</TableHead></TableRow></TableHeader><TableBody>
        {filtered.length === 0 ? <TableRow><TableCell colSpan={3} className="text-center py-8 text-muted-foreground">Nenhuma subcategoria encontrada.</TableCell></TableRow> :
          filtered.map(s => <TableRow key={s.id} className="hover:bg-table-hover transition-colors"><TableCell className="text-center font-medium">{s.nome}</TableCell><TableCell className="text-center">{s.categoria}</TableCell><TableCell className="text-center"><TableActions onView={() => setViewItem(s)} onEdit={() => openEdit(s)} onDelete={() => setDeleteId(s.id)} /></TableCell></TableRow>)}
      </TableBody></Table></div>
    </div>
    <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}><DialogContent><DialogHeader><DialogTitle>{viewItem?.nome}</DialogTitle></DialogHeader>{viewItem && <div className="space-y-2 py-2"><InfoRow label="Subcategoria" value={viewItem.nome} /><InfoRow label="Categoria" value={viewItem.categoria} /></div>}</DialogContent></Dialog>
    <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar Subcategoria</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2"><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData(p => ({ ...p, nome: e.target.value }))} /></div>
          <div className="space-y-2"><Label>Categoria</Label><Input value={editData.categoria} onChange={e => setEditData(p => ({ ...p, categoria: e.target.value }))} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
          <Button onClick={() => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Subcategoria atualizada." }); } }}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.nome}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
};
function InfoRow({ label, value }: { label: string; value: string }) { return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>; }
export default Subcategorias;
