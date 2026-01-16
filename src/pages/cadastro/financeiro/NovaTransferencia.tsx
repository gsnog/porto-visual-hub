import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const NovaTransferencia = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/transferencias");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/transferencias");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-xl">
        <div className="form-row">
          <label className="form-label">Conta Origem</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-64">
                <SelectValue placeholder="Selecionar conta" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="conta1">Conta 1</SelectItem>
                <SelectItem value="conta2">Conta 2</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Conta Destino</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-64">
                <SelectValue placeholder="Selecionar conta" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="conta1">Conta 1</SelectItem>
                <SelectItem value="conta2">Conta 2</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Valor</label>
          <div className="flex-1">
            <Input placeholder="0,00" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Data</label>
          <div className="flex-1">
            <Input type="date" className="form-input w-64" />
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

export default NovaTransferencia;
