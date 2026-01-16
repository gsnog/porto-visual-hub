import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FileText, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"

const mockSaidas = [
  { id: 1, data: "02/06/2025", item: "Parafuso M8", setor: "Produção", requisitante: "Lucas V.", quantidade: 50, origem: "Almoxarifado SP", destino: "Setor Montagem" },
  { id: 2, data: "01/06/2025", item: "Cabo HDMI", setor: "TI", requisitante: "Ana F.", quantidade: 2, origem: "TI Central", destino: "Sala de Reuniões" },
  { id: 3, data: "30/05/2025", item: "Óleo Lubrificante", setor: "Manutenção", requisitante: "Pedro S.", quantidade: 1, origem: "Manutenção", destino: "Linha 1" },
  { id: 4, data: "28/05/2025", item: "Parafuso M8", setor: "Produção", requisitante: "Maria C.", quantidade: 100, origem: "Almoxarifado RJ", destino: "Setor Acabamento" },
]

export default function EstoqueSaidas() {
  const navigate = useNavigate()
  const [showRelatorio, setShowRelatorio] = useState(false)
  const [filterNome, setFilterNome] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")

  const filteredSaidas = useMemo(() => {
    return mockSaidas.filter(saida => {
      const matchNome = saida.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchDataInicio = filterDataInicio ? saida.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? saida.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchNome && matchDataInicio && matchDataFim
    })
  }, [filterNome, filterDataInicio, filterDataFim])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/saidas/nova")} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Saída
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
                <label className="filter-label">Requisitante:</label>
                <Input className="filter-input w-36" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Item:</label>
                <Input className="filter-input w-36" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Setor:</label>
                <Input className="filter-input w-36" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="filter-label">Unidade:</label>
                <Input className="filter-input w-36" />
              </div>
              <Button className="rounded-md bg-green-600 hover:bg-green-700 text-white h-10">
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
          resultsCount={filteredSaidas.length}
        />

        <div className="rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-center">Setor</TableHead>
                <TableHead className="text-center">Requisitante</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-center">Origem</TableHead>
                <TableHead className="text-center">Destino</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSaidas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Nenhuma saída encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSaidas.map((saida) => (
                  <TableRow key={saida.id}>
                    <TableCell className="text-center">{saida.data}</TableCell>
                    <TableCell className="text-center">{saida.item}</TableCell>
                    <TableCell className="text-center">{saida.setor}</TableCell>
                    <TableCell className="text-center">{saida.requisitante}</TableCell>
                    <TableCell className="text-center">{saida.quantidade}</TableCell>
                    <TableCell className="text-center">{saida.origem}</TableCell>
                    <TableCell className="text-center">{saida.destino}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', saida.id)}
                        onEdit={() => console.log('Edit', saida.id)}
                        onDelete={() => console.log('Delete', saida.id)}
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
