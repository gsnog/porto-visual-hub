import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";
import { Plus } from "lucide-react";
import { TableActions } from "@/components/TableActions";
import { StatusBadge } from "@/components/StatusBadge";
import { ExportButton } from "@/components/ExportButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const mockOrdens = [
  { id: 1, tipo: "Serviços Gerais", data: "19/12/2024", descricao: "Limpeza geral", responsavel: "João Silva", status: "Concluído" },
  { id: 2, tipo: "Patrimônio", data: "18/12/2024", descricao: "Manutenção de ar-condicionado", responsavel: "Maria Santos", status: "Em Andamento" },
  { id: 3, tipo: "Suporte", data: "17/12/2024", descricao: "Instalação de software", responsavel: "Carlos Pereira", status: "Pendente" },
]

type Ordem = typeof mockOrdens[0];

export default function OrdemServico() {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockOrdens);
  const [filterDescricao, setFilterDescricao] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterDataInicio, setFilterDataInicio] = useState("");
  const [filterDataFim, setFilterDataFim] = useState("");
  const [viewItem, setViewItem] = useState<Ordem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Ordem | null>(null);
  const [editData, setEditData] = useState({ tipo: "", descricao: "", responsavel: "" });

  const filtered = useMemo(() => {
    return items.filter(ordem => {
      const matchDescricao = ordem.descricao.toLowerCase().includes(filterDescricao.toLowerCase())
      const matchTipo = filterTipo && filterTipo !== "todos" ? ordem.tipo.toLowerCase().includes(filterTipo.replace("_", " ")) : true
      const matchDataInicio = filterDataInicio ? ordem.data.includes(filterDataInicio.split("-").reverse().join("/")) : true
      const matchDataFim = filterDataFim ? ordem.data.includes(filterDataFim.split("-").reverse().join("/")) : true
      return matchDescricao && matchTipo && matchDataInicio && matchDataFim
    })
  }, [items, filterDescricao, filterTipo, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(o => ({ ID: o.id, Tipo: o.tipo, Data: o.data, Descrição: o.descricao, Responsável: o.responsavel, Status: o.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Ordem de serviço excluída." }); } };
  const openEdit = (o: Ordem) => { setEditItem(o); setEditData({ tipo: o.tipo, descricao: o.descricao, responsavel: o.responsavel }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Ordem atualizada." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2" onClick={() => navigate("/estoque/ordem-servico/nova")}><Plus className="w-4 h-4" />Nova Ordem</Button>
          <ExportButton getData={getExportData} fileName="ordem-servico" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Descrição", placeholder: "Buscar descrição...", value: filterDescricao, onChange: setFilterDescricao, width: "flex-1 min-w-[200px]" },
            { type: "select", label: "Tipo de Ordem", placeholder: "Selecione...", value: filterTipo, onChange: setFilterTipo, options: [{ value: "todos", label: "Todos" }, { value: "serviços gerais", label: "Serviços Gerais" }, { value: "patrimônio", label: "Patrimônio" }, { value: "suporte", label: "Suporte" }], width: "min-w-[180px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <Table>
          <TableHeader><TableRow><TableHead className="text-center">ID</TableHead><TableHead className="text-center">Tipo</TableHead><TableHead className="text-center">Data</TableHead><TableHead className="text-center">Descrição</TableHead><TableHead className="text-center">Responsável</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">Ações</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.length === 0 ? (<TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma ordem encontrada.</TableCell></TableRow>) : (
              filtered.map((ordem) => (
                <TableRow key={ordem.id}>
                  <TableCell className="text-center">{ordem.id}</TableCell><TableCell className="text-center">{ordem.tipo}</TableCell><TableCell className="text-center">{ordem.data}</TableCell><TableCell className="text-center">{ordem.descricao}</TableCell><TableCell className="text-center">{ordem.responsavel}</TableCell>
                  <TableCell className="text-center"><StatusBadge status={ordem.status} /></TableCell>
                  <TableCell className="text-center"><TableActions onView={() => setViewItem(ordem)} onEdit={() => openEdit(ordem)} onDelete={() => setDeleteId(ordem.id)} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Ordem de Serviço</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ ID: viewItem.id, Tipo: viewItem.tipo, Data: viewItem.data, Descrição: viewItem.descricao, Responsável: viewItem.responsavel, Status: viewItem.status }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Ordem de Serviço</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Tipo</Label><Input value={editData.tipo} onChange={e => setEditData({ ...editData, tipo: e.target.value })} /></div>
            <div><Label>Descrição</Label><Input value={editData.descricao} onChange={e => setEditData({ ...editData, descricao: e.target.value })} /></div>
            <div><Label>Responsável</Label><Input value={editData.responsavel} onChange={e => setEditData({ ...editData, responsavel: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir ordem?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a ordem "{deleteItemData?.descricao}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
