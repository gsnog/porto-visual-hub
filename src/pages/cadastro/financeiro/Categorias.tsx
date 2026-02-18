import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, FileText } from "lucide-react";
import { exportToExcel } from "@/lib/exportToExcel";
import { toast } from "@/hooks/use-toast";

const mockCategorias = [{ id: 1, nome: "Despesas Operacionais" }, { id: 2, nome: "Receitas de Serviços" }, { id: 3, nome: "Investimentos" }];

const Categorias = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockCategorias);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<typeof mockCategorias[0] | null>(null);
  const filtered = items.filter(c => c.nome.toLowerCase().includes(search.toLowerCase()));
  const handleExport = () => { exportToExcel(filtered.map(c => ({ Categoria: c.nome })), "categorias"); };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Categoria excluída." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background"><div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate("/cadastro/financeiro/categorias/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Categoria</Button>
        <Button variant="outline" className="gap-2" onClick={handleExport}><FileText className="w-4 h-4" />Exportar</Button>
      </div>
      <FilterSection fields={[{ type: "text" as const, label: "Categoria", placeholder: "Buscar categoria...", value: search, onChange: setSearch, width: "flex-1 min-w-[200px]" }]} resultsCount={filtered.length} />
      <div className="rounded border border-border overflow-hidden"><Table><TableHeader><TableRow className="bg-table-header"><TableHead className="text-center font-semibold">Categoria</TableHead><TableHead className="text-center font-semibold">Ações</TableHead></TableRow></TableHeader><TableBody>
        {filtered.length === 0 ? <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">Nenhuma categoria encontrada.</TableCell></TableRow> :
          filtered.map(c => <TableRow key={c.id} className="hover:bg-table-hover transition-colors"><TableCell className="text-center font-medium">{c.nome}</TableCell><TableCell className="text-center"><TableActions onView={() => setViewItem(c)} onEdit={() => toast({ title: "Editar", description: `Editando "${c.nome}"...` })} onDelete={() => setDeleteId(c.id)} /></TableCell></TableRow>)}
      </TableBody></Table></div>
    </div>
    <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}><DialogContent><DialogHeader><DialogTitle>{viewItem?.nome}</DialogTitle></DialogHeader>{viewItem && <div className="py-2"><div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Categoria</span><span className="text-sm font-medium">{viewItem.nome}</span></div></div>}</DialogContent></Dialog>
    <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.nome}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
};
export default Categorias;
