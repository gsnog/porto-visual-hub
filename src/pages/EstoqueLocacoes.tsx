import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"

const mockLocacoes = [
  { id: 1, unidade: "Unidade A", inicio: "02/06/2025", fimPrevisto: "02/07/2025", locador: "João Silva", contrato: "CONTR-001", status: "Em Andamento" },
  { id: 2, unidade: "Unidade B", inicio: "15/05/2025", fimPrevisto: "15/08/2025", locador: "Maria Santos", contrato: "CONTR-002", status: "Em Andamento" },
  { id: 3, unidade: "Unidade C", inicio: "01/04/2025", fimPrevisto: "01/06/2025", locador: "Carlos Pereira", contrato: "CONTR-003", status: "Finalizado" },
]

export default function EstoqueLocacoes() {
  const navigate = useNavigate()
  const [filterLocador, setFilterLocador] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")

  const filteredLocacoes = useMemo(() => {
    return mockLocacoes.filter(loc => {
      const matchLocador = loc.locador.toLowerCase().includes(filterLocador.toLowerCase())
      const matchDataInicio = filterDataInicio ? loc.inicio.includes(filterDataInicio.split("-").reverse().join("/")) : true
      const matchDataFim = filterDataFim ? loc.fimPrevisto.includes(filterDataFim.split("-").reverse().join("/")) : true
      return matchLocador && matchDataInicio && matchDataFim
    })
  }, [filterLocador, filterDataInicio, filterDataFim])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'text-blue-600 font-medium';
      case 'Finalizado':
        return 'text-green-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={() => navigate("/estoque/locacoes/nova")} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Nova Locação</Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Locador" 
            value={filterLocador}
            onChange={(e) => setFilterLocador(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
          <Input 
            type="date" 
            value={filterDataInicio}
            onChange={(e) => setFilterDataInicio(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />
          <Input 
            type="date" 
            value={filterDataFim}
            onChange={(e) => setFilterDataFim(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredLocacoes.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Unidade</TableHead>
                <TableHead className="text-center">Início</TableHead>
                <TableHead className="text-center">Fim (Previsto)</TableHead>
                <TableHead className="text-center">Locador</TableHead>
                <TableHead className="text-center">Contrato</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma locação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLocacoes.map((loc) => (
                  <TableRow key={loc.id}>
                    <TableCell className="text-center">{loc.unidade}</TableCell>
                    <TableCell className="text-center">{loc.inicio}</TableCell>
                    <TableCell className="text-center">{loc.fimPrevisto}</TableCell>
                    <TableCell className="text-center">{loc.locador}</TableCell>
                    <TableCell className="text-center">{loc.contrato}</TableCell>
                    <TableCell className="text-center">
                      <span className={getStatusColor(loc.status)}>{loc.status}</span>
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
