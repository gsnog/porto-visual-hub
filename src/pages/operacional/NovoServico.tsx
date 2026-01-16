import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const NovoServico = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/operacional/servicos");
  };

  const handleCancelar = () => {
    navigate("/operacional/servicos");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">Nome</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <label className="form-label pt-2">Descrição</label>
          <div className="flex-1">
            <Textarea placeholder="" className="form-input w-80 min-h-[150px]" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Valor</label>
          <div className="flex-1">
            <Input defaultValue="0" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
          <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default NovoServico;
