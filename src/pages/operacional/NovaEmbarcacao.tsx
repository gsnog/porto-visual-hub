import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

const NovaEmbarcacao = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Embarcação</h1>
        
        <div className="max-w-2xl space-y-6">
          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Nome</Label>
            <div>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg" />
              <span className="text-xs text-muted-foreground">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Setores</Label>
            <div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="bg-primary text-primary-foreground h-10 rounded-lg w-48">
                    <SelectValue placeholder="Selecionar Setores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="setor1">Setor 1</SelectItem>
                    <SelectItem value="setor2">Setor 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => navigate("/operacional/setor/novo")}
                >
                  Adicionar Setor
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Cliente</Label>
            <div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 rounded-lg w-32">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente1">Cliente 1</SelectItem>
                    <SelectItem value="cliente2">Cliente 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => navigate("/cadastro/financeiro/clientes/novo")}
                >
                  Adicionar Cliente
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Dimensões</Label>
            <div>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg" />
              <span className="text-xs text-muted-foreground">Obrigatório</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Salvar</Button>
            <Button 
              variant="outline" 
              className="rounded-lg border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/operacional/embarcacoes")}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NovaEmbarcacao
