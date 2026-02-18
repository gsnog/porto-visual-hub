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

const mockCentrosReceita = [
  { id: 1, nome: "Centro de Receita A", diretoria: "Diretoria Comercial", gerencia: "Gerência de Vendas", departamento: "Vendas" },
  { id: 2, nome: "Centro de Receita B", diretoria: "Diretoria de Serviços", gerencia: "Gerência de Projetos", departamento: "Consultoria" },
];

const CentroReceita = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockCentrosReceita);
  const [searchCentro, setSearchCentro] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<typeof mockCentrosReceita[0] | null>(null);

  const filterFields = [{ type: "text" as const, label: "Centro de Receita", placeholder: "Buscar centro de receita...", value: searchCentro, onChange: setSearchCentro, width: "flex-1 min-w-[200px]" }];
  const filtered = items.filter(c => c.nome.toLowerCase().includes(searchCentro.toLowerCase()));
  const handleExport = () => { exportToExcel(filtered.map(c => ({ "Centro de Receita": c.nome, Diretoria: c.diretoria, Gerência: c.gerencia, Departamento: c.departamento })), "centros-receita"); };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Centro de receita excluído." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/cadastro/financeiro/centro-receita/novo")} className="gap-2"><Plus className="w-4 h-4" />Novo Centro de Receita</Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}><FileText className="w-4 h-4" />Exportar</Button>
        </div>
        <FilterSection fields={filterFields} resultsCount={filtered.length} />
        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-table-header">
              <TableHead className="text-center font-semibold">Centro de Receita</TableHead>
              <TableHead className="text-center font-semibold">Diretoria</TableHead>
              <TableHead className="text-center font-semibold">Gerência</TableHead>
              <TableHead className="text-center font-semibold">Departamento</TableHead>
              <TableHead className="text-center font-semibold">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhum centro de receita encontrado.</TableCell></TableRow>) : (
                filtered.map((c) => (
                  <TableRow key={c.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{c.nome}</TableCell>
                    <TableCell className="text-center">{c.diretoria}</TableCell>
                    <TableCell className="text-center">{c.gerencia}</TableCell>
                    <TableCell className="text-center">{c.departamento}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(c)} onEdit={() => toast({ title: "Editar", description: `Editando "${c.nome}"...` })} onDelete={() => setDeleteId(c.id)} /></TableCell>
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
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.nome}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>;
}

export default CentroReceita;
