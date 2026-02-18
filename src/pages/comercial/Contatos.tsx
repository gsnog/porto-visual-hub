import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { ExportButton } from "@/components/ExportButton";
import { Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contatosMock, getContaById } from "@/data/comercial-mock";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Contatos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [papelFilter, setPapelFilter] = useState("");
  const [contatos, setContatos] = useState(contatosMock);
  const [viewItem, setViewItem] = useState<typeof contatosMock[0] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<typeof contatosMock[0] | null>(null);
  const [editData, setEditData] = useState({ nome: "", cargo: "", email: "", telefone: "" });

  const filteredContatos = contatos.filter(contato => {
    const matchSearch = !searchTerm || contato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       contato.email.toLowerCase().includes(searchTerm.toLowerCase()) || contato.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPapel = !papelFilter || contato.papel === papelFilter;
    return matchSearch && matchPapel;
  });

  const getPapelLabel = (papel: string) => { const labels: Record<string, string> = { 'decisor': 'Decisor', 'influenciador': 'Influenciador', 'usuario': 'Usuário', 'compras': 'Compras' }; return labels[papel] || papel; };
  const getPapelVariant = (papel: string): "default" | "secondary" | "outline" | "destructive" => { switch (papel) { case 'decisor': return 'default'; case 'influenciador': return 'secondary'; default: return 'outline'; } };

  const getExportData = () => filteredContatos.map(c => {
    const conta = getContaById(c.contaId);
    return { Nome: c.nome, Cargo: c.cargo, Email: c.email, Telefone: c.telefone, Papel: getPapelLabel(c.papel), Empresa: conta?.nomeFantasia || 'N/A', Tags: c.tags.join(', ') };
  });

  const openEdit = (c: typeof contatosMock[0]) => { setEditItem(c); setEditData({ nome: c.nome, cargo: c.cargo, email: c.email, telefone: c.telefone }) };
  const handleSaveEdit = () => { if (editItem) { setContatos(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Contato atualizado." }) } };
  const handleDelete = () => { if (deleteId) { setContatos(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removido", description: "Contato excluído." }) } };
  const deleteItemData = contatos.find(i => i.id === deleteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate('/comercial/contatos/novo')} className="gap-2"><Plus className="w-4 h-4" /> Novo Contato</Button>
        <ExportButton getData={getExportData} fileName="contatos" sheetName="Contatos" />
      </div>

      <FilterSection
        fields={[
          { type: "text", label: "Buscar", placeholder: "Nome, email ou cargo...", value: searchTerm, onChange: setSearchTerm, width: "flex-1 min-w-[200px]" },
          { type: "select", label: "Papel", placeholder: "Todos", value: papelFilter, onChange: setPapelFilter, options: [
            { value: "decisor", label: "Decisor" }, { value: "influenciador", label: "Influenciador" },
            { value: "usuario", label: "Usuário" }, { value: "compras", label: "Compras" }
          ], width: "min-w-[160px]" }
        ]}
        resultsCount={filteredContatos.length}
      />

      <div className="rounded border border-border">
        <Table>
          <TableHeader><TableRow className="bg-table-header">
            <TableHead>Nome</TableHead><TableHead>Cargo</TableHead><TableHead>Email</TableHead><TableHead>Telefone</TableHead><TableHead>Papel</TableHead><TableHead>Empresa</TableHead><TableHead>Tags</TableHead><TableHead className="w-[50px]"></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filteredContatos.map((contato) => {
              const conta = getContaById(contato.contaId);
              return (
                <TableRow key={contato.id} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell><div className="flex items-center gap-2"><div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><User className="h-4 w-4 text-primary" /></div><span className="font-medium">{contato.nome}</span></div></TableCell>
                  <TableCell>{contato.cargo}</TableCell><TableCell>{contato.email}</TableCell><TableCell>{contato.telefone}</TableCell>
                  <TableCell><Badge variant={getPapelVariant(contato.papel)}>{getPapelLabel(contato.papel)}</Badge></TableCell>
                  <TableCell>{conta?.nomeFantasia || 'N/A'}</TableCell>
                  <TableCell><div className="flex gap-1">{contato.tags.slice(0, 2).map(tag => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}</div></TableCell>
                  <TableCell><TableActions onView={() => setViewItem(contato)} onEdit={() => openEdit(contato)} onDelete={() => setDeleteId(contato.id)} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes do Contato</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Nome: viewItem.nome, Cargo: viewItem.cargo, Email: viewItem.email, Telefone: viewItem.telefone, Papel: getPapelLabel(viewItem.papel), Empresa: getContaById(viewItem.contaId)?.nomeFantasia || 'N/A', Tags: viewItem.tags.join(', ') }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Contato</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData({ ...editData, nome: e.target.value })} /></div>
            <div><Label>Cargo</Label><Input value={editData.cargo} onChange={e => setEditData({ ...editData, cargo: e.target.value })} /></div>
            <div><Label>Email</Label><Input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} /></div>
            <div><Label>Telefone</Label><Input value={editData.telefone} onChange={e => setEditData({ ...editData, telefone: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir contato?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.nome}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
