import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "lucide-react"

const NovoNFe = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Nova NF-e</h1>
        
        <Card className="max-w-2xl">
          <CardContent className="p-8 space-y-8">
            {/* Número */}
            <div>
              <Input placeholder="Número" className="w-full" />
            </div>

            {/* Documento PDF */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <label className="text-lg font-medium text-foreground">Documento PDF</label>
              </div>
              <div>
                <Button className="w-full">Escolher Ficheiro</Button>
              </div>
            </div>

            {/* Documento XML */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <label className="text-lg font-medium text-foreground">Documento XML</label>
              </div>
              <div>
                <Button className="w-full">Escolher Ficheiro</Button>
              </div>
            </div>

            {/* Valor Total */}
            <div>
              <Input placeholder="Valor Total" className="w-full" />
            </div>

            {/* Data de Faturamento */}
            <div>
              <label className="text-lg font-medium text-foreground mb-4 block">Data de Faturamento</label>
              <div className="relative">
                <Input placeholder="DD/MM/AAAA" className="w-full" />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1">Gerar</Button>
              <Button variant="outline" className="flex-1">Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NovoNFe