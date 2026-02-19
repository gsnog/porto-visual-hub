import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { ExportButton } from "@/components/ExportButton";
import { Plus, List, GripVertical, Calendar, LayoutList, Filter as FunnelIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { oportunidadesMock, etapasFunil, getContaById } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function Oportunidades() {
  const navigate = useNavigate();
  const [view, setView] = useState<"lista" | "kanban" | "funil">("lista");
  const [searchTerm, setSearchTerm] = useState("");
  const [etapaFilter, setEtapaFilter] = useState("");
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [oportunidades, setOportunidades] = useState(oportunidadesMock);
  const [viewItem, setViewItem] = useState<typeof oportunidadesMock[0] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<typeof oportunidadesMock[0] | null>(null);
  const [editData, setEditData] = useState({ titulo: "", valorEstimado: "", probabilidade: "" });

  const filteredOps = oportunidades.filter(op => {
    const conta = getContaById(op.contaId);
    const matchSearch = !searchTerm || op.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta?.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEtapa = !etapaFilter || op.etapa === etapaFilter;
    return matchSearch && matchEtapa;
  });

  const etapasAtivas = etapasFunil.filter(e => !['ganho', 'perdido'].includes(e.id));
  const getOwnerName = (ownerId: string) => pessoasMock.find(p => p.id === ownerId)?.nome.split(' ')[0] || 'N/A';

  const handleDragStart = (e: React.DragEvent, opId: string) => { setDraggedCard(opId); e.dataTransfer.effectAllowed = "move"; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; };
  const handleDrop = (e: React.DragEvent, etapaId: string) => {
    e.preventDefault();
    if (draggedCard) {
      setOportunidades(prev => prev.map(op => op.id === draggedCard
        ? { ...op, etapa: etapaId, probabilidade: etapasFunil.find(e => e.id === etapaId)?.probabilidade || op.probabilidade }
        : op
      ));
      setDraggedCard(null);
    }
  };

  const getEtapaBgColor = (etapaId: string) => {
    const colors: Record<string, string> = {
      'prospeccao': 'bg-slate-100 dark:bg-slate-800', 'qualificacao': 'bg-blue-50 dark:bg-blue-900/30',
      'diagnostico': 'bg-indigo-50 dark:bg-indigo-900/30', 'proposta': 'bg-purple-50 dark:bg-purple-900/30',
      'negociacao': 'bg-amber-50 dark:bg-amber-900/30', 'aprovacao': 'bg-lime-50 dark:bg-lime-900/30',
    };
    return colors[etapaId] || 'bg-muted';
  };

  const funnelData = etapasFunil.filter(e => !['ganho', 'perdido'].includes(e.id)).map(etapa => {
    const ops = filteredOps.filter(op => op.etapa === etapa.id);
    return { ...etapa, count: ops.length, total: ops.reduce((s, o) => s + o.valorEstimado, 0) };
  });

  const getExportData = () => filteredOps.map(op => {
    const conta = getContaById(op.contaId);
    const etapa = etapasFunil.find(e => e.id === op.etapa);
    return { Oportunidade: op.titulo, Conta: conta?.nomeFantasia || '', Valor: formatCurrency(op.valorEstimado), Etapa: etapa?.nome || '', Probabilidade: `${op.probabilidade}%`, Previsão: new Date(op.dataPrevisao).toLocaleDateString('pt-BR'), Proprietário: getOwnerName(op.proprietarioId) };
  });

  const openEdit = (op: typeof oportunidadesMock[0]) => { setEditItem(op); setEditData({ titulo: op.titulo, valorEstimado: String(op.valorEstimado), probabilidade: String(op.probabilidade) }); };
  const handleSaveEdit = () => { if (editItem) { setOportunidades(prev => prev.map(i => i.id === editItem.id ? { ...i, titulo: editData.titulo, valorEstimado: Number(editData.valorEstimado), probabilidade: Number(editData.probabilidade) } : i)); setEditItem(null); toast({ title: "Salvo", description: "Oportunidade atualizada." }); } };
  const handleDelete = () => { if (deleteId) { setOportunidades(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Oportunidade excluída." }); } };
  const deleteItemData = oportunidades.find(i => i.id === deleteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded overflow-hidden">
            <Button variant={view === "lista" ? "default" : "ghost"} size="sm" onClick={() => setView("lista")} className="rounded-none">
              <List className="h-4 w-4" />
            </Button>
            <Button variant={view === "kanban" ? "default" : "ghost"} size="sm" onClick={() => setView("kanban")} className="rounded-none">
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button variant={view === "funil" ? "default" : "ghost"} size="sm" onClick={() => setView("funil")} className="rounded-none">
              <FunnelIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton getData={getExportData} fileName="oportunidades" />
          <Button onClick={() => navigate('/comercial/oportunidades/nova')} className="gap-2">
            <Plus className="w-4 h-4" /> Nova Oportunidade
          </Button>
        </div>
      </div>

      <FilterSection
        fields={[
          { type: "text", label: "Buscar", placeholder: "Oportunidade ou conta...", value: searchTerm, onChange: setSearchTerm, width: "flex-1 min-w-[200px]" },
          { type: "select", label: "Etapa", placeholder: "Todas", value: etapaFilter, onChange: setEtapaFilter,
            options: etapasFunil.map(e => ({ value: e.id, label: e.nome })), width: "min-w-[180px]" }
        ]}
        resultsCount={filteredOps.length}
      />

      {view === "funil" && (
        <Card className="border border-border rounded p-6">
          <CardHeader className="pb-4 px-0 pt-0">
            <CardTitle className="text-base font-semibold">Funil de Vendas</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {funnelData.map((etapa, i) => {
              const widthPct = 100 - (i * (60 / funnelData.length));
              return (
                <div key={etapa.id} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-right text-muted-foreground truncate">{etapa.nome}</div>
                  <div className="flex-1 flex justify-center">
                    <div
                      className={`h-12 rounded flex items-center justify-center text-sm font-medium ${getEtapaBgColor(etapa.id)} border border-border`}
                      style={{ width: `${widthPct}%` }}
                    >
                      {etapa.count} ops • {formatCurrency(etapa.total)}
                    </div>
                  </div>
                  <div className="w-16 text-sm text-muted-foreground">{etapa.probabilidade}%</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {view === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {etapasAtivas.map(etapa => {
            const opsEtapa = filteredOps.filter(op => op.etapa === etapa.id);
            const totalEtapa = opsEtapa.reduce((sum, op) => sum + op.valorEstimado, 0);
            return (
              <div key={etapa.id} className="flex-shrink-0 w-[300px]" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, etapa.id)}>
                <div className={`rounded p-3 ${getEtapaBgColor(etapa.id)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm">{etapa.nome}</h3>
                      <p className="text-xs text-muted-foreground">{opsEtapa.length} ops • {formatCurrency(totalEtapa)}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{etapa.probabilidade}%</Badge>
                  </div>
                  <div className="space-y-2 min-h-[200px]">
                    {opsEtapa.map(op => {
                      const conta = getContaById(op.contaId);
                      return (
                        <Card key={op.id} className={`border border-border rounded cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${draggedCard === op.id ? 'opacity-50' : ''}`}
                          draggable onDragStart={(e) => handleDragStart(e, op.id)}>
                          <CardContent className="p-3">
                            <div className="flex items-start gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{op.titulo}</p>
                                <p className="text-xs text-muted-foreground truncate">{conta?.nomeFantasia}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-sm font-semibold text-primary">{formatCurrency(op.valorEstimado)}</span>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(op.dataPrevisao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-muted-foreground">{getOwnerName(op.proprietarioId)}</span>
                                  {op.proximaAcao && <Badge variant="secondary" className="text-xs truncate max-w-[120px]">{op.proximaAcao}</Badge>}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex-shrink-0 w-[300px]">
            <div className="rounded p-3 bg-lime-50 dark:bg-lime-900/30">
              <div className="flex items-center justify-between mb-3">
                <div><h3 className="font-semibold text-sm text-success">Fechado Ganho</h3><p className="text-xs text-muted-foreground">{filteredOps.filter(op => op.etapa === 'ganho').length} ops</p></div>
                <Badge variant="outline" className="text-xs bg-success/10 text-success border-success">100%</Badge>
              </div>
              <div className="min-h-[200px] border-2 border-dashed border-success/30 rounded flex items-center justify-center" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'ganho')}>
                <p className="text-xs text-muted-foreground">Arraste para ganhar</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-[300px]">
            <div className="rounded p-3 bg-rose-50 dark:bg-rose-900/30">
              <div className="flex items-center justify-between mb-3">
                <div><h3 className="font-semibold text-sm text-destructive">Fechado Perdido</h3><p className="text-xs text-muted-foreground">{filteredOps.filter(op => op.etapa === 'perdido').length} ops</p></div>
                <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive">0%</Badge>
              </div>
              <div className="min-h-[200px] border-2 border-dashed border-destructive/30 rounded flex items-center justify-center" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'perdido')}>
                <p className="text-xs text-muted-foreground">Arraste para perder</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "lista" && (
        <div className="rounded border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead>Oportunidade</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Probabilidade</TableHead>
                <TableHead>Previsão</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOps.map((op) => {
                const conta = getContaById(op.contaId);
                const etapa = etapasFunil.find(e => e.id === op.etapa);
                return (
                  <TableRow key={op.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="font-medium">{op.titulo}</TableCell>
                    <TableCell>{conta?.nomeFantasia}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(op.valorEstimado)}</TableCell>
                    <TableCell><Badge variant="outline">{etapa?.nome}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${op.probabilidade}%` }} />
                        </div>
                        <span className="text-sm">{op.probabilidade}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(op.dataPrevisao).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{getOwnerName(op.proprietarioId)}</TableCell>
                    <TableCell><TableActions onView={() => setViewItem(op)} onEdit={() => openEdit(op)} onDelete={() => setDeleteId(op.id)} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da Oportunidade</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Título: viewItem.titulo, Conta: getContaById(viewItem.contaId)?.nomeFantasia || '', Valor: formatCurrency(viewItem.valorEstimado), Etapa: etapasFunil.find(e => e.id === viewItem.etapa)?.nome || '', Probabilidade: `${viewItem.probabilidade}%`, Previsão: new Date(viewItem.dataPrevisao).toLocaleDateString('pt-BR'), Proprietário: getOwnerName(viewItem.proprietarioId), "Próxima Ação": viewItem.proximaAcao || '-' }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Oportunidade</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Título</Label><Input value={editData.titulo} onChange={e => setEditData({ ...editData, titulo: e.target.value })} /></div>
            <div><Label>Valor Estimado</Label><Input type="number" value={editData.valorEstimado} onChange={e => setEditData({ ...editData, valorEstimado: e.target.value })} /></div>
            <div><Label>Probabilidade (%)</Label><Input type="number" value={editData.probabilidade} onChange={e => setEditData({ ...editData, probabilidade: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir oportunidade?</AlertDialogTitle><AlertDialogDescription>Deseja excluir "{deleteItemData?.titulo}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
