import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConciliacaoBancaria = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground">
            Conciliações Pendentes (0)
          </Button>
        </div>

        <div className="bg-[#a8d5e5] rounded-lg p-4">
          <p className="text-[#22265B]">Nenhuma conciliação pendente encontrada.</p>
        </div>

        <Button 
          onClick={() => navigate("/cadastro/financeiro/conta-bancaria")}
          className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground px-6"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default ConciliacaoBancaria;
