import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const NovoCentroReceita = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/centro-receita");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/centro-receita");
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default NovoCentroReceita;
