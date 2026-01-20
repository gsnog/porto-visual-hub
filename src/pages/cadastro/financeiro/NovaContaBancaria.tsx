import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import SimpleFormWizard from "@/components/SimpleFormWizard";

const NovaContaBancaria = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/conta-bancaria");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/conta-bancaria");
  };

  return (
    <SimpleFormWizard currentStep="Dados" steps={["Dados"]}>
      <div className="space-y-4 max-w-xl">
        <div className="form-row">
          <label className="form-label">Tipo</label>
          <Select>
            <SelectTrigger className="form-input w-40">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="corrente">Corrente</SelectItem>
              <SelectItem value="poupanca">Poupança</SelectItem>
              <SelectItem value="investimento">Investimento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Código do Banco</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Banco</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Agência</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Número da Conta</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Saldo</label>
          <div className="flex-1">
            <Input placeholder="0,00" className="form-input w-64" />
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

export default NovaContaBancaria;
