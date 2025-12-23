import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const NovoPlanoContas = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    // TODO: Implementar lógica de salvar
    navigate("/cadastro/financeiro/plano-contas");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/plano-contas");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Plano de Contas</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-32">Categoria</label>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-32 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat1">Categoria 1</SelectItem>
                  <SelectItem value="cat2">Categoria 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                Adicionar Categoria
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-32">Subcategoria</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-32 border border-[#22265B]">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sub1">Subcategoria 1</SelectItem>
                    <SelectItem value="sub2">Subcategoria 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                  Adicionar Subcategoria
                </Button>
              </div>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-32">Contábil</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-32 border border-[#22265B]">
                    <SelectValue placeholder="---------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cont1">Contábil 1</SelectItem>
                    <SelectItem value="cont2">Contábil 2</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                  Adicionar Contábil
                </Button>
              </div>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-32">ID</label>
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

export default NovoPlanoContas;
