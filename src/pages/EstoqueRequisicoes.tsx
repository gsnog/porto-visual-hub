import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"

const mockRequisicoes = [
  { id: 1, data: "12/05/2025", item: "Cabo HDMI", quantidade: 1, requisitante: "Ana F.", setor: "TI", status: "Aprovada" },
  { id: 2, data: "10/05/2025", item: "Papel A4", quantidade: 5, requisitante: "Carlos M.", setor: "Administrativo", status: "Pendente" },
  { id: 3, data: "08/05/2025", item: "Toner HP", quantidade: 2, requisitante: "Pedro S.", setor: "TI", status: "Aprovada" },
  { id: 4, data: "05/05/2025", item: "Parafuso M8", quantidade: 50, requisitante: "Lucas V.", setor: "Produção", status: "Rejeitada" },
]

export default function EstoqueRequisicoes() {
  const navigate = useNavigate()
  const [filterCidade, setFilterCidade] = useState("")
  const [filterData, setFilterData] = useState("")

  const filteredRequisicoes = useMemo(() => {
    return mockRequisicoes.filter(req => {
      const matchCidade = filterCidade && filterCidade !== "todos" 
        ? req.setor.toLowerCase().includes(filterCidade.toLowerCase()) 
        : true
      const matchData = filterData ? req.data.includes(filterData.split("-").reverse().join("/")) : true
      return matchCidade && matchData
    })
  }, [filterCidade, filterData])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovada':
        return 'text-green-600 font-medium';
      case 'Pendente':
        return 'text-yellow-600 font-medium';
      case 'Rejeitada':
        return 'text-red-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/estoque/requisicoes/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Adicionar</Button>
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Relatório</Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Select value={filterCidade} onValueChange={setFilterCidade}>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-64 rounded-lg">
              <SelectValue placeholder="Setor" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ti">TI</SelectItem>
              <SelectItem value="producao">Produção</SelectItem>
              <SelectItem value="administrativo">Administrativo</SelectItem>
            </SelectContent>
          </Select>
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
          {filteredRequisicoes.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-center">Requisitante</TableHead>
                <TableHead className="text-center">Setor</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequisicoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma requisição encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequisicoes.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="text-center">{req.data}</TableCell>
                    <TableCell className="text-center">{req.item}</TableCell>
                    <TableCell className="text-center">{req.quantidade}</TableCell>
                    <TableCell className="text-center">{req.requisitante}</TableCell>
                    <TableCell className="text-center">{req.setor}</TableCell>
                    <TableCell className="text-center">
                      <span className={getStatusColor(req.status)}>{req.status}</span>
                    </TableCell>
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
