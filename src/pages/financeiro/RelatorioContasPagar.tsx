import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function RelatorioContasPagar() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Relatórios</h1>

        <div className="space-y-6 max-w-5xl">
          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Tipo:</label>
              <Select defaultValue="contas-pagar">
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded border border-[#22265B]">
                  <SelectValue placeholder="Contas a Pagar" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="contas-pagar">Contas a Pagar</SelectItem>
                  <SelectItem value="contas-receber">Contas a Receber</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Data:</label>
              <Select defaultValue="vencimento">
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded border border-[#22265B]">
                  <SelectValue placeholder="Data de Vencimento" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="vencimento">Data de Vencimento</SelectItem>
                  <SelectItem value="faturamento">Data de Faturamento</SelectItem>
                  <SelectItem value="lancamento">Data de Lançamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Filtrar por:</label>
              <Select defaultValue="anual">
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded border border-[#22265B]">
                  <SelectValue placeholder="Anual" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="anual">Anual</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-foreground">Ano:</label>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-32 rounded border border-[#22265B]" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-yellow-500" />
              Relacionados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Beneficiário:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="beneficiario1">Beneficiário 1</SelectItem>
                    <SelectItem value="beneficiario2">Beneficiário 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Conta Bancária:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="conta1">Conta 1</SelectItem>
                    <SelectItem value="conta2">Conta 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Categoria:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="cat1">Categoria 1</SelectItem>
                    <SelectItem value="cat2">Categoria 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Sub Categoria:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="subcat1">Sub Categoria 1</SelectItem>
                    <SelectItem value="subcat2">Sub Categoria 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Contábil:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="contabil1">Contábil 1</SelectItem>
                    <SelectItem value="contabil2">Contábil 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Plano de Contas:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="plano1">Plano 1</SelectItem>
                    <SelectItem value="plano2">Plano 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Diretoria:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="diretoria1">Diretoria 1</SelectItem>
                    <SelectItem value="diretoria2">Diretoria 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Gerência:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="gerencia1">Gerência 1</SelectItem>
                    <SelectItem value="gerencia2">Gerência 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Departamento:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="depto1">Departamento 1</SelectItem>
                    <SelectItem value="depto2">Departamento 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Centro de Custo:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="centro1">Centro 1</SelectItem>
                    <SelectItem value="centro2">Centro 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-foreground">Status:</label>
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded border border-[#22265B]">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="aberto">Em Aberto</SelectItem>
                    <SelectItem value="efetuado">Efetuado</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="rounded bg-primary hover:bg-primary/90 text-primary-foreground px-6">
              Gerar
            </Button>
            <Button 
              onClick={() => navigate("/financeiro/contas-pagar")}
              variant="destructive"
              className="rounded px-6"
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}