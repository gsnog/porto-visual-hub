import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ExportButton } from "@/components/ExportButton";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

interface Unidade { id: number; unidade?: string; }

const fetchUnidades = async (): Promise<Unidade[]> => { const res = await api.get("/api/estoque/inventario/"); return res.data; };
const updateUnidade = async (id: number, data: Partial<Unidade>): Promise<Unidade> => { const res = await api.put(`/api/estoque/inventario/${id}/`, data); return res.data; };
const deleteUnidade = async (id: number): Promise<void> => { await api.delete(`/api/estoque/inventario/${id}/`); };

const Unidades = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchUnidade, setSearchUnidade] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<Unidade | null>(null);
  const [editItem, setEditItem] = useState<Unidade | null>(null);
  const [editNome, setEditNome] = useState("");

  const { data: items = [], isLoading } = useQuery({ queryKey: ["unidades_estoque"], queryFn: fetchUnidades });

  const updateMut = useMutation({
    mutationFn: (d: { id: number; payload: Partial<Unidade> }) => updateUnidade(d.id, d.payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["unidades_estoque"] }); setEditItem(null); toast({ title: "Salvo", description: "Unidade atualizada." }); },
    onError: () => toast({ title: "Erro", description: "Falha ao atualizar.", variant: "destructive" }),
  });

  const deleteMut = useMutation({
    mutationFn: deleteUnidade,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["unidades_estoque"] }); setDeleteId(null); toast({ title: "Removido", description: "Unidade excluída." }); },
    onError: () => toast({ title: "Erro", description: "Falha ao excluir.", variant: "destructive" }),
  });

  const filtered = items.filter(u => (u.unidade || "").toLowerCase().includes(searchUnidade.toLowerCase()));
  const getExportData = () => filtered.map(u => ({ Unidade: u.unidade }));
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/cadastro/estoque/unidades/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Unidade</Button>
          <ExportButton getData={getExportData} fileName="unidades-estoque" />
        </div>
        <FilterSection fields={[{ type: "text" as const, label: "Unidade", placeholder: "Buscar unidade...", value: searchUnidade, onChange: setSearchUnidade, width: "flex-1 min-w-[200px]" }]} resultsCount={filtered.length} />
        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-table-header"><TableHead className="text-center font-semibold">Unidade</TableHead><TableHead className="text-center font-semibold">Ações</TableHead></TableRow></TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">Carregando...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">Nenhuma unidade encontrada.</TableCell></TableRow>
              ) : filtered.map((u) => (
                <TableRow key={u.id} className="hover:bg-table-hover transition-colors">
                  <TableCell className="text-center font-medium">{u.unidade || "—"}</TableCell>
                  <TableCell className="text-center"><TableActions onView={() => setViewItem(u)} onEdit={() => { setEditItem(u); setEditNome(u.unidade || ""); }} onDelete={() => setDeleteId(u.id)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>{viewItem?.unidade}</DialogTitle></DialogHeader>
          {viewItem && <div className="py-2"><div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Unidade</span><span className="text-sm font-medium">{viewItem.unidade}</span></div></div>}
        </DialogContent>
      </Dialog>
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Unidade</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4"><div className="space-y-2"><Label>Nome</Label><Input value={editNome} onChange={e => setEditNome(e.target.value)} /></div></div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
            <Button onClick={() => { if (editItem) updateMut.mutate({ id: editItem.id, payload: { unidade: editNome } }); }}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.unidade}</strong>?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => { if (deleteId) deleteMut.mutate(deleteId); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Unidades;
