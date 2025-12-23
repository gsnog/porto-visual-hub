import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

const NovaOperacao = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Operação</h1>
        
        <div className="max-w-3xl space-y-6">
          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Data de Entrada</Label>
            <div>
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-48" />
              <span className="text-xs text-muted-foreground block mt-1">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Embarcação</Label>
            <div>
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 rounded-lg w-32">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="embarcacao1">Embarcação 1</SelectItem>
                  <SelectItem value="embarcacao2">Embarcação 2</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground block mt-1">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Previsão de Entrega</Label>
            <div>
              <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-48" />
              <span className="text-xs text-muted-foreground block mt-1">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Serviço:</Label>
            <div className="space-y-2">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 rounded-lg w-64">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="servico1">Serviço 1</SelectItem>
                  <SelectItem value="servico2">Serviço 2</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                size="sm"
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate("/operacional/servicos/novo")}
              >
                Adicionar Serviço
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Setor:</Label>
            <div className="space-y-2">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 rounded-lg w-64">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="setor1">Setor 1</SelectItem>
                  <SelectItem value="setor2">Setor 2</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                size="sm"
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate("/operacional/setor/novo")}
              >
                Adicionar Setor
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Data de Início:</Label>
            <Input type="date" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-48" />
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Desconto:</Label>
            <Input defaultValue="R$ 0,00" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-64" />
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Valor Adicional:</Label>
            <Input defaultValue="R$ 0,00" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-64" />
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="rounded-lg border-border text-foreground hover:bg-muted">
              Adicionar Serviço
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Serviços e Setores</h2>
            <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                    <TableHead className="!text-white font-medium text-center">Serviço</TableHead>
                    <TableHead className="!text-white font-medium text-center">Setor</TableHead>
                    <TableHead className="!text-white font-medium text-center">Data de Início</TableHead>
                    <TableHead className="!text-white font-medium text-center">Desconto</TableHead>
                    <TableHead className="!text-white font-medium text-center">Valor Adicional</TableHead>
                    <TableHead className="!text-white font-medium text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-white text-black">
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Nenhum serviço adicionado.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Salvar</Button>
            <Button 
              variant="outline" 
              className="rounded-lg border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/operacional/operacao")}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NovaOperacao
