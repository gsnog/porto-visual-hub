import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus, FileText, CreditCard, Receipt, Wallet } from "lucide-react"
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
  { id: 1, dataLancamento: "02/06/2025", dataFaturamento: "05/06/2025", proximoVencimento: "-", beneficiario: "Pedro Piaes", documento: "NI", valorTitulo: "R$ 1.500,00", valorTotal: "R$ 1.500,00", status: "Em Aberto" },
  { id: 2, dataLancamento: "02/06/2025", dataFaturamento: "05/06/2025", proximoVencimento: "20/12/2025", beneficiario: "Transportadora X", documento: "NF 987", valorTitulo: "R$ 250,00", valorTotal: "R$ 300,00", status: "Pago Parcial" },
  { id: 3, dataLancamento: "01/05/2025", dataFaturamento: "01/05/2025", proximoVencimento: "20/11/2025", beneficiario: "Fornecedor Y", documento: "BOL 101", valorTitulo: "R$ 5.000,00", valorTotal: "R$ 5.050,00", status: "Recebida" },
  { id: 4, dataLancamento: "15/04/2025", dataFaturamento: "15/04/2025", proximoVencimento: "15/10/2025", beneficiario: "Aluguel Sede", documento: "REC 001", valorTitulo: "R$ 3.000,00", valorTotal: "R$ 3.000,00", status: "Vencida" },
]

type Conta = typeof mockContas[0];

const ContasPagar = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState(mockContas)
  const [filterBeneficiario, setFilterBeneficiario] = useState("")
  const [filterDocumento, setFilterDocumento] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")
  const [viewItem, setViewItem] = useState<Conta | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Conta | null>(null)
  const [editData, setEditData] = useState({ beneficiario: "", documento: "", valorTitulo: "", valorTotal: "" })

  const filtered = useMemo(() => {
    return items.filter(conta => {
      const matchBeneficiario = conta.beneficiario.toLowerCase().includes(filterBeneficiario.toLowerCase())
      const matchDocumento = conta.documento.toLowerCase().includes(filterDocumento.toLowerCase())
      const matchDataInicio = filterDataInicio ? conta.dataFaturamento >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? conta.dataFaturamento <= filterDataFim.split("-").reverse().join("/") : true
      return matchBeneficiario && matchDocumento && matchDataInicio && matchDataFim
    })
  }, [items, filterBeneficiario, filterDocumento, filterDataInicio, filterDataFim])

  const getExportData = () => filtered.map(c => ({ Lançamento: c.dataLancamento, Faturamento: c.dataFaturamento, Beneficiário: c.beneficiario, Documento: c.documento, Título: c.valorTitulo, Total: c.valorTotal, Vencimento: c.proximoVencimento, Status: c.status }));
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "Conta excluída." }); } };
  const openEdit = (c: Conta) => { setEditItem(c); setEditData({ beneficiario: c.beneficiario, documento: c.documento, valorTitulo: c.valorTitulo, valorTotal: c.valorTotal }); };
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "Conta atualizada." }); } };
  const deleteItemData = items.find(i => i.id === deleteId);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GradientCard title="Total Pago" value="R$ 87.939,88" icon={CreditCard} variant="danger" />
          <GradientCard title="Total a Pagar" value="R$ 1.800,00" icon={Receipt} variant="warning" />
          <GradientCard title="Saldo Atual" value="R$ 89.739,88" icon={Wallet} variant="orange" />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/financeiro/contas-pagar/nova")} className="gap-2"><Plus className="w-4 h-4" />Adicionar Conta</Button>
          <Button onClick={() => navigate("/financeiro/contas-pagar/relatorio")} variant="outline" className="gap-2 border-border"><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="contas-pagar" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Beneficiário", placeholder: "Buscar beneficiário...", value: filterBeneficiario, onChange: setFilterBeneficiario, width: "flex-1 min-w-[180px]" },
            { type: "text", label: "Documento", placeholder: "Número do documento...", value: filterDocumento, onChange: setFilterDocumento, width: "min-w-[160px]" },
            { type: "date", label: "Data Início", value: filterDataInicio, onChange: setFilterDataInicio, width: "min-w-[160px]" },
            { type: "date", label: "Data Fim", value: filterDataFim, onChange: setFilterDataFim, width: "min-w-[160px]" }
          ]}
          resultsCount={filtered.length}
        />

        <Table>
          <TableHeader><TableRow>
            <TableHead className="text-center">Lançamento</TableHead><TableHead className="text-center">Faturamento</TableHead><TableHead className="text-center">Beneficiário</TableHead><TableHead className="text-center">Documento</TableHead><TableHead className="text-center">Título</TableHead><TableHead className="text-center">Total</TableHead><TableHead className="text-center">Vencimento</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.length === 0 ? (<TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">Nenhuma conta encontrada.</TableCell></TableRow>) : (
              filtered.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="text-center">{conta.dataLancamento}</TableCell><TableCell className="text-center">{conta.dataFaturamento}</TableCell><TableCell className="text-center">{conta.beneficiario}</TableCell><TableCell className="text-center">{conta.documento}</TableCell><TableCell className="text-center">{conta.valorTitulo}</TableCell><TableCell className="text-center">{conta.valorTotal}</TableCell><TableCell className="text-center">{conta.proximoVencimento}</TableCell>
                  <TableCell className="text-center"><StatusBadge status={conta.status} /></TableCell>
                  <TableCell className="text-center"><TableActions onView={() => setViewItem(conta)} onEdit={() => openEdit(conta)} onDelete={() => setDeleteId(conta.id)} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes - Conta a Pagar</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ Lançamento: viewItem.dataLancamento, Faturamento: viewItem.dataFaturamento, Beneficiário: viewItem.beneficiario, Documento: viewItem.documento, "Valor Título": viewItem.valorTitulo, "Valor Total": viewItem.valorTotal, "Próx. Vencimento": viewItem.proximoVencimento, Status: viewItem.status }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar Conta a Pagar</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Beneficiário</Label><Input value={editData.beneficiario} onChange={e => setEditData({ ...editData, beneficiario: e.target.value })} /></div>
            <div><Label>Documento</Label><Input value={editData.documento} onChange={e => setEditData({ ...editData, documento: e.target.value })} /></div>
            <div><Label>Valor Título</Label><Input value={editData.valorTitulo} onChange={e => setEditData({ ...editData, valorTitulo: e.target.value })} /></div>
            <div><Label>Valor Total</Label><Input value={editData.valorTotal} onChange={e => setEditData({ ...editData, valorTotal: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir conta?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a conta de "{deleteItemData?.beneficiario}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ContasPagar
