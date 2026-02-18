import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus, FileText, ArrowUpRight, Wallet } from "lucide-react"
import { TableActions } from "@/components/TableActions"
import { GradientCard } from "@/components/financeiro/GradientCard"
import { StatusBadge } from "@/components/StatusBadge"
import { ExportButton } from "@/components/ExportButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const mockContas = [
  { id: 1, dataLancamento: "12/05/2025", dataFaturamento: "30/04/2025", cliente: "ABEEMAR", documento: "NI", valorTitulo: "R$ 659,88", valorTotalRecebido: "R$ 659,88", proximoVencimento: "XX/XX/XXXX", status: "Recebida" },
  { id: 2, dataLancamento: "12/05/2025", dataFaturamento: "30/04/2025", cliente: "ABEEMAR", documento: "NI", valorTitulo: "R$ 659,88", valorTotalRecebido: "R$ 659,88", proximoVencimento: "XX/XX/XXXX", status: "Em Aberto" },
  { id: 3, dataLancamento: "12/05/2025", dataFaturamento: "30/04/2025", cliente: "ALPHA TECNOLOGIA", documento: "NF 1234", valorTitulo: "R$ 12.345,00", valorTotalRecebido: "R$ 0,00", proximoVencimento: "15/12/2025", status: "Vencida" },
  { id: 4, dataLancamento: "10/05/2025", dataFaturamento: "28/04/2025", cliente: "BETA CORP", documento: "NF 5678", valorTitulo: "R$ 8.500,00", valorTotalRecebido: "R$ 4.250,00", proximoVencimento: "10/01/2026", status: "Pago Parcial" },
]

type Conta = typeof mockContas[0];

const ContasReceber = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockContas)
  const [filterCliente, setFilterCliente] = useState("")
  const [filterDocumento, setFilterDocumento] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<Conta | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Conta | null>(null)
  const [editData, setEditData] = useState({ cliente: "", documento: "", valorTitulo: "", valorTotalRecebido: "" })

  const filtered = useMemo(() => {
    return items.filter(conta => {
      const matchCliente = conta.cliente.toLowerCase().includes(filterCliente.toLowerCase())
      const matchDocumento = conta.documento.toLowerCase().includes(filterDocumento.toLowerCase())
      const matchDataInicio = filterDataInicio ? conta.dataFaturamento >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? conta.dataFaturamento <= filterDataFim.split("-").reverse().join("/") : true
      return matchCliente && matchDocumento && matchDataInicio && matchDataFim
    })
  }, [items, filterCliente, filterDocumento, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(c => ({ Lançamento: c.dataLancamento, Faturamento: c.dataFaturamento, Cliente: c.cliente, Documento: c.documento, Título: c.valorTitulo, Recebido: c.valorTotalRecebido, Vencimento: c.proximoVencimento, Status: c.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Conta excluída." }); } };
  const openEdit = (c: Conta) => { setEditItem(c); setEditData({ cliente: c.cliente, documento: c.documento, valorTitulo: c.valorTitulo, valorTotalRecebido: c.valorTotalRecebido }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Conta atualizada." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GradientCard title="Total Recebido" value="R$ 87.939,88" icon={ArrowUpRight} variant="success" />
          <GradientCard title="Total a Receber" value="R$ 12.345,00" icon={ArrowUpRight} variant="info" />
          <GradientCard title="Valor Total em Títulos" value="R$ 100.284,88" icon={Wallet} variant="orange" />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/financeiro/contas-receber/nova")} className="gap-2"><Plus className="w-4 h-4" />Adicionar Conta</Button>
          <Button onClick={() => navigate("/financeiro/contas-receber/relatorio")} variant="outline" className="gap-2 border-border"><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="contas-receber" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Cliente", placeholder: "Buscar cliente...", value: filterCliente, onChange: setFilterCliente, width: "flex-1 min-w-[180px]" },
            { type: "text", label: "Documento", placeholder: "Número do documento...", value: filterDocumento, onChange: setFilterDocumento, width: "min-w-[160px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <Table>
          <TableHeader><TableRow>
            <TableHead className="text-center">Lançamento</TableHead><TableHead className="text-center">Faturamento</TableHead><TableHead className="text-center">Cliente</TableHead><TableHead className="text-center">Documento</TableHead><TableHead className="text-center">Título</TableHead><TableHead className="text-center">Recebido</TableHead><TableHead className="text-center">Vencimento</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.length === 0 ? (<TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Nenhuma conta encontrada.</TableCell></TableRow>) : (
              filtered.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="text-center">{conta.dataLancamento}</TableCell><TableCell className="text-center">{conta.dataFaturamento}</TableCell><TableCell className="text-center">{conta.cliente}</TableCell><TableCell className="text-center">{conta.documento}</TableCell><TableCell className="text-center">{conta.valorTitulo}</TableCell><TableCell className="text-center">{conta.valorTotalRecebido}</TableCell><TableCell className="text-center">{conta.proximoVencimento}</TableCell>
                  <TableCell className="text-center"><StatusBadge status={conta.status} /></TableCell>
                  <TableCell className="text-center"><TableActions onView={() => setViewItem(conta)} onEdit={() => openEdit(conta)} onDelete={() => setDeleteId(conta.id)} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes - Conta a Receber</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Lançamento: viewItem.dataLancamento, Faturamento: viewItem.dataFaturamento, Cliente: viewItem.cliente, Documento: viewItem.documento, "Valor Título": viewItem.valorTitulo, "Total Recebido": viewItem.valorTotalRecebido, "Próx. Vencimento": viewItem.proximoVencimento, Status: viewItem.status }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Conta a Receber</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Cliente</Label><Input value={editData.cliente} onChange={e => setEditData({ ...editData, cliente: e.target.value })} /></div>
            <div><Label>Documento</Label><Input value={editData.documento} onChange={e => setEditData({ ...editData, documento: e.target.value })} /></div>
            <div><Label>Valor Título</Label><Input value={editData.valorTitulo} onChange={e => setEditData({ ...editData, valorTitulo: e.target.value })} /></div>
            <div><Label>Total Recebido</Label><Input value={editData.valorTotalRecebido} onChange={e => setEditData({ ...editData, valorTotalRecebido: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir conta?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a conta de "{deleteItemData?.cliente}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ContasReceber
