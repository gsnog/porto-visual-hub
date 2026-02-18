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

const initialEmbarcacoes = [
  { id: 1, nome: "Marlin Azul", cliente: "João Silva", dimensao: "15m x 4m", setores: "Motor, Pintura" },
  { id: 2, nome: "Veleiro Norte", cliente: "Maria Santos", dimensao: "12m x 3.5m", setores: "Elétrica, Fibra" },
  { id: 3, nome: "Lancha Sul", cliente: "Carlos Pereira", dimensao: "8m x 2.5m", setores: "Motor" },
]

type Emb = typeof initialEmbarcacoes[0];

const Embarcacoes = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialEmbarcacoes);
  const [filterNome, setFilterNome] = useState("");
  const [filterCliente, setFilterCliente] = useState("");
  const [viewItem, setViewItem] = useState<Emb | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Emb | null>(null);
  const [editData, setEditData] = useState({ nome: "", cliente: "", dimensao: "", setores: "" });

  const filtered = useMemo(() => items.filter(emb => emb.nome.toLowerCase().includes(filterNome.toLowerCase()) && emb.cliente.toLowerCase().includes(filterCliente.toLowerCase())), [items, filterNome, filterCliente]);

  const getExportData = () => filtered.map(e => ({ Nome: e.nome, Cliente: e.cliente, Dimensão: e.dimensao, Setores: e.setores }));
  const openEdit = (e: Emb) => { setEditItem(e); setEditData({ nome: e.nome, cliente: e.cliente, dimensao: e.dimensao, setores: e.setores }) };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Embarcação atualizada." }) } };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Embarcação excluída." }) } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2" onClick={() => navigate("/operacional/embarcacoes/nova")}><Plus className="w-4 h-4" />Nova Embarcação</Button>
          <ExportButton getData={getExportData} fileName="embarcacoes" />
        </div>

        <FilterSection fields={[
          { type: "text", label: "Nome da Embarcação", placeholder: "Buscar embarcação...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
          { type: "text", label: "Cliente", placeholder: "Buscar cliente...", value: filterCliente, onChange: setFilterCliente, width: "min-w-[200px]" }
        ]} resultsCount={filtered.length} />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-center">Nome</TableHead><TableHead className="text-center">Cliente</TableHead><TableHead className="text-center">Dimensão</TableHead><TableHead className="text-center">Setores</TableHead><TableHead className="text-center">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhuma embarcação encontrada.</TableCell></TableRow>) : (
                filtered.map((emb) => (
                  <TableRow key={emb.id}>
                    <TableCell className="text-center">{emb.nome}</TableCell><TableCell className="text-center">{emb.cliente}</TableCell><TableCell className="text-center">{emb.dimensao}</TableCell><TableCell className="text-center">{emb.setores}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(emb)} onEdit={() => openEdit(emb)} onDelete={() => setDeleteId(emb.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Embarcação</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Nome: viewItem.nome, Cliente: viewItem.cliente, Dimensão: viewItem.dimensao, Setores: viewItem.setores }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Embarcação</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData({ ...editData, nome: e.target.value })} /></div>
            <div><Label>Cliente</Label><Input value={editData.cliente} onChange={e => setEditData({ ...editData, cliente: e.target.value })} /></div>
            <div><Label>Dimensão</Label><Input value={editData.dimensao} onChange={e => setEditData({ ...editData, dimensao: e.target.value })} /></div>
            <div><Label>Setores</Label><Input value={editData.setores} onChange={e => setEditData({ ...editData, setores: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir embarcação?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.nome}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Embarcacoes;
