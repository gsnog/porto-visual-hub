import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import SimpleFormWizard from "@/components/SimpleFormWizard";

const NovoItem = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/estoque/itens");
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/itens");
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
          <label className="form-label">Nomenclaturas</label>
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="form-input w-52">
                <SelectValue placeholder="Selecionar Nomenclaturas" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="nom1">Nomenclatura 1</SelectItem>
                <SelectItem value="nom2">Nomenclatura 2</SelectItem>
              </SelectContent>
            </Select>
            <Button className="btn-action px-6">Adicionar</Button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Apresentação</label>
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="form-input w-28">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="ap1">Apresentação 1</SelectItem>
                <SelectItem value="ap2">Apresentação 2</SelectItem>
              </SelectContent>
            </Select>
            <Button className="btn-action px-6">Adicionar</Button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Fornecedores</label>
          <div className="flex-1">
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="form-input w-52">
                  <SelectValue placeholder="Selecionar Fornecedores" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="forn1">Fornecedor 1</SelectItem>
                  <SelectItem value="forn2">Fornecedor 2</SelectItem>
                </SelectContent>
              </Select>
              <Button className="btn-action px-6">Adicionar</Button>
            </div>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Setor</label>
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
            <Button className="btn-action px-6">Adicionar</Button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Frequência de Compra</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-28">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="diario">Diário</SelectItem>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Frequência de Saída</label>
          <Select>
            <SelectTrigger className="form-input w-28">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="diario">Diário</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start gap-4">
          <label className="form-label pt-2">Descrição</label>
          <Textarea placeholder="" className="form-input w-80 min-h-[150px]" />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
          <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
        </div>
      </div>
    </SimpleFormWizard>
  );
};

export default NovoItem;
