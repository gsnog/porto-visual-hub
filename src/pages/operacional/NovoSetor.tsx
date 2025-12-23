import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

const NovoSetor = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Setor</h1>
        
        <div className="max-w-2xl space-y-6">
          <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
            <Label className="text-sm font-medium text-foreground pt-2">Nome:</Label>
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
              onClick={() => navigate("/operacional/setor")}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NovoSetor
