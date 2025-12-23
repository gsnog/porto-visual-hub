import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConciliacaoBancaria = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/conta-bancaria")}
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
          >
            Voltar
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">Conciliações Efetuadas</h1>
        </div>

        <div className="flex justify-end">
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Conciliações Pendentes (0)
          </Button>
        </div>

        <div className="bg-[#a8d5e5] rounded-lg p-4">
          <p className="text-[#22265B]">Nenhuma conciliação pendente encontrada.</p>
        </div>
      </div>
    </div>
  );
};

export default ConciliacaoBancaria;
