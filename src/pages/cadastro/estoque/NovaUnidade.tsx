import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const NovaUnidade = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    // TODO: Implementar lógica de salvar
    navigate("/cadastro/estoque/unidades");
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/unidades");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Unidade</h1>

        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Nome do Unidade</label>
            <div className="flex-1">
              <Input 
                placeholder="" 
                className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
              />
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
  );
};

export default NovaUnidade;
