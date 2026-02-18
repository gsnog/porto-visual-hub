import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Plus, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ExportButton } from "@/components/ExportButton";
import { toast } from "@/hooks/use-toast";

const mockContas = [
  { id: 1, codigoBanco: "001", banco: "Banco do Brasil", agencia: "1234-5", numeroConta: "12345-6", tipo: "Corrente", saldo: "R$ 50.000,00" },
  { id: 2, codigoBanco: "341", banco: "Itaú", agencia: "0987-6", numeroConta: "98765-4", tipo: "Poupança", saldo: "R$ 25.000,00" },
];
type Conta = typeof mockContas[0];

const ContaBancaria = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockContas);
  const [searchBanco, setSearchBanco] = useState("");
  const [searchConta, setSearchConta] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<Conta | null>(null);
  const [editItem, setEditItem] = useState<Conta | null>(null);
  const [editData, setEditData] = useState({ codigoBanco: "", banco: "", agencia: "", numeroConta: "", tipo: "", saldo: "" });

  const filterFields = [
    { type: "text" as const, label: "Nome do Banco", placeholder: "Buscar banco...", value: searchBanco, onChange: setSearchBanco, width: "flex-1 min-w-[200px]" },
    { type: "text" as const, label: "Número da Conta", placeholder: "Buscar por conta...", value: searchConta, onChange: setSearchConta, width: "min-w-[180px]" }
  ];
  const filtered = items.filter(c => c.banco.toLowerCase().includes(searchBanco.toLowerCase()) && c.numeroConta.includes(searchConta));
  const getExportData = () => filtered.map(c => ({ "Código Banco": c.codigoBanco, Banco: c.banco, Agência: c.agencia, Conta: c.numeroConta, Tipo: c.tipo, Saldo: c.saldo }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Conta excluída." }); } };
  const deleteItem = items.find(i => i.id === deleteId);
  const openEdit = (c: Conta) => { setEditItem(c); setEditData({ codigoBanco: c.codigoBanco, banco: c.banco, agencia: c.agencia, numeroConta: c.numeroConta, tipo: c.tipo, saldo: c.saldo }); };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/cadastro/financeiro/conta-bancaria/nova")} className="gap-2"><Plus className="w-4 h-4" />Nova Conta</Button>
          <ExportButton getData={getExportData} fileName="contas-bancarias" />
          <Button onClick={() => navigate("/cadastro/financeiro/conciliacao-bancaria")} variant="outline" className="gap-2 border-border">Conciliação Bancária</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" className="gap-2 border-border">Transferências<ChevronDown className="w-4 h-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border border-border z-50">
              <DropdownMenuItem onClick={() => navigate("/cadastro/financeiro/transferencias")}>Ver Transferências</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/cadastro/financeiro/transferencias/nova")}>Nova Transferência</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <FilterSection fields={filterFields} resultsCount={filtered.length} />
        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-table-header">
              <TableHead className="text-center font-semibold">Código do Banco</TableHead>
              <TableHead className="text-center font-semibold">Banco</TableHead>
              <TableHead className="text-center font-semibold">Agência</TableHead>
              <TableHead className="text-center font-semibold">Número da Conta</TableHead>
              <TableHead className="text-center font-semibold">Tipo</TableHead>
              <TableHead className="text-center font-semibold">Saldo</TableHead>
              <TableHead className="text-center font-semibold">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhuma conta encontrada.</TableCell></TableRow>) : (
                filtered.map((c) => (
                  <TableRow key={c.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center">{c.codigoBanco}</TableCell>
                    <TableCell className="text-center font-medium">{c.banco}</TableCell>
                    <TableCell className="text-center">{c.agencia}</TableCell>
                    <TableCell className="text-center">{c.numeroConta}</TableCell>
                    <TableCell className="text-center">{c.tipo}</TableCell>
                    <TableCell className="text-center font-semibold">{c.saldo}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(c)} onEdit={() => openEdit(c)} onDelete={() => setDeleteId(c.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>{viewItem?.banco}</DialogTitle></DialogHeader>{viewItem && <div className="space-y-2 py-2"><InfoRow label="Código" value={viewItem.codigoBanco} /><InfoRow label="Agência" value={viewItem.agencia} /><InfoRow label="Conta" value={viewItem.numeroConta} /><InfoRow label="Tipo" value={viewItem.tipo} /><InfoRow label="Saldo" value={viewItem.saldo} /></div>}</DialogContent>
      </Dialog>
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Editar Conta Bancária</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Código do Banco</Label><Input value={editData.codigoBanco} onChange={e => setEditData(p => ({ ...p, codigoBanco: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Banco</Label><Input value={editData.banco} onChange={e => setEditData(p => ({ ...p, banco: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Agência</Label><Input value={editData.agencia} onChange={e => setEditData(p => ({ ...p, agencia: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Número da Conta</Label><Input value={editData.numeroConta} onChange={e => setEditData(p => ({ ...p, numeroConta: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Tipo</Label><Input value={editData.tipo} onChange={e => setEditData(p => ({ ...p, tipo: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Saldo</Label><Input value={editData.saldo} onChange={e => setEditData(p => ({ ...p, saldo: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>Cancelar</Button>
            <Button onClick={() => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Conta atualizada." }); } }}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.banco}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>;
}

export default ContaBancaria;
