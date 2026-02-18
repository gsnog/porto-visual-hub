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
import { setoresMock as setoresOriginal, type Setor } from "@/data/pessoas-mock";
import { exportToExcel } from "@/lib/exportToExcel";
import { toast } from "@/hooks/use-toast";

export default function SetoresAreas() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Setor[]>(setoresOriginal);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<Setor | null>(null);

  const filteredSetores = items.filter((setor) => {
    const matchesSearch = setor.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || setor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    exportToExcel(
      filteredSetores.map(s => ({ Nome: s.nome, "Área Pai": s.areaPaiNome || "—", Responsável: s.responsavelNome || "—", "Qtde Pessoas": s.qtdePessoas, Status: s.status })),
      "cadastro-setores-areas"
    );
  };

  const handleDelete = () => {
    if (deleteId) {
      setItems(prev => prev.filter(i => i.id !== deleteId));
      setDeleteId(null);
      toast({ title: "Setor removido", description: "Registro excluído com sucesso." });
    }
  };

  const deleteItem = items.find(s => s.id === deleteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/cadastro/pessoas/setores/novo")} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Setor
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <FileText className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="filter-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome do setor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
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
              <TableHead className="text-white font-semibold">Nome</TableHead>
              <TableHead className="text-white font-semibold">Área Pai</TableHead>
              <TableHead className="text-white font-semibold">Responsável</TableHead>
              <TableHead className="text-white font-semibold text-center">Qtde Pessoas</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSetores.map((setor) => (
              <TableRow key={setor.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{setor.nome}</TableCell>
                <TableCell>{setor.areaPaiNome || "-"}</TableCell>
                <TableCell>{setor.responsavelNome || "-"}</TableCell>
                <TableCell className="text-center">{setor.qtdePessoas}</TableCell>
                <TableCell><StatusBadge status={setor.status} /></TableCell>
                <TableCell className="text-center">
                  <TableActions
                    onView={() => setViewItem(setor)}
                    onEdit={() => toast({ title: "Editar setor", description: `Editando "${setor.nome}"...` })}
                    onDelete={() => setDeleteId(setor.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">Exibindo {filteredSetores.length} de {items.length} setores</div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{viewItem?.nome}</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-3 py-2">
              <InfoRow label="Área Pai" value={viewItem.areaPaiNome || "—"} />
              <InfoRow label="Responsável" value={viewItem.responsavelNome || "—"} />
              <InfoRow label="Qtde Pessoas" value={String(viewItem.qtdePessoas)} />
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
