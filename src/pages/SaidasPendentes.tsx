import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

const SaidasPendentes = () => {
  const saidas = [
    { dataLancamento: "02/06/2025", beneficiario: "05/06/2025", documento: "NI", valorTitulo: "R$ 1.500,00", valorTotal: "R$ 1.500,00", acoes: "Ações" }
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Adicionar</Button>
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Relatório</Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input placeholder="Beneficiário" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-52 rounded-lg" />
          <Input placeholder="Documento" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-52 rounded-lg" />
          <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Data Lançamento</TableHead>
                <TableHead className="text-center">Beneficiário</TableHead>
                <TableHead className="text-center">Documento</TableHead>
                <TableHead className="text-center">Valor Título</TableHead>
                <TableHead className="text-center">Valor Total</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saidas.map((saida, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{saida.dataLancamento}</TableCell>
                  <TableCell className="text-center">{saida.beneficiario}</TableCell>
                  <TableCell className="text-center">{saida.documento}</TableCell>
                  <TableCell className="text-center">{saida.valorTitulo}</TableCell>
                  <TableCell className="text-center">{saida.valorTotal}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">Ações</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default SaidasPendentes