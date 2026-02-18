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

const initialOperacoes = [
  { id: 1, dataEntrada: "02/06/2025", barco: "Marlin Azul", custoAproximado: "R$ 15.000,00", valorPago: "R$ 15.000,00", previsaoEntrega: "15/06/2025", dataEntrega: "15/06/2025" },
  { id: 2, dataEntrada: "01/06/2025", barco: "Veleiro Norte", custoAproximado: "R$ 8.500,00", valorPago: "R$ 4.250,00", previsaoEntrega: "20/06/2025", dataEntrega: "-" },
  { id: 3, dataEntrada: "28/05/2025", barco: "Lancha Sul", custoAproximado: "R$ 22.000,00", valorPago: "R$ 0,00", previsaoEntrega: "10/07/2025", dataEntrega: "-" },
]

type Op = typeof initialOperacoes[0];

const Operacao = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialOperacoes);
  const [filterNome, setFilterNome] = useState("");
  const [filterData, setFilterData] = useState("");
  const [viewItem, setViewItem] = useState<Op | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Op | null>(null);
  const [editData, setEditData] = useState({ barco: "", custoAproximado: "", valorPago: "" });

  const filtered = useMemo(() => items.filter(op => {
    const matchNome = op.barco.toLowerCase().includes(filterNome.toLowerCase());
    const matchData = filterData ? op.dataEntrada.includes(filterData.split("-").reverse().join("/")) : true;
    return matchNome && matchData;
  }), [items, filterNome, filterData]);

  const getExportData = () => filtered.map(o => ({ "Data Entrada": o.dataEntrada, Barco: o.barco, "Custo Aproximado": o.custoAproximado, "Valor Pago": o.valorPago, "Previsão Entrega": o.previsaoEntrega, "Data Entrega": o.dataEntrega }));
  const openEdit = (o: Op) => { setEditItem(o); setEditData({ barco: o.barco, custoAproximado: o.custoAproximado, valorPago: o.valorPago }) };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Operação atualizada." }) } };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Operação excluída." }) } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2" onClick={() => navigate("/operacional/operacao/nova")}><Plus className="w-4 h-4" />Adicionar</Button>
          <ExportButton getData={getExportData} fileName="operacoes" />
        </div>

        <FilterSection fields={[
          { type: "text", label: "Nome do Barco", placeholder: "Buscar barco...", value: filterNome, onChange: setFilterNome, width: "flex-1 min-w-[200px]" },
          { type: "date", label: "Data de Entrada", value: filterData, onChange: setFilterData, width: "min-w-[160px]" }
        ]} resultsCount={filtered.length} />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="text-center">Data de Entrada</TableHead><TableHead className="text-center">Barco</TableHead><TableHead className="text-center">Custo Aproximado</TableHead><TableHead className="text-center">Valor Pago</TableHead><TableHead className="text-center">Previsão de Entrega</TableHead><TableHead className="text-center">Data de Entrega</TableHead><TableHead className="text-center">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma operação encontrada.</TableCell></TableRow>) : (
                filtered.map((op) => (
                  <TableRow key={op.id}>
                    <TableCell className="text-center">{op.dataEntrada}</TableCell><TableCell className="text-center">{op.barco}</TableCell><TableCell className="text-center">{op.custoAproximado}</TableCell><TableCell className="text-center">{op.valorPago}</TableCell><TableCell className="text-center">{op.previsaoEntrega}</TableCell><TableCell className="text-center">{op.dataEntrega}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(op)} onEdit={() => openEdit(op)} onDelete={() => setDeleteId(op.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Operação</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ "Data Entrada": viewItem.dataEntrada, Barco: viewItem.barco, "Custo Aproximado": viewItem.custoAproximado, "Valor Pago": viewItem.valorPago, "Previsão Entrega": viewItem.previsaoEntrega, "Data Entrega": viewItem.dataEntrega }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Operação</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Barco</Label><Input value={editData.barco} onChange={e => setEditData({ ...editData, barco: e.target.value })} /></div>
            <div><Label>Custo Aproximado</Label><Input value={editData.custoAproximado} onChange={e => setEditData({ ...editData, custoAproximado: e.target.value })} /></div>
            <div><Label>Valor Pago</Label><Input value={editData.valorPago} onChange={e => setEditData({ ...editData, valorPago: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir operação?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a operação do barco "{deleteItemData?.barco}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Operacao;
