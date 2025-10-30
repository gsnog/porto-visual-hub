import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ContasPagar = () => {
  const contas = [
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025", 
      proximoVencimento: "-",
      beneficiario: "Pedro Piaes",
      documento: "NI",
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 1.500,00",
      valorPago: "R$ 0,00",
      totalParcelas: "0",
      parcelas: "0",
      valorParcela: "R$ 1.500,00",
      acoes: "Açoes"
    },
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025",
      proximoVencimento: "-", 
      beneficiario: "Pedro Piaes",
      documento: "NI",
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 1.500,00",
      valorPago: "R$ 0,00",
      totalParcelas: "0",
      parcelas: "0", 
      valorParcela: "R$ 1.500,00",
      acoes: "Açoes"
    },
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025",
      proximoVencimento: "-",
      beneficiario: "Pedro Piaes", 
      documento: "NI",
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 1.500,00",
      valorPago: "R$ 0,00",
      totalParcelas: "0",
      parcelas: "0",
      valorParcela: "R$ 1.500,00",
      acoes: "Açoes"
    },
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025",
      proximoVencimento: "-",
      beneficiario: "Pedro Piaes",
      documento: "NI", 
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 1.500,00",
      valorPago: "R$ 0,00",
      totalParcelas: "0",
      parcelas: "0",
      valorParcela: "R$ 1.500,00",
      acoes: "Açoes"
    },
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025",
      proximoVencimento: "-",
      beneficiario: "Pedro Piaes",
      documento: "NI",
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00", 
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 1.500,00",
      valorPago: "R$ 0,00",
      totalParcelas: "0",
      parcelas: "0",
      valorParcela: "R$ 1.500,00",
      acoes: "Açoes"
    },
    {
      dataLancamento: "02/06/2025",
      dataFaturamento: "05/06/2025",
      proximoVencimento: "-",
      beneficiario: "Pedro Piaes",
      documento: "NI",
      valorTitulo: "R$ 1.500,00",
      multa: "R$ 0,00",
      frete: "R$ 0,00",
      desconto: "R$ 0,00",
      valorTotal: "R$ 1.500,00",
      valorPago: "R$ 0,00", 
      totalParcelas: "0",
      parcelas: "0",
      valorParcela: "R$ 1.500,00",
      acoes: "Açoes"
    }
  ]

  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Contas a Pagar</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-success border-success rounded-xl">
            <CardContent className="p-6">
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-2">Total Pago</h3>
                <p className="text-2xl font-bold">R$ 87.939,88</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-destructive border-destructive rounded-xl">
            <CardContent className="p-6">
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-2">Total a Pagar</h3>
                <p className="text-2xl font-bold">R$ 0,00</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary border-primary rounded-xl">
            <CardContent className="p-6">
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-2">Valor Total em Títulos</h3>
                <p className="text-2xl font-bold">R$ 87.939,88</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button className="rounded-full">Adicionar</Button>
          <Button className="rounded-full" variant="outline">Pendentes (0)</Button>
          <Button className="rounded-full" variant="outline">Relatório</Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <Input placeholder="Beneficiário" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full" />
          <Input placeholder="Documento" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full" />
          <Input placeholder="Valor" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full" />
          <Button className="rounded-full">Filtrar</Button>
        </div>
      </div>

      {/* Accounts Table */}
      <Card>
        <CardContent className="p-0">
          <Table className="table-custom">
            <TableHeader>
              <TableRow className="border-b bg-muted/50">
                <TableHead className="text-xs text-center">Data de Lançamento</TableHead>
                <TableHead className="text-xs text-center">Data de Faturamento</TableHead>
                <TableHead className="text-xs text-center">Próximo Vencimento</TableHead>
                <TableHead className="text-xs text-center">Beneficiário</TableHead>
                <TableHead className="text-xs text-center">Documento</TableHead>
                <TableHead className="text-xs text-center">Valor do Título</TableHead>
                <TableHead className="text-xs text-center">Multa</TableHead>
                <TableHead className="text-xs text-center">Frete</TableHead>
                <TableHead className="text-xs text-center">Desconto</TableHead>
                <TableHead className="text-xs text-center">Valor Total</TableHead>
                <TableHead className="text-xs text-center">Valor Pago</TableHead>
                <TableHead className="text-xs text-center">Total de Parcelas</TableHead>
                <TableHead className="text-xs text-center">Parcelas Pagas</TableHead>
                <TableHead className="text-xs text-center">Valor da Parcela</TableHead>
                <TableHead className="text-xs text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contas.map((conta, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}>
                  <TableCell className="text-center text-sm">{conta.dataLancamento}</TableCell>
                  <TableCell className="text-center text-sm">{conta.dataFaturamento}</TableCell>
                  <TableCell className="text-center text-sm">{conta.proximoVencimento}</TableCell>
                  <TableCell className="text-center text-sm">{conta.beneficiario}</TableCell>
                  <TableCell className="text-center text-sm">{conta.documento}</TableCell>
                  <TableCell className="text-center text-sm">{conta.valorTitulo}</TableCell>
                  <TableCell className="text-center text-sm">{conta.multa}</TableCell>
                  <TableCell className="text-center text-sm">{conta.frete}</TableCell>
                  <TableCell className="text-center text-sm">{conta.desconto}</TableCell>
                  <TableCell className="text-center text-sm">{conta.valorTotal}</TableCell>
                  <TableCell className="text-center text-sm">{conta.valorPago}</TableCell>
                  <TableCell className="text-center text-sm">{conta.totalParcelas}</TableCell>
                  <TableCell className="text-center text-sm">{conta.parcelas}</TableCell>
                  <TableCell className="text-center text-sm">{conta.valorParcela}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" className="rounded-full text-xs">Ações</Button>
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

export default ContasPagar