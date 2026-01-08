import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const NovaEmbarcacao = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/operacional/embarcacoes");
  };

  const handleCancelar = () => {
    navigate("/operacional/embarcacoes");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Embarcação</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Nome</label>
            <div className="flex-1">
              <Input 
                placeholder="" 
                className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
              />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Setores</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-52 border border-[#22265B]">
                    <SelectValue placeholder="Selecionar Setores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="setor1">Setor 1</SelectItem>
                    <SelectItem value="setor2">Setor 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                  onClick={() => navigate("/operacional/setor/novo")}
                >
                  Adicionar
                </Button>
              </div>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Cliente</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente1">Cliente 1</SelectItem>
                    <SelectItem value="cliente2">Cliente 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                  onClick={() => navigate("/cadastro/financeiro/clientes/novo")}
                >
                  Adicionar
                </Button>
              </div>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Dimensões</label>
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

export default NovaEmbarcacao;
