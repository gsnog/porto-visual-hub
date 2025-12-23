import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"

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
  const [filterData, setFilterData] = useState("")

  const filteredSaidas = useMemo(() => {
    return mockSaidas.filter(saida => {
      const matchNome = saida.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchData = filterData ? saida.data.includes(filterData.split("-").reverse().join("/")) : true
      return matchNome && matchData
    })
  }, [filterNome, filterData])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Saídas</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/estoque/saidas/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Adicionar Saída</Button>
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
              <label className="text-sm text-foreground">Requisitante:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Item:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-36 rounded-lg border border-[#22265B]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Setor:</label>
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
            type="date" 
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredSaidas.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Data</TableHead>
                <TableHead className="!text-white font-medium text-center">Item</TableHead>
                <TableHead className="!text-white font-medium text-center">Setor</TableHead>
                <TableHead className="!text-white font-medium text-center">Requisitante</TableHead>
                <TableHead className="!text-white font-medium text-center">Quantidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Origem</TableHead>
                <TableHead className="!text-white font-medium text-center">Destino</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
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
                  <TableRow key={saida.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                    <TableCell className="text-center">{saida.data}</TableCell>
                    <TableCell className="text-center">{saida.item}</TableCell>
                    <TableCell className="text-center">{saida.setor}</TableCell>
                    <TableCell className="text-center">{saida.requisitante}</TableCell>
                    <TableCell className="text-center">{saida.quantidade}</TableCell>
                    <TableCell className="text-center">{saida.origem}</TableCell>
                    <TableCell className="text-center">{saida.destino}</TableCell>
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
