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

const mockPlanos = [
  { id: 1, idPlano: "PC001", categoria: "Despesas Operacionais", subcategoria: "Energia Elétrica", contabil: "Ativo Circulante" },
  { id: 2, idPlano: "PC002", categoria: "Receitas de Serviços", subcategoria: "Consultoria", contabil: "Patrimônio Líquido" },
];

const PlanoContas = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockPlanos);
  const [searchCat, setSearchCat] = useState("");
  const [searchSub, setSearchSub] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<typeof mockPlanos[0] | null>(null);
  const filtered = items.filter(p => p.categoria.toLowerCase().includes(searchCat.toLowerCase()) && p.subcategoria.toLowerCase().includes(searchSub.toLowerCase()));
  const handleExport = () => { exportToExcel(filtered.map(p => ({ "ID Plano": p.idPlano, Categoria: p.categoria, Subcategoria: p.subcategoria, Contábil: p.contabil })), "plano-contas"); };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Plano de contas excluído." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background"><div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate("/cadastro/financeiro/plano-contas/novo")} className="gap-2"><Plus className="w-4 h-4" />Novo Plano de Contas</Button>
        <Button variant="outline" className="gap-2" onClick={handleExport}><FileText className="w-4 h-4" />Exportar</Button>
      </div>
      <FilterSection fields={[
        { type: "text" as const, label: "Categoria", placeholder: "Buscar categoria...", value: searchCat, onChange: setSearchCat, width: "flex-1 min-w-[200px]" },
        { type: "text" as const, label: "Subcategoria", placeholder: "Buscar subcategoria...", value: searchSub, onChange: setSearchSub, width: "min-w-[180px]" }
      ]} resultsCount={filtered.length} />
      <div className="rounded border border-border overflow-hidden"><Table><TableHeader><TableRow className="bg-table-header">
        <TableHead className="text-center font-semibold">ID do Plano</TableHead><TableHead className="text-center font-semibold">Categoria</TableHead><TableHead className="text-center font-semibold">Subcategoria</TableHead><TableHead className="text-center font-semibold">Contábil</TableHead><TableHead className="text-center font-semibold">Ações</TableHead>
      </TableRow></TableHeader><TableBody>
        {filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhum plano encontrado.</TableCell></TableRow> :
          filtered.map(p => <TableRow key={p.id} className="hover:bg-table-hover transition-colors"><TableCell className="text-center font-medium">{p.idPlano}</TableCell><TableCell className="text-center">{p.categoria}</TableCell><TableCell className="text-center">{p.subcategoria}</TableCell><TableCell className="text-center">{p.contabil}</TableCell><TableCell className="text-center"><TableActions onView={() => setViewItem(p)} onEdit={() => toast({ title: "Editar", description: `Editando "${p.idPlano}"...` })} onDelete={() => setDeleteId(p.id)} /></TableCell></TableRow>)}
      </TableBody></Table></div>
    </div>
    <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}><DialogContent><DialogHeader><DialogTitle>{viewItem?.idPlano}</DialogTitle></DialogHeader>{viewItem && <div className="space-y-2 py-2"><InfoRow label="Categoria" value={viewItem.categoria} /><InfoRow label="Subcategoria" value={viewItem.subcategoria} /><InfoRow label="Contábil" value={viewItem.contabil} /></div>}</DialogContent></Dialog>
    <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.idPlano}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
};
function InfoRow({ label, value }: { label: string; value: string }) { return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>; }
export default PlanoContas;
