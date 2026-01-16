import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const NovaFormaApresentacao = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/estoque/formas-apresentacao");
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/formas-apresentacao");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-xl">
        <div className="form-row">
          <label className="form-label">Forma</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input" />
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

export default NovaFormaApresentacao;
