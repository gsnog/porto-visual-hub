import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const FluxoCaixa = () => {
  const transacoes = [
    {
      dataVencimento: "02/06/2025",
      dataPagamento: "02/06/2025", 
      beneficiario: "ABEEMAR",
      cnpj: "99.999.999/9999-99",
      status: "Pendente",
      valorTotal: "R$ 99.999,99",
      saldo: "R$ 99.999,99"
    },
    {
      dataVencimento: "02/06/2025",
      dataPagamento: "02/06/2025",
      beneficiario: "ABEEMAR", 
      cnpj: "99.999.999/9999-99",
      status: "Pendente",
      valorTotal: "R$ 99.999,99",
      saldo: "R$ 99.999,99"
    },
    {
      dataVencimento: "02/06/2025",
      dataPagamento: "02/06/2025",
      beneficiario: "ABEEMAR",
      cnpj: "99.999.999/9999-99", 
      status: "Pendente",
      valorTotal: "R$ 99.999,99",
      saldo: "R$ 99.999,99"
    },
    {
      dataVencimento: "02/06/2025",
      dataPagamento: "02/06/2025",
      beneficiario: "ABEEMAR",
      cnpj: "99.999.999/9999-99",
      status: "Pendente", 
      valorTotal: "R$ 99.999,99",
      saldo: "R$ 99.999,99"
    },
    {
      dataVencimento: "02/06/2025",
      dataPagamento: "02/06/2025",
      beneficiario: "ABEEMAR",
      cnpj: "99.999.999/9999-99",
      status: "Pendente",
      valorTotal: "R$ 99.999,99", 
      saldo: "R$ 99.999,99"
    }
  ]

  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Fluxo de Caixa</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-success border-success">
            <CardContent className="p-6">
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-2">Total de Entradas</h3>
                <p className="text-2xl font-bold">R$ 87.939,88</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-destructive border-destructive">
            <CardContent className="p-6">
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-2">Total de Saídas</h3>
                <p className="text-2xl font-bold">R$ 0,00</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary border-primary">
            <CardContent className="p-6">
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-2">Saldo</h3>
                <p className="text-2xl font-bold">R$ 87.939,88</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="mb-6">Relatório</Button>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full">
                <SelectValue placeholder="Tipo"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Input placeholder="Ano" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-full"/>
          </div>
          <Button className="rounded-full">Filtrar</Button>
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Transações</h2>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/50">
                  <TableHead className="text-center">Data de Vencimento</TableHead>
                  <TableHead className="text-center">Data de Pagamento</TableHead>
                  <TableHead className="text-center">Beneficiário/Cliente</TableHead>
                  <TableHead className="text-center">CNPJ</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Valor Total</TableHead>
                  <TableHead className="text-center">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transacoes.map((transacao, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}>
                    <TableCell className="text-center">{transacao.dataVencimento}</TableCell>
                    <TableCell className="text-center">{transacao.dataPagamento}</TableCell>
                    <TableCell className="text-center">{transacao.beneficiario}</TableCell>
                    <TableCell className="text-center">{transacao.cnpj}</TableCell>
                    <TableCell className="text-center">{transacao.status}</TableCell>
                    <TableCell className="text-center">{transacao.valorTotal}</TableCell>
                    <TableCell className="text-center">{transacao.saldo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FluxoCaixa