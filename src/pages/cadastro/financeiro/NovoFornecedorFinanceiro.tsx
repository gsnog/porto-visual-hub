import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const NovoFornecedorFinanceiro = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    // TODO: Implementar lógica de salvar
    navigate("/cadastro/financeiro/fornecedores");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/fornecedores");
  };

  const handleConsultar = () => {
    // TODO: Implementar consulta CNPJ
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Adicionar Fornecedor</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">CNPJ</label>
            <div className="flex gap-3">
              <Input 
                placeholder="" 
                className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
              />
              <Button 
                onClick={handleConsultar}
                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Consultar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">CPF</label>
            <Input 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Nome</label>
            <Input 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Razão Social</label>
            <Input 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex items-start gap-8">
            <label className="text-foreground font-medium w-40 pt-2">Endereço</label>
            <Textarea 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] px-3 rounded-lg border border-[#22265B] w-80 min-h-[120px]" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Vendedor</label>
            <Input 
              placeholder="" 
              className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Email</label>
            <Input 
              type="email"
              placeholder="fornecedor@example.com" 
              className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B]/50 h-10 px-3 rounded-lg border border-[#22265B] w-64" 
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-40">Telefone</label>
            <Input 
              placeholder="(99) 9999-9999" 
              className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B]/50 h-10 px-3 rounded-lg border border-[#22265B] w-64" 
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

export default NovoFornecedorFinanceiro;
