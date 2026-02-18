import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"
import { StatusBadge } from "@/components/StatusBadge"
import { ExportButton } from "@/components/ExportButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const initialNfes = [
  { id: 1, dataEmissao: "02/06/2025", valorTotal: "R$ 99.999,99", numero: "99999", chaveAcesso: "9999.9999.9999.9999.9999.9999.9999.9999.9999.9999", nf: "NFe 12345", status: "Autorizada" },
  { id: 2, dataEmissao: "10/06/2025", valorTotal: "R$ 1.500,50", numero: "10001", chaveAcesso: "8888.8888.8888.8888.8888.8888.8888.8888.8888.8888", nf: "NFe 67890", status: "Cancelada" },
  { id: 3, dataEmissao: "15/06/2025", valorTotal: "R$ 5.000,00", numero: "10002", chaveAcesso: "7777.7777.7777.7777.7777.7777.7777.7777.7777.7777", nf: "NFe 54321", status: "Processando" },
]

type Nfe = typeof initialNfes[0];

const NFe = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState(initialNfes)
  const [filterNumero, setFilterNumero] = useState("")
  const [filterData, setFilterData] = useState("")
  const [viewItem, setViewItem] = useState<Nfe | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState<Nfe | null>(null)
  const [editData, setEditData] = useState({ numero: "", nf: "", valorTotal: "" })

  const filteredNfes = useMemo(() => {
    return items.filter(nfe => {
      const matchNumero = nfe.numero.toLowerCase().includes(filterNumero.toLowerCase())
      const matchData = filterData ? nfe.dataEmissao.includes(filterData.split("-").reverse().join("/")) : true
      return matchNumero && matchData
    })
  }, [items, filterNumero, filterData])

  const getExportData = () => filteredNfes.map(n => ({ "Data Emissão": n.dataEmissao, Número: n.numero, NF: n.nf, "Valor Total": n.valorTotal, "Chave de Acesso": n.chaveAcesso, Status: n.status }))
  const openEdit = (n: Nfe) => { setEditItem(n); setEditData({ numero: n.numero, nf: n.nf, valorTotal: n.valorTotal }) }
  const handleSaveEdit = () => { if (editItem) { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...editData } : i)); setEditItem(null); toast({ title: "Salvo", description: "NF-e atualizada." }) } }
  const handleDelete = () => { if (deleteId !== null) { setItems(prev => prev.filter(i => i.id !== deleteId)); setDeleteId(null); toast({ title: "Removida", description: "NF-e excluída." }) } }
  const deleteItemData = items.find(i => i.id === deleteId)

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button className="gap-2" onClick={() => navigate("/nfe/nova")}><Plus className="w-4 h-4" />Nova NF-e</Button>
          <Button onClick={() => navigate("/financeiro/xml/relatorio")} variant="outline" className="gap-2 border-border"><FileText className="w-4 h-4" />Relatório</Button>
          <ExportButton getData={getExportData} fileName="nfe" />
        </div>

        <FilterSection
          fields={[
            { type: "text", label: "Número NF-e", placeholder: "Buscar número...", value: filterNumero, onChange: setFilterNumero, width: "flex-1 min-w-[200px]" },
            { type: "date", label: "Data Emissão", value: filterData, onChange: setFilterData, width: "min-w-[160px]" }
          ]}
          resultsCount={filteredNfes.length}
        />

        <Table>
          <TableHeader><TableRow>
            <TableHead className="text-center">Data Emissão</TableHead><TableHead className="text-center">Número</TableHead><TableHead className="text-center">NF</TableHead><TableHead className="text-center">Valor Total</TableHead><TableHead className="text-center">Chave de Acesso</TableHead><TableHead className="text-center">Status</TableHead><TableHead className="text-center">Ações</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filteredNfes.map((nfe) => (
              <TableRow key={nfe.id}>
                <TableCell className="text-center">{nfe.dataEmissao}</TableCell>
                <TableCell className="text-center">{nfe.numero}</TableCell>
                <TableCell className="text-center">{nfe.nf}</TableCell>
                <TableCell className="text-center font-semibold">{nfe.valorTotal}</TableCell>
                <TableCell className="text-center text-xs">{nfe.chaveAcesso}</TableCell>
                <TableCell className="text-center"><StatusBadge status={nfe.status} /></TableCell>
                <TableCell className="text-center"><TableActions onView={() => setViewItem(nfe)} onEdit={() => openEdit(nfe)} onDelete={() => setDeleteId(nfe.id)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Detalhes da NF-e</DialogTitle></DialogHeader>
          {viewItem && <div className="space-y-2">{Object.entries({ "Data Emissão": viewItem.dataEmissao, Número: viewItem.numero, NF: viewItem.nf, "Valor Total": viewItem.valorTotal, "Chave de Acesso": viewItem.chaveAcesso, Status: viewItem.status }).map(([k, v]) => (<div key={k} className="flex justify-between py-1 border-b border-border last:border-0"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div>}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent><DialogHeader><DialogTitle>Editar NF-e</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Número</Label><Input value={editData.numero} onChange={e => setEditData({ ...editData, numero: e.target.value })} /></div>
            <div><Label>NF</Label><Input value={editData.nf} onChange={e => setEditData({ ...editData, nf: e.target.value })} /></div>
            <div><Label>Valor Total</Label><Input value={editData.valorTotal} onChange={e => setEditData({ ...editData, valorTotal: e.target.value })} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEdit}>Salvar</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir NF-e?</AlertDialogTitle><AlertDialogDescription>Deseja excluir a NF-e "{deleteItemData?.nf}"? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default NFe
