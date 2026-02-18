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

const mockApresentacoes = [
  { id: 1, nome: "Caixa" },
  { id: 2, nome: "Unidade" },
  { id: 3, nome: "Pacote" },
];

const FormasApresentacao = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockApresentacoes);
  const [searchApresentacao, setSearchApresentacao] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<typeof mockApresentacoes[0] | null>(null);
  const [editItem, setEditItem] = useState<typeof mockApresentacoes[0] | null>(null);
  const [editNome, setEditNome] = useState("");

  const filterFields = [{ type: "text" as const, label: "Apresentação", placeholder: "Buscar apresentação...", value: searchApresentacao, onChange: setSearchApresentacao, width: "flex-1 min-w-[200px]" }];
  const filtered = items.filter(ap => ap.nome.toLowerCase().includes(searchApresentacao.toLowerCase()));

  const getExportData = () => filtered.map(a => ({ Apresentação: a.nome }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Registro excluído." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/cadastro/estoque/formas-apresentacao/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Apresentação</Button>
          <ExportButton getData={getExportData} fileName="formas-apresentacao" />
        </div>
        <FilterSection fields={filterFields} resultsCount={filtered.length} />
        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-table-header"><TableHead className="text-center font-semibold">Apresentação</TableHead><TableHead className="text-center font-semibold">Ações</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">Nenhuma forma de apresentação encontrada.</TableCell></TableRow>) : (
                filtered.map((ap) => (
                  <TableRow key={ap.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{ap.nome}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(ap)} onEdit={() => { setEditItem(ap); setEditNome(ap.nome); }} onDelete={() => setDeleteId(ap.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>{viewItem?.nome}</DialogTitle></DialogHeader>{viewItem && <div className="py-2"><div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Nome</span><span className="text-sm font-medium">{viewItem.nome}</span></div></div>}</DialogContent>
      </Dialog>
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Apresentação</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4"><div className="space-y-2"><Label>Nome</Label><Input value={editNome} onChange={e => setEditNome(e.target.value)} /></div></div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
            <Button onClick={() => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, nome: editNome } : i)); setEditItem(null); toast({ title: "Salvo", description: "Apresentação atualizada." }); } }}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.nome}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FormasApresentacao;
