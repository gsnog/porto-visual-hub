import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import SimpleFormWizard from "@/components/SimpleFormWizard";

const NovaEmbarcacao = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/operacional/embarcacoes");
  };

  const handleCancelar = () => {
    navigate("/operacional/embarcacoes");
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

        <div className="form-row">
          <label className="form-label">Setores</label>
          <div className="flex-1">
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="form-input w-52">
                  <SelectValue placeholder="Selecionar Setores" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="setor1">Setor 1</SelectItem>
                  <SelectItem value="setor2">Setor 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-action px-6" onClick={() => navigate("/operacional/novo-setor")}>Adicionar</Button>
            </div>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Cliente</label>
          <div className="flex-1">
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="form-input w-28">
                  <SelectValue placeholder="---------" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="cliente1">Cliente 1</SelectItem>
                  <SelectItem value="cliente2">Cliente 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-action px-6" onClick={() => navigate("/cadastro/financeiro/novo-cliente")}>Adicionar</Button>
            </div>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Dimensões</label>
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

export default NovaEmbarcacao;
