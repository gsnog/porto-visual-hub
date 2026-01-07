import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"

const mockEntradas = [
  { id: 1, data: "02/06/2025", item: "Parafuso M8", validade: "05/06/2025", notaFiscal: "123456", estoqueDestinado: "Almoxarifado SP", custoUnitario: "R$ 0,50", quantidade: 100, custoTotal: "R$ 50,00" },
  { id: 2, data: "01/06/2025", item: "Cabo HDMI", validade: "01/06/2027", notaFiscal: "789012", estoqueDestinado: "TI Central", custoUnitario: "R$ 25,00", quantidade: 10, custoTotal: "R$ 250,00" },
  { id: 3, data: "30/05/2025", item: "Óleo Lubrificante", validade: "30/05/2026", notaFiscal: "345678", estoqueDestinado: "Manutenção", custoUnitario: "R$ 45,00", quantidade: 5, custoTotal: "R$ 225,00" },
  { id: 4, data: "28/05/2025", item: "Parafuso M8", validade: "28/05/2026", notaFiscal: "901234", estoqueDestinado: "Almoxarifado RJ", custoUnitario: "R$ 0,55", quantidade: 200, custoTotal: "R$ 110,00" },
]

export default function EstoqueEntradas() {
  const navigate = useNavigate()
  const [showRelatorio, setShowRelatorio] = useState(false)
  const [filterNome, setFilterNome] = useState("")
  const [filterNFe, setFilterNFe] = useState("")
  const [filterData, setFilterData] = useState("")

  const filteredEntradas = useMemo(() => {
    return mockEntradas.filter(entrada => {
      const matchNome = entrada.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchNFe = entrada.notaFiscal.toLowerCase().includes(filterNFe.toLowerCase())
      const matchData = filterData ? entrada.data.includes(filterData.split("-").reverse().join("/")) : true
      return matchNome && matchNFe && matchData
    })
  }, [filterNome, filterNFe, filterData])

  const handleFiltrar = () => {
    // Filtering is already reactive via useMemo
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/estoque/entradas/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Novo Item</Button>
          <Button onClick={() => navigate("/estoque/entradas/upload-nfe")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Upload NF-e</Button>
          <Button 
            onClick={() => setShowRelatorio(!showRelatorio)} 
            className={`rounded-lg ${showRelatorio ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'} text-primary-foreground`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>

        {showRelatorio && (
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Filtrar por:</label>
              <Select defaultValue="anual">
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-28 rounded-lg border border-[#22265B]">
                  <SelectValue placeholder="Anual" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="anual">Anual</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Ano:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-32 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Fornecedor:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Item:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Nota Fiscal:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Unidade:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <Button className="rounded-lg bg-green-600 hover:bg-green-700 text-white">
              Gerar Relatório
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Nome do Item" 
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
          <Input 
            placeholder="NF-e" 
            value={filterNFe}
            onChange={(e) => setFilterNFe(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
          <Input 
            type="date" 
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />
          <Button onClick={handleFiltrar} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredEntradas.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Data</TableHead>
                <TableHead className="!text-white font-medium text-center">Item</TableHead>
                <TableHead className="!text-white font-medium text-center">Validade</TableHead>
                <TableHead className="!text-white font-medium text-center">Nota Fiscal</TableHead>
                <TableHead className="!text-white font-medium text-center">Estoque Destinado</TableHead>
                <TableHead className="!text-white font-medium text-center">Custo Unitário</TableHead>
                <TableHead className="!text-white font-medium text-center">Quantidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Custo Total</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Nenhuma entrada encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntradas.map((entrada) => (
                  <TableRow key={entrada.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                    <TableCell className="text-center">{entrada.data}</TableCell>
                    <TableCell className="text-center">{entrada.item}</TableCell>
                    <TableCell className="text-center">{entrada.validade}</TableCell>
                    <TableCell className="text-center">{entrada.notaFiscal}</TableCell>
                    <TableCell className="text-center">{entrada.estoqueDestinado}</TableCell>
                    <TableCell className="text-center">{entrada.custoUnitario}</TableCell>
                    <TableCell className="text-center">{entrada.quantidade}</TableCell>
                    <TableCell className="text-center">{entrada.custoTotal}</TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">Ações</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
