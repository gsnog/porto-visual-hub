import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const NovoItem = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    // TODO: Implementar lógica de salvar
    navigate("/cadastro/estoque/itens");
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/itens");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Item</h1>

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
            <label className="text-foreground font-medium w-40">Nomenclaturas</label>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="bg-primary text-primary-foreground h-10 px-3 rounded-lg w-52 border-0">
                  <SelectValue placeholder="Selecionar Nomenclaturas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nom1">Nomenclatura 1</SelectItem>
                  <SelectItem value="nom2">Nomenclatura 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Adicionar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Apresentação</label>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ap1">Apresentação 1</SelectItem>
                  <SelectItem value="ap2">Apresentação 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Adicionar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Fornecedores</label>
            <div className="flex-1">
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="bg-primary text-primary-foreground h-10 px-3 rounded-lg w-52 border-0">
                    <SelectValue placeholder="Selecionar Fornecedores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forn1">Fornecedor 1</SelectItem>
                    <SelectItem value="forn2">Fornecedor 2</SelectItem>
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
            <label className="text-foreground font-medium w-40">Setor</label>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="bg-primary text-primary-foreground h-10 px-3 rounded-lg w-52 border-0">
                  <SelectValue placeholder="Selecionar Setores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="setor1">Setor 1</SelectItem>
                  <SelectItem value="setor2">Setor 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Adicionar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Frequência de Compra</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diário</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Frequência de Saída</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diario">Diário</SelectItem>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-8">
            <label className="text-foreground font-medium w-40 pt-2">Descrição</label>
            <Textarea 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] px-3 rounded-lg border border-[#22265B] w-80 min-h-[150px]" 
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

export default NovoItem;
