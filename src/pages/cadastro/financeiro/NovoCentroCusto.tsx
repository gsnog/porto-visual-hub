import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import SimpleFormWizard from "@/components/SimpleFormWizard";

const NovoCentroCusto = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/centro-custo");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/centro-custo");
  };

  return (
    <SimpleFormWizard currentStep="Dados" steps={["Dados"]}>
      <div className="space-y-4 max-w-xl">
        <div className="form-row">
          <label className="form-label">Diretoria</label>
          <div className="flex-1">
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="form-input w-40">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="dir1">Diretoria 1</SelectItem>
                  <SelectItem value="dir2">Diretoria 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-action px-6">Adicionar</Button>
            </div>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Gerência</label>
          <Input placeholder="" className="form-input w-64" />
        </div>

        <div className="form-row">
          <label className="form-label">Departamento</label>
          <Input placeholder="" className="form-input w-64" />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
          <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
        </div>
      </div>
    </SimpleFormWizard>
  );
};

export default NovoCentroCusto;
