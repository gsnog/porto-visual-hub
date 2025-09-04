import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"

const LancamentoSaida = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Lançamento de Saída</h1>
        
        <Card>
          <CardContent className="p-8 space-y-6">
            {/* Beneficiário */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Beneficiário</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beneficiario1">Beneficiário 1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Centro de Custo e Plano de Contas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Centro de Custo</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro1">Centro 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Plano de Contas</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plano1">Plano 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Primeira linha de valores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Input placeholder="Documento" />
              </div>
              <div>
                <Input placeholder="Valor do Título" />
              </div>
              <div>
                <Input placeholder="Multa" />
              </div>
            </div>

            {/* Segunda linha de valores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Input placeholder="Encargos" />
              </div>
              <div>
                <Input placeholder="Juros" />
              </div>
              <div>
                <Input placeholder="Desconto" />
              </div>
            </div>

            {/* Valor Total */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input placeholder="Valor Total" />
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Data de Faturamento</label>
                <div className="relative">
                  <Input placeholder="DD/MM/AAAA" />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Data de Vencimento</label>
                <div className="relative">
                  <Input placeholder="DD/MM/AAAA" />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Documento PDF */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Documento PDF</label>
              </div>
              <div>
                <Button className="w-full">Escolher Ficheiro</Button>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <Textarea placeholder="Descrição" className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LancamentoSaida