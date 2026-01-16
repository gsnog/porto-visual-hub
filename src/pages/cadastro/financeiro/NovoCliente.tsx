import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const NovoCliente = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/clientes");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/clientes");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">CNPJ</label>
          <div className="flex-1">
            <div className="flex gap-3">
              <Input placeholder="" className="form-input w-64" />
              <Button className="btn-action px-6">Consultar</Button>
            </div>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">CPF</label>
          <Input placeholder="" className="form-input w-64" />
        </div>

        <div className="form-row">
          <label className="form-label">Nome</label>
          <div className="flex-1">
            <Input placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Razão Social</label>
          <Input placeholder="" className="form-input w-64" />
        </div>

        <div className="flex items-start gap-4">
          <label className="form-label pt-2">Endereço</label>
          <div className="flex-1">
            <Textarea placeholder="" className="form-input w-80 min-h-[120px]" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Email</label>
          <div className="flex-1">
            <Input type="email" placeholder="" className="form-input w-64" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Telefone</label>
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
    </div>
  );
};

export default NovoCliente;
