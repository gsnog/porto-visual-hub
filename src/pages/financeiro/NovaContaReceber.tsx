import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

export default function NovaContaReceber() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    navigate("/financeiro/contas-receber")
  }

  const handleCancelar = () => {
    navigate("/financeiro/contas-receber")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Lançamento Conta a Receber</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Cliente</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="cliente1">Cliente 1</SelectItem>
                  <SelectItem value="cliente2">Cliente 2</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Centro de Receita</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg flex-1 border border-[#22265B]">
                <SelectValue placeholder="---- Selecione ----" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="centro1">Centro 1</SelectItem>
                <SelectItem value="centro2">Centro 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Plano de Contas</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-52 border border-[#22265B]">
                <SelectValue placeholder="---- Selecione ----" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="plano1">Plano 1</SelectItem>
                <SelectItem value="plano2">Plano 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Documento</label>
            <div className="flex-1">
              <Input type="text" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Valor do Título</label>
            <div className="flex-1">
              <Input type="text" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Multa</label>
            <div className="flex-1">
              <Input type="number" defaultValue="0" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Opcional</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Encargos</label>
            <Input type="number" defaultValue="0" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Juros</label>
            <Input type="number" defaultValue="0" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Desconto</label>
            <div className="flex-1">
              <Input type="number" defaultValue="0" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Opcional</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Valor Total</label>
            <Input type="text" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Data de Faturamento</label>
            <div className="flex-1">
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Data de Vencimento</label>
            <div className="flex-1">
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Documento PDF</label>
            <Input type="file" accept=".pdf" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>

          <div className="flex items-start gap-8">
            <label className="text-foreground font-medium w-40 pt-2">Descrição</label>
            <div className="flex-1">
              <Textarea className="bg-[#efefef] !text-[#22265B] px-3 rounded-lg border border-[#22265B] w-80 min-h-[120px]" />
              <span className="text-muted-foreground text-sm mt-1 block">Opcional</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Número de Parcelas</label>
            <div className="flex-1">
              <Input type="number" defaultValue="1" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-40" />
              <span className="text-muted-foreground text-sm mt-1 block">Informe o número de Parcelas</span>
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
