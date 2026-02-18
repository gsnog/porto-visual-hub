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

const mockCentrosCusto = [
  { id: 1, nome: "Centro de Custo A", diretoria: "Diretoria Financeira", gerencia: "Gerência de Custos", departamento: "Contabilidade" },
  { id: 2, nome: "Centro de Custo B", diretoria: "Diretoria Operacional", gerencia: "Gerência de Produção", departamento: "Produção" },
];
type CC = typeof mockCentrosCusto[0];

const CentroCusto = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockCentrosCusto);
  const [searchCentro, setSearchCentro] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<CC | null>(null);
  const [editItem, setEditItem] = useState<CC | null>(null);
  const [editData, setEditData] = useState({ nome: "", diretoria: "", gerencia: "", departamento: "" });

  const filterFields = [{ type: "text" as const, label: "Centro de Custo", placeholder: "Buscar centro de custo...", value: searchCentro, onChange: setSearchCentro, width: "flex-1 min-w-[200px]" }];
  const filtered = items.filter(c => c.nome.toLowerCase().includes(searchCentro.toLowerCase()));
  const handleExport = () => { exportToExcel(filtered.map(c => ({ "Centro de Custo": c.nome, Diretoria: c.diretoria, Gerência: c.gerencia, Departamento: c.departamento })), "centros-custo"); };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Centro de custo excluído." }); } };
  const deleteItem = items.find(i => i.id === deleteId);
  const openEdit = (c: CC) => { setEditItem(c); setEditData({ nome: c.nome, diretoria: c.diretoria, gerencia: c.gerencia, departamento: c.departamento }); };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/cadastro/financeiro/centro-custo/novo")} className="gap-2"><Plus className="w-4 h-4" />Novo Centro de Custo</Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}><FileText className="w-4 h-4" />Exportar</Button>
        </div>
        <FilterSection fields={filterFields} resultsCount={filtered.length} />
        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-table-header">
              <TableHead className="text-center font-semibold">Centro de Custo</TableHead>
              <TableHead className="text-center font-semibold">Diretoria</TableHead>
              <TableHead className="text-center font-semibold">Gerência</TableHead>
              <TableHead className="text-center font-semibold">Departamento</TableHead>
              <TableHead className="text-center font-semibold">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhum centro de custo encontrado.</TableCell></TableRow>) : (
                filtered.map((c) => (
                  <TableRow key={c.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{c.nome}</TableCell>
                    <TableCell className="text-center">{c.diretoria}</TableCell>
                    <TableCell className="text-center">{c.gerencia}</TableCell>
                    <TableCell className="text-center">{c.departamento}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(c)} onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>{viewItem?.nome}</DialogTitle></DialogHeader>{viewItem && <div className="space-y-2 py-2"><InfoRow label="Diretoria" value={viewItem.diretoria} /><InfoRow label="Gerência" value={viewItem.gerencia} /><InfoRow label="Departamento" value={viewItem.departamento} /></div>}</DialogContent>
      </Dialog>
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Centro de Custo</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData(p => ({ ...p, nome: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Diretoria</Label><Input value={editData.diretoria} onChange={e => setEditData(p => ({ ...p, diretoria: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Gerência</Label><Input value={editData.gerencia} onChange={e => setEditData(p => ({ ...p, gerencia: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Departamento</Label><Input value={editData.departamento} onChange={e => setEditData(p => ({ ...p, departamento: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
            <Button onClick={() => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Centro de custo atualizado." }); } }}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.nome}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>;
}

export default CentroCusto;
