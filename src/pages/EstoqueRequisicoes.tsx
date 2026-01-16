import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { Plus, FileText } from "lucide-react"
import { TableActions } from "@/components/TableActions"

const mockRequisicoes = [
  { id: 1, data: "12/05/2025", item: "Cabo HDMI", quantidade: 1, requisitante: "Ana F.", setor: "TI", status: "Aprovada" },
  { id: 2, data: "10/05/2025", item: "Papel A4", quantidade: 5, requisitante: "Carlos M.", setor: "Administrativo", status: "Pendente" },
  { id: 3, data: "08/05/2025", item: "Toner HP", quantidade: 2, requisitante: "Pedro S.", setor: "TI", status: "Aprovada" },
  { id: 4, data: "05/05/2025", item: "Parafuso M8", quantidade: 50, requisitante: "Lucas V.", setor: "Produção", status: "Rejeitada" },
]

export default function EstoqueRequisicoes() {
  const navigate = useNavigate()
  const [filterSetor, setFilterSetor] = useState("")
  const [filterDataInicio, setFilterDataInicio] = useState("")
  const [filterDataFim, setFilterDataFim] = useState("")

  const filteredRequisicoes = useMemo(() => {
    return mockRequisicoes.filter(req => {
      const matchSetor = filterSetor && filterSetor !== "todos" 
        ? req.setor.toLowerCase().includes(filterSetor.toLowerCase()) 
        : true
      const matchDataInicio = filterDataInicio ? req.data >= filterDataInicio.split("-").reverse().join("/") : true
      const matchDataFim = filterDataFim ? req.data <= filterDataFim.split("-").reverse().join("/") : true
      return matchSetor && matchDataInicio && matchDataFim
    })
  }, [filterSetor, filterDataInicio, filterDataFim])

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
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={() => navigate("/estoque/requisicoes/nova")} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
          <Button variant="outline" className="gap-2 border-border">
            <FileText className="w-4 h-4" />
            Relatório
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Item",
              placeholder: "Buscar item...",
              value: "",
              onChange: () => {},
              width: "flex-1 min-w-[200px]"
            },
            {
              type: "select",
              label: "Setor",
              placeholder: "Selecione o setor",
              value: filterSetor,
              onChange: setFilterSetor,
              options: [
                { value: "todos", label: "Todos" },
                { value: "ti", label: "TI" },
                { value: "producao", label: "Produção" },
                { value: "administrativo", label: "Administrativo" }
              ],
              width: "min-w-[180px]"
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
          resultsCount={filteredRequisicoes.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
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
                      <TableActions 
                        onView={() => console.log('View', req.id)}
                        onEdit={() => console.log('Edit', req.id)}
                        onDelete={() => console.log('Delete', req.id)}
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
