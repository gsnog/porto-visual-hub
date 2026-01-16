import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FileText, Plus, Upload, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"

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
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")

  const filteredEntradas = useMemo(() => {
    return mockEntradas.filter(entrada => {
      const matchNome = entrada.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchNFe = entrada.notaFiscal.toLowerCase().includes(filterNFe.toLowerCase())
      const matchDataInicio = filterDataInicio ? entrada.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? entrada.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchNome && matchNFe && matchDataInicio && matchDataFim
    })
  }, [filterNome, filterNFe, filterDataInicio, filterDataFim])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/entradas/nova")} className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Item
          </Button>
          <Button 
            onClick={() => navigate("/estoque/entradas/upload-nfe")} 
            variant="outline"
            className="gap-2 border-border"
          >
            <Upload className="w-4 h-4" />
            Upload NF-e
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button 
            onClick={() => setShowRelatorio(!showRelatorio)} 
            variant="outline"
            className="gap-2 border-border"
          >
            <FileText className="w-4 h-4" />
            Relatório
          </Button>
        </div>

        {showRelatorio && (
          <div className="filter-card">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Filtrar por:</label>
                <Select defaultValue="anual">
                  <SelectTrigger className="filter-input w-28">
                    <SelectValue placeholder="Anual" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="anual">Anual</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Ano:</label>
                <Input className="filter-input w-32" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Fornecedor:</label>
                <Input className="filter-input w-36" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Item:</label>
                <Input className="filter-input w-36" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Nota Fiscal:</label>
                <Input className="filter-input w-36" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Unidade:</label>
                <Input className="filter-input w-36" />
              </div>
              <Button className="rounded bg-success hover:bg-success/90 text-white h-10 transition-all duration-200">
                Gerar Relatório
              </Button>
            </div>
          </div>
        )}

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Nome do Item",
              placeholder: "Buscar item...",
              value: filterNome,
              onChange: setFilterNome,
              width: "flex-1 min-w-[200px]"
            },
            {
              type: "text",
              label: "NF-e",
              placeholder: "Número da NF-e...",
              value: filterNFe,
              onChange: setFilterNFe,
              width: "min-w-[160px]"
            },
            {
              type: "date",
              label: "Data Início",
              value: filterDataInicio,
              onChange: setFilterDataInicio,
              width: "min-w-[160px]"
            },
            {
              type: "date",
              label: "Data Fim",
              value: filterDataFim,
              onChange: setFilterDataFim,
              width: "min-w-[160px]"
            }
          ]}
          resultsCount={filteredEntradas.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-center">Validade</TableHead>
                <TableHead className="text-center">Nota Fiscal</TableHead>
                <TableHead className="text-center">Estoque Destinado</TableHead>
                <TableHead className="text-center">Custo Unitário</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-center">Custo Total</TableHead>
                <TableHead className="text-center">Ações</TableHead>
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
                  <TableRow key={entrada.id}>
                    <TableCell className="text-center">{entrada.data}</TableCell>
                    <TableCell className="text-center">{entrada.item}</TableCell>
                    <TableCell className="text-center">{entrada.validade}</TableCell>
                    <TableCell className="text-center">{entrada.notaFiscal}</TableCell>
                    <TableCell className="text-center">{entrada.estoqueDestinado}</TableCell>
                    <TableCell className="text-center">{entrada.custoUnitario}</TableCell>
                    <TableCell className="text-center">{entrada.quantidade}</TableCell>
                    <TableCell className="text-center">{entrada.custoTotal}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', entrada.id)}
                        onEdit={() => console.log('Edit', entrada.id)}
                        onDelete={() => console.log('Delete', entrada.id)}
                      />
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
