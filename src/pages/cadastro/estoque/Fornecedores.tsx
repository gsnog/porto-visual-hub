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

const mockFornecedores = [
  { id: 1, fornecedor: "Fornecedor ABC", cnpj: "12.345.678/0001-90", razaoSocial: "ABC Ltda", vendedor: "João", email: "contato@abc.com", telefone: "(11) 1234-5678" },
  { id: 2, fornecedor: "Fornecedor XYZ", cnpj: "98.765.432/0001-10", razaoSocial: "XYZ S.A.", vendedor: "Maria", email: "contato@xyz.com", telefone: "(21) 9876-5432" },
];

const FornecedoresEstoque = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockFornecedores);
  const [searchNome, setSearchNome] = useState("");
  const [searchCnpj, setSearchCnpj] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<typeof mockFornecedores[0] | null>(null);

  const filterFields = [
    { type: "text" as const, label: "Nome do Fornecedor", placeholder: "Buscar fornecedor...", value: searchNome, onChange: setSearchNome, width: "flex-1 min-w-[200px]" },
    { type: "text" as const, label: "CNPJ", placeholder: "Buscar por CNPJ...", value: searchCnpj, onChange: setSearchCnpj, width: "min-w-[180px]" }
  ];
  const filtered = items.filter(f => f.fornecedor.toLowerCase().includes(searchNome.toLowerCase()) && f.cnpj.includes(searchCnpj));
  const handleExport = () => { exportToExcel(filtered.map(f => ({ Fornecedor: f.fornecedor, CNPJ: f.cnpj, "Razão Social": f.razaoSocial, Vendedor: f.vendedor, Email: f.email, Telefone: f.telefone })), "fornecedores-estoque"); };
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Fornecedor excluído." }); } };
  const deleteItem = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/cadastro/estoque/fornecedores/novo")} className="gap-2"><Plus className="w-4 h-4" />Novo Fornecedor</Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}><FileText className="w-4 h-4" />Exportar</Button>
        </div>
        <FilterSection fields={filterFields} resultsCount={filtered.length} />
        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-table-header">
              <TableHead className="text-center font-semibold">Fornecedor</TableHead>
              <TableHead className="text-center font-semibold">CNPJ/CPF</TableHead>
              <TableHead className="text-center font-semibold">Razão Social</TableHead>
              <TableHead className="text-center font-semibold">Vendedor</TableHead>
              <TableHead className="text-center font-semibold">Email</TableHead>
              <TableHead className="text-center font-semibold">Telefone</TableHead>
              <TableHead className="text-center font-semibold">Ações</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.length === 0 ? (<TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Nenhum fornecedor encontrado.</TableCell></TableRow>) : (
                filtered.map((f) => (
                  <TableRow key={f.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{f.fornecedor}</TableCell>
                    <TableCell className="text-center">{f.cnpj}</TableCell>
                    <TableCell className="text-center">{f.razaoSocial}</TableCell>
                    <TableCell className="text-center">{f.vendedor}</TableCell>
                    <TableCell className="text-center">{f.email}</TableCell>
                    <TableCell className="text-center">{f.telefone}</TableCell>
                    <TableCell className="text-center"><TableActions onView={() => setViewItem(f)} onEdit={() => toast({ title: "Editar", description: `Editando "${f.fornecedor}"...` })} onDelete={() => setDeleteId(f.id)} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>{viewItem?.fornecedor}</DialogTitle></DialogHeader>{viewItem && <div className="space-y-2 py-2"><InfoRow label="CNPJ" value={viewItem.cnpj} /><InfoRow label="Razão Social" value={viewItem.razaoSocial} /><InfoRow label="Vendedor" value={viewItem.vendedor} /><InfoRow label="Email" value={viewItem.email} /><InfoRow label="Telefone" value={viewItem.telefone} /></div>}</DialogContent>
      </Dialog>
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar exclusão</AlertDialogTitle><AlertDialogDescription>Deseja excluir <strong>{deleteItem?.fornecedor}</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between items-center py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-foreground">{value}</span></div>;
}

export default FornecedoresEstoque;
