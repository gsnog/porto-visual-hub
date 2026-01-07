import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const LancamentoSaida = () => {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="max-w-4xl space-y-6">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Beneficiário</Label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                <SelectValue placeholder="Selecione o beneficiário" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="beneficiario1">Beneficiário 1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Centro de Custo</Label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="centro1">Centro 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Plano de Contas</Label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="plano1">Plano 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Documento</Label>
              <Input placeholder="Documento" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Valor do Título</Label>
              <Input placeholder="R$ 0,00" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Multa</Label>
              <Input placeholder="R$ 0,00" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Encargos</Label>
              <Input placeholder="R$ 0,00" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Juros</Label>
              <Input placeholder="R$ 0,00" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Desconto</Label>
              <Input placeholder="R$ 0,00" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Valor Total</Label>
              <Input placeholder="R$ 0,00" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Data de Faturamento</Label>
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Data de Vencimento</Label>
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Documento PDF</Label>
            </div>
            <div>
              <Button className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Escolher Ficheiro</Button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Descrição</Label>
            <Textarea placeholder="Descrição" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 min-h-[100px] px-3 rounded-lg" />
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Salvar</Button>
            <Button variant="outline" className="rounded-lg border-primary text-primary hover:bg-primary/10">Cancelar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LancamentoSaida