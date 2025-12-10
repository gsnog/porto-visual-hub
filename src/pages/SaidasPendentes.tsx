import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "lucide-react"

const SaidasPendentes = () => {
  const saidas = [
    {
      dataLancamento: "02/06/2025",
      beneficiario: "05/06/2025",
      cnpjBeneficiario: "11.111.111/1111-11",
      documento: "NI",
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      dataFaturamento: "22/22/2222",
      dataVencimento: "22/22/2222",
      dataPagamento: "22/22/2222",
      formaPagamento: "0",
      valorTotal: "R$ 1.500,00",
      acoes: "Ações"
    }
  ]

  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Saídas Pendentes</h1>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button className="rounded-lg">Adicionar</Button>
          <Button className="rounded-lg" variant="outline">Relatório</Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input placeholder="Beneficiário" className="rounded-lg" />
          <Input placeholder="Documento" className="rounded-lg" />
          <Input placeholder="Valor" className="rounded-lg" />
        </div>

        {/* Date Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Input placeholder="DD/MM/AAAA" className="rounded-lg" />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="relative">
            <Input placeholder="DD/MM/AAAA" className="rounded-lg" />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div></div>
          <Button className="rounded-lg">Filtrar</Button>
        </div>
      </div>

      {/* Pending Outputs Table */}
      <Card>
        <CardContent className="p-0">
          <Table className="table-custom">
            <TableHeader>
              <TableRow className="border-b bg-muted/50">
                <TableHead className="text-xs text-center">Data de Lançamento</TableHead>
                <TableHead className="text-xs text-center">Beneficiário</TableHead>
                <TableHead className="text-xs text-center">CNPJ do Beneficiário</TableHead>
                <TableHead className="text-xs text-center">Documento</TableHead>
                <TableHead className="text-xs text-center">Valor do Título</TableHead>
                <TableHead className="text-xs text-center">Multa</TableHead>
                <TableHead className="text-xs text-center">Frete</TableHead>
                <TableHead className="text-xs text-center">Desconto</TableHead>
                <TableHead className="text-xs text-center">Data de Faturamento</TableHead>
                <TableHead className="text-xs text-center">Data de Vencimento</TableHead>
                <TableHead className="text-xs text-center">Data de Pagamento</TableHead>
                <TableHead className="text-xs text-center">Forma de Pagamento</TableHead>
                <TableHead className="text-xs text-center">Valor Total</TableHead>
                <TableHead className="text-xs text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saidas.map((saida, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}>
                  <TableCell className="text-center text-sm">{saida.dataLancamento}</TableCell>
                  <TableCell className="text-center text-sm">{saida.beneficiario}</TableCell>
                  <TableCell className="text-center text-sm">{saida.cnpjBeneficiario}</TableCell>
                  <TableCell className="text-center text-sm">{saida.documento}</TableCell>
                  <TableCell className="text-center text-sm">{saida.valorTitulo}</TableCell>
                  <TableCell className="text-center text-sm">{saida.multa}</TableCell>
                  <TableCell className="text-center text-sm">{saida.frete}</TableCell>
                  <TableCell className="text-center text-sm">{saida.desconto}</TableCell>
                  <TableCell className="text-center text-sm">{saida.dataFaturamento}</TableCell>
                  <TableCell className="text-center text-sm">{saida.dataVencimento}</TableCell>
                  <TableCell className="text-center text-sm">{saida.dataPagamento}</TableCell>
                  <TableCell className="text-center text-sm">{saida.formaPagamento}</TableCell>
                  <TableCell className="text-center text-sm">{saida.valorTotal}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" className="rounded-lg text-xs">Ações</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default SaidasPendentes