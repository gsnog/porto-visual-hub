import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const Relatorio = () => {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Tipo</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                <SelectValue placeholder="Contas a Receber" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="contas-receber">Contas a Receber</SelectItem>
                <SelectItem value="contas-pagar">Contas a Pagar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Data</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                <SelectValue placeholder="Data de Vencimento" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="vencimento">Data de Vencimento</SelectItem>
                <SelectItem value="pagamento">Data de Pagamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Filtrar por</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                <SelectValue placeholder="Personalizado" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="personalizado">Personalizado</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Ano</label>
            <Input 
              placeholder="Ano" 
              className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" 
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground">Relacionados</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Cliente</label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="cliente1">Cliente 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Conta Bancária</label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="conta1">Conta 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Sub Categoria</label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="sub1">Sub 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Contábil</label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="contabil1">Contábil 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Plano de Contas</label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="plano1">Plano 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Centro de Receita</label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="centro1">Centro 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground">
              Gerar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relatorio