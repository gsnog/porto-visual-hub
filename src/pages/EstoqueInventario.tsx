import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"

const mockInventario = [
  { id: 1, item: "Parafuso M8", quantidade: 250, unidade: "Almoxarifado SP" },
  { id: 2, item: "Cabo HDMI", quantidade: 8, unidade: "TI Central" },
  { id: 3, item: "Óleo Lubrificante", quantidade: 4, unidade: "Manutenção" },
  { id: 4, item: "Papel A4", quantidade: 50, unidade: "Almoxarifado SP" },
  { id: 5, item: "Toner HP", quantidade: 3, unidade: "TI Central" },
]

export default function EstoqueInventario() {
  const [filterNome, setFilterNome] = useState("")
  const [filterCidade, setFilterCidade] = useState("")

  const filteredInventario = useMemo(() => {
    return mockInventario.filter(item => {
      const matchNome = item.item.toLowerCase().includes(filterNome.toLowerCase())
      const matchCidade = filterCidade && filterCidade !== "todos" 
        ? item.unidade.toLowerCase().includes(filterCidade.toLowerCase()) 
        : true
      return matchNome && matchCidade
    })
  }, [filterNome, filterCidade])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
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
              type: "select",
              label: "Cidade",
              placeholder: "Selecione...",
              value: filterCidade,
              onChange: setFilterCidade,
              options: [
                { value: "todos", label: "Todos" },
                { value: "sp", label: "São Paulo" },
                { value: "rj", label: "Rio de Janeiro" },
                { value: "central", label: "Central" }
              ],
              width: "min-w-[180px]"
            }
          ]}
          resultsCount={filteredInventario.length}
        />

        <div className="rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-center">Unidade</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredInventario.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Nenhum item encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventario.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.item}</TableCell>
                    <TableCell className="text-center">{item.quantidade}</TableCell>
                    <TableCell className="text-center">{item.unidade}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', item.id)}
                        onEdit={() => console.log('Edit', item.id)}
                        onDelete={() => console.log('Delete', item.id)}
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