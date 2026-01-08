import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

export default function NovaSaida() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/estoque/saidas")
  }

  const handleCancelar = () => {
    navigate("/estoque/saidas")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Saída</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Data</label>
            <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Estoque de Origem</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="origem1">Estoque 1</SelectItem>
                    <SelectItem value="origem2">Estoque 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                  Adicionar
                </Button>
              </div>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Setor</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="setor1">Setor 1</SelectItem>
                    <SelectItem value="setor2">Setor 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                  Adicionar
                </Button>
              </div>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Operação</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="consumo">Consumo</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Item</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="item1">Item 1</SelectItem>
                  <SelectItem value="item2">Item 2</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Quantidade</label>
            <div className="flex-1">
              <Input type="number" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Estoque de Destino</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="destino1">Estoque 1</SelectItem>
                  <SelectItem value="destino2">Estoque 2</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSalvar}
              className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              Salvar
            </Button>
            <Button 
              onClick={handleCancelar}
              variant="destructive"
              className="rounded-lg px-6"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
