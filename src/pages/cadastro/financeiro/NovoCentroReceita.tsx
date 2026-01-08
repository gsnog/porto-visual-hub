import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const NovoCentroReceita = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    // TODO: Implementar lógica de salvar
    navigate("/cadastro/financeiro/centro-receita");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/centro-receita");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Centro de Receita</h1>

        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Diretoria</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dir1">Diretoria 1</SelectItem>
                    <SelectItem value="dir2">Diretoria 2</SelectItem>
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
            <label className="text-foreground font-medium w-40">Gerência</label>
            <Input 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Departamento</label>
            <Input 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
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
  );
};

export default NovoCentroReceita;
