import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const Relatorio = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Relatório</h1>
        
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Tipo</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Contas a Receber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contas-receber">Contas a Receber</SelectItem>
                <SelectItem value="contas-pagar">Contas a Pagar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Data</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Data de Vencimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vencimento">Data de Vencimento</SelectItem>
                <SelectItem value="pagamento">Data de Pagamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Filtrar por</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Personalizado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personalizado">Personalizado</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Ano</label>
            <Input placeholder="Ano" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Relacionados</h2>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Cliente</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente1">Cliente 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Conta Bancária</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conta1">Conta 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Conta Bancária</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conta1">Conta 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Sub Categoria</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub1">Sub 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Contábil</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contabil1">Contábil 1</SelectItem>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Diretoria</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diretoria1">Diretoria 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Gerência</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gerencia1">Gerência 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Departamento</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dept1">Departamento 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Centro de Receita</label>
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
              <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button size="lg">Gerar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Relatorio