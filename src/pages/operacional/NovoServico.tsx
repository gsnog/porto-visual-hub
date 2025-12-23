import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"

const NovoServico = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Serviço</h1>
        
        <div className="max-w-2xl space-y-6">
          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Nome:</Label>
            <div>
              <Input className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg" />
              <span className="text-xs text-muted-foreground">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Descrição:</Label>
            <div>
              <Textarea 
                className="bg-white !text-[#22265B] min-h-[200px] px-3 py-2 rounded-lg border border-border resize-none" 
              />
              <span className="text-xs text-muted-foreground">Obrigatório</span>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Valor:</Label>
            <div>
              <Input defaultValue="0" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg" />
              <span className="text-xs text-muted-foreground">Obrigatório</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Salvar</Button>
            <Button 
              variant="outline" 
              className="rounded-lg border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/operacional/servicos")}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NovoServico
