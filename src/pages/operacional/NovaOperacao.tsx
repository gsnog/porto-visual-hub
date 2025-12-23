import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const NovaOperacao = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/operacional/operacao");
  };

  const handleCancelar = () => {
    navigate("/operacional/operacao");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Operação</h1>

        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Data de Entrada</label>
            <div className="flex-1">
              <Input 
                type="date" 
                className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-48" 
              />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Embarcação</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-28 border border-[#22265B]">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="embarcacao1">Embarcação 1</SelectItem>
                  <SelectItem value="embarcacao2">Embarcação 2</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Previsão de Entrega</label>
            <div className="flex-1">
              <Input 
                type="date" 
                className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-48" 
              />
              <span className="text-muted-foreground text-sm mt-1 block">Obrigatório</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Serviço</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-64 border border-[#22265B]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="servico1">Serviço 1</SelectItem>
                  <SelectItem value="servico2">Serviço 2</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                size="sm"
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6 mt-2"
                onClick={() => navigate("/operacional/servicos/novo")}
              >
                Adicionar Serviço
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Setor</label>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-64 border border-[#22265B]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="setor1">Setor 1</SelectItem>
                  <SelectItem value="setor2">Setor 2</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                size="sm"
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6 mt-2"
                onClick={() => navigate("/operacional/setor/novo")}
              >
                Adicionar Setor
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Data de Início</label>
            <Input 
              type="date" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-48" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Desconto</label>
            <Input 
              defaultValue="R$ 0,00" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Valor Adicional</label>
            <Input 
              defaultValue="R$ 0,00" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="rounded-lg border-[#22265B] text-foreground hover:bg-muted px-6">
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

export default NovaOperacao;
