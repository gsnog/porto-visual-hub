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

const initialServicos = [
  { id: 1, nome: "Pintura", descricao: "Pintura completa de casco", custo: "R$ 5.000,00" },
  { id: 2, nome: "Manutenção Motor", descricao: "Revisão completa do motor", custo: "R$ 3.500,00" },
  { id: 3, nome: "Elétrica", descricao: "Instalação de sistema elétrico", custo: "R$ 2.000,00" },
  { id: 4, nome: "Fibra", descricao: "Reparo em fibra de vidro", custo: "R$ 1.500,00" },
]

type Servico = typeof initialServicos[0];

const Servicos = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialServicos);
  const [filterNome, setFilterNome] = useState("");
  const [viewItem, setViewItem] = useState<Servico | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Servico | null>(null);
  const [editData, setEditData] = useState({ nome: "", descricao: "", custo: "" });

  const filtered = useMemo(() => items.filter(s => s.nome.toLowerCase().includes(filterNome.toLowerCase())), [items, filterNome]);

  const getExportData = () => filtered.map(s => ({ Nome: s.nome, Descrição: s.descricao, Custo: s.custo }));
  const openEdit = (s: Servico) => { setEditItem(s); setEditData({ nome: s.nome, descricao: s.descricao, custo: s.custo }) };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Serviço atualizado." }) } };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Serviço excluído." }) } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2" onClick={() => navigate("/operacional/servicos/novo")}><Plus className="w-4 h-4" />Novo Serviço</Button>
          <ExportButton getData={getExportData} fileName="servicos" />
        </div>

        <FilterSection fields={[{ type: "text", label: "Nome do Serviço", placeholder: "Buscar serviço...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" }]} resultsCount={filtered.length} />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-center">Nome do Serviço</TableHead><TableHead className="text-center">Descrição</TableHead><TableHead className="text-center">Custo</TableHead><TableHead className="text-center">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Nenhum serviço encontrado.</TableCell></TableRow>) : (
                filtered.map((servico) => (
                  <TableRow key={servico.id}>
                    <TableCell className="text-center">{servico.nome}</TableCell><TableCell className="text-center">{servico.descricao}</TableCell><TableCell className="text-center">{servico.custo}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(servico)} onEdit={() => openEdit(servico)} onDelete={() => setDeleteId(servico.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes do Serviço</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Nome: viewItem.nome, Descrição: viewItem.descricao, Custo: viewItem.custo }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Serviço</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData({ ...editData, nome: e.target.value })} /></div>
            <div><Label>Descrição</Label><Input value={editData.descricao} onChange={e => setEditData({ ...editData, descricao: e.target.value })} /></div>
            <div><Label>Custo</Label><Input value={editData.custo} onChange={e => setEditData({ ...editData, custo: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir serviço?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.nome}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Servicos;
