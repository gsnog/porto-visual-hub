import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";
import { ExportButton } from "@/components/ExportButton";
import { Plus } from "lucide-react";
import { TableActions } from "@/components/TableActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const initialSetores = [
  { id: 1, nome: "Motor" },
  { id: 2, nome: "Pintura" },
  { id: 3, nome: "Elétrica" },
  { id: 4, nome: "Fibra" },
  { id: 5, nome: "Acabamento" },
]

type SetorType = typeof initialSetores[0];

const Setor = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialSetores);
  const [filterNome, setFilterNome] = useState("");
  const [viewItem, setViewItem] = useState<SetorType | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<SetorType | null>(null);
  const [editData, setEditData] = useState({ nome: "" });

  const filtered = useMemo(() => items.filter(s => s.nome.toLowerCase().includes(filterNome.toLowerCase())), [items, filterNome]);

  const getExportData = () => filtered.map(s => ({ Setor: s.nome }));
  const openEdit = (s: SetorType) => { setEditItem(s); setEditData({ nome: s.nome }) };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Setor atualizado." }) } };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Setor excluído." }) } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2" onClick={() => navigate("/operacional/setor/novo")}><Plus className="w-4 h-4" />Novo Setor</Button>
          <ExportButton getData={getExportData} fileName="setores-operacional" />
        </div>

        <FilterSection fields={[{ type: "text", label: "Setor", placeholder: "Buscar setor...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" }]} resultsCount={filtered.length} />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-center">Setor</TableHead><TableHead className="text-center">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">Nenhum setor encontrado.</TableCell></TableRow>) : (
                filtered.map((setor) => (
                  <TableRow key={setor.id}>
                    <TableCell className="text-center">{setor.nome}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(setor)} onEdit={() => openEdit(setor)} onDelete={() => setDeleteId(setor.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes do Setor</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2"><div className="flex justify-between py-1 border-b border-border"><span className="text-sm text-muted-foreground">Setor</span><span className="text-sm font-medium">{viewItem.nome}</span></div></div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Setor</DialogTitle></DialogHeader>
          <div className="space-y-3"><div><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData({ nome: e.target.value })} /></div></div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir setor?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.nome}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Setor;
