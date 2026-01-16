import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus } from "lucide-react"
import { TableActions } from "@/components/TableActions"

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
      const matchDataInicio = filterDataInicio ? loc.inicio >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? loc.fimPrevisto <= filterDataFim.split("-").reverse().join("/") : true
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
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/locacoes/nova")} className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Locação
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Locador",
              placeholder: "Buscar locador...",
              value: filterLocador,
              onChange: setFilterLocador,
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
          resultsCount={filteredLocacoes.length}
        />

        <Table>
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
                    <TableActions 
                      onView={() => console.log('View', loc.id)}
                      onEdit={() => console.log('Edit', loc.id)}
                      onDelete={() => console.log('Delete', loc.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
