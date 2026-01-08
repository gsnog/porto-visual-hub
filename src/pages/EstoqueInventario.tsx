import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useState, useMemo } from "react"

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
        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Nome do Item" 
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />

          <Select value={filterCidade} onValueChange={setFilterCidade}>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-64 rounded-lg">
              <SelectValue placeholder="Cidade" className="!text-[#22265B]" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="sp">São Paulo</SelectItem>
              <SelectItem value="rj">Rio de Janeiro</SelectItem>
              <SelectItem value="central">Central</SelectItem>
            </SelectContent>
          </Select>

          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredInventario.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
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
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        Ações
                      </Button>
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
