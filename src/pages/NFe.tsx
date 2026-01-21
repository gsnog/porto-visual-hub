import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { FilterSection } from "@/components/FilterSection"
import { TableActions } from "@/components/TableActions"
import { StatusBadge } from "@/components/StatusBadge"

const NFe = () => {
  const navigate = useNavigate()
  const [filterNumero, setFilterNumero] = useState("")
  const [filterData, setFilterData] = useState("")

  const nfes = [
    {
      dataEmissao: "02/06/2025",
      valorTotal: "R$ 99.999,99",
      numero: "99999",
      chaveAcesso: "9999.9999.9999.9999.9999.9999.9999.9999.9999.9999",
      nf: "NFe 12345",
      status: "Autorizada"
    },
    {
      dataEmissao: "10/06/2025", 
      valorTotal: "R$ 1.500,50",
      numero: "10001",
      chaveAcesso: "8888.8888.8888.8888.8888.8888.8888.8888.8888.8888",
      nf: "NFe 67890",
      status: "Cancelada"
    },
    {
      dataEmissao: "15/06/2025",
      valorTotal: "R$ 5.000,00", 
      numero: "10002",
      chaveAcesso: "7777.7777.7777.7777.7777.7777.7777.7777.7777.7777",
      nf: "NFe 54321",
      status: "Em Processamento"
    },
  ]

  const filteredNfes = useMemo(() => {
    return nfes.filter(nfe => {
      const matchNumero = nfe.numero.toLowerCase().includes(filterNumero.toLowerCase())
      const matchData = filterData ? nfe.dataEmissao.includes(filterData.split("-").reverse().join("/")) : true
      return matchNumero && matchData
    })
  }, [filterNumero, filterData])


  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            className="gap-2"
            onClick={() => navigate("/nfe/nova")}
          >
            <Plus className="w-4 h-4" />
            Nova NF-e
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
              label: "Número NF-e",
              placeholder: "Buscar número...",
              value: filterNumero,
              onChange: setFilterNumero,
              width: "flex-1 min-w-[200px]"
            },
            {
              type: "date",
              label: "Data Emissão",
              value: filterData,
              onChange: setFilterData,
              width: "min-w-[160px]"
            }
          ]}
          resultsCount={filteredNfes.length}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Data Emissão</TableHead>
              <TableHead className="text-center">Número</TableHead>
              <TableHead className="text-center">NF</TableHead>
              <TableHead className="text-center">Valor Total</TableHead>
              <TableHead className="text-center">Chave de Acesso</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNfes.map((nfe, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{nfe.dataEmissao}</TableCell>
                <TableCell className="text-center">{nfe.numero}</TableCell>
                <TableCell className="text-center">{nfe.nf}</TableCell>
                <TableCell className="text-center font-semibold">{nfe.valorTotal}</TableCell>
                <TableCell className="text-center text-xs">{nfe.chaveAcesso}</TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={nfe.status} />
                </TableCell>
                <TableCell className="text-center">
                  <TableActions 
                    onView={() => console.log('View', nfe.numero)}
                    onEdit={() => console.log('Download XML', nfe.numero)}
                    onDelete={() => console.log('Delete', nfe.numero)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default NFe