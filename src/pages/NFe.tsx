import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "lucide-react"

const NFe = () => {
  const nfes = [
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99",
      numero: "99999",
      xml: "99.999.999/9999-99",
      nf: "999999"
    },
    {
      dataEmissao: "02/06/2025", 
      valorTotal: "R$ 99.999,99",
      numero: "99999",
      xml: "99.999.999/9999-99",
      nf: "999999"
    },
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99", 
      numero: "99999",
      xml: "99.999.999/9999-99",
      nf: "999999"
    },
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99",
      numero: "99999", 
      xml: "99.999.999/9999-99",
      nf: "999999"
    },
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99",
      numero: "99999",
      xml: "99.999.999/9999-99", 
      nf: "999999"
    },
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99",
      numero: "99999",
      xml: "99.999.999/9999-99",
      nf: "999999"
    },
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99",
      numero: "99999",
      xml: "99.999.999/9999-99",
      nf: "999999"
    },
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99", 
      numero: "99999",
      xml: "99.999.999/9999-99",
      nf: "999999"
    }
  ]

  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">NF-e</h1>
        
        <Button className="mb-6">Nova NF-e</Button>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input placeholder="Número NF-e" />
          <div className="relative">
            <Input placeholder="DD/MM/AAAA" />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button>Filtrar</Button>
        </div>
      </div>

      {/* NFe Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-muted/50">
                <TableHead className="text-center">Data de Emissão</TableHead>
                <TableHead className="text-center">Valor Total</TableHead>
                <TableHead className="text-center">Número</TableHead>
                <TableHead className="text-center">XML</TableHead>
                <TableHead className="text-center">NF</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nfes.map((nfe, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-muted/20" : "bg-background"}>
                  <TableCell className="text-center">{nfe.dataEmissao}</TableCell>
                  <TableCell className="text-center">{nfe.valorTotal}</TableCell>
                  <TableCell className="text-center">{nfe.numero}</TableCell>
                  <TableCell className="text-center">{nfe.xml}</TableCell>
                  <TableCell className="text-center">{nfe.nf}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm">Ações</Button>
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

export default NFe