import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, FileText } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { cargosMock as cargosOriginal, type Cargo } from "@/data/pessoas-mock";
import { exportToExcel } from "@/lib/exportToExcel";
import { toast } from "@/hooks/use-toast";

export default function Cargos() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Cargo[]>(cargosOriginal);
  const [searchTerm, setSearchTerm] = useState("");
  const [nivelFilter, setNivelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<Cargo | null>(null);

  const niveis = [...new Set(items.map(c => c.nivel))];

  const filtered = items.filter(c => {
    const matchesSearch = c.nome.toLowerCase().includes(searchTerm.toLowerCase()) || c.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNivel = nivelFilter === "all" || c.nivel === nivelFilter;
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesNivel && matchesStatus;
  });

  const handleExport = () => {
    exportToExcel(
      filtered.map(c => ({ Cargo: c.nome, Descrição: c.descricao, Nível: c.nivel, Status: c.status })),
      "cadastro-cargos"
    );
  };

  const handleDelete = () => {
    if (deleteId) {
      setItems(prev => prev.filter(i => i.id !== deleteId));
      setDeleteId(null);
      toast({ title: "Cargo removido", description: "Registro excluído com sucesso." });
    }
  };

  const deleteItem = items.find(c => c.id === deleteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/cadastro/pessoas/cargos/novo")} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cargo
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <FileText className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="filter-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar cargo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={nivelFilter} onValueChange={setNivelFilter}>
            <SelectTrigger><SelectValue placeholder="Nível" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              {niveis.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[hsl(var(--sidebar-bg))] hover:bg-[hsl(var(--sidebar-bg))]">
              <TableHead className="text-white font-semibold">Cargo</TableHead>
              <TableHead className="text-white font-semibold">Descrição</TableHead>
              <TableHead className="text-white font-semibold">Nível</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(cargo => (
              <TableRow key={cargo.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{cargo.nome}</TableCell>
                <TableCell>{cargo.descricao}</TableCell>
                <TableCell>{cargo.nivel}</TableCell>
                <TableCell><StatusBadge status={cargo.status} /></TableCell>
                <TableCell className="text-center">
                  <TableActions
                    onView={() => setViewItem(cargo)}
                    onEdit={() => toast({ title: "Editar cargo", description: `Editando "${cargo.nome}"...` })}
                    onDelete={() => setDeleteId(cargo.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">Exibindo {filtered.length} de {items.length} cargos</div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{viewItem?.nome}</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-3 py-2">
              <InfoRow label="Descrição" value={viewItem.descricao} />
              <InfoRow label="Nível" value={viewItem.nivel} />
              <InfoRow label="Status" value={viewItem.status} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>Deseja realmente excluir <strong>{deleteItem?.nome}</strong>?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
