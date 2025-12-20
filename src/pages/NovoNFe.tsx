import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const NovoNFe = () => {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Nova NF-e</h1>
        
        <div className="max-w-2xl space-y-6">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Número</Label>
            <Input placeholder="Número da NF-e" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <Label className="text-sm font-medium text-foreground">Documento PDF</Label>
            </div>
            <div>
              <Button className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Escolher Ficheiro</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <Label className="text-sm font-medium text-foreground">Documento XML</Label>
            </div>
            <div>
              <Button className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Escolher Ficheiro</Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Valor Total</Label>
            <Input placeholder="R$ 0,00" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Data de Faturamento</Label>
            <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg" />
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Gerar</Button>
            <Button variant="outline" className="rounded-lg border-primary text-primary hover:bg-primary/10">Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NovoNFe