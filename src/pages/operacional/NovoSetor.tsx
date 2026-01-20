import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import SimpleFormWizard from "@/components/SimpleFormWizard";

const NovoSetor = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/operacional/setor");
  };

  const handleCancelar = () => {
    navigate("/operacional/setor");
  };

  return (
    <SimpleFormWizard currentStep="Dados" steps={["Dados"]}>
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">Nome</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
          <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
        </div>
      </div>
    </SimpleFormWizard>
  );
};

export default NovoSetor;
