import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const NovaOperacao = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/operacional/operacao");
  };

  const handleCancelar = () => {
    navigate("/operacional/operacao");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-3xl">
        <div className="form-row">
          <label className="form-label">Data de Entrada</label>
          <div className="flex-1">
            <Input type="date" className="form-input w-48" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Embarcação</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-28">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="embarcacao1">Embarcação 1</SelectItem>
                <SelectItem value="embarcacao2">Embarcação 2</SelectItem>
              </SelectContent>
            </Select>
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Previsão de Entrega</label>
          <div className="flex-1">
            <Input type="date" className="form-input w-48" />
            <span className="form-hint">Obrigatório</span>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Serviço</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-64">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="servico1">Serviço 1</SelectItem>
                <SelectItem value="servico2">Serviço 2</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="btn-action px-6 mt-2" onClick={() => navigate("/operacional/novo-servico")}>
              Adicionar Serviço
            </Button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Setor</label>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="form-input w-64">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="setor1">Setor 1</SelectItem>
                <SelectItem value="setor2">Setor 2</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="btn-action px-6 mt-2" onClick={() => navigate("/operacional/novo-setor")}>
              Adicionar Setor
            </Button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Data de Início</label>
          <Input type="date" className="form-input w-48" />
        </div>

        <div className="form-row">
          <label className="form-label">Desconto</label>
          <Input defaultValue="R$ 0,00" className="form-input w-64" />
        </div>

        <div className="form-row">
          <label className="form-label">Valor Adicional</label>
          <Input defaultValue="R$ 0,00" className="form-input w-64" />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="btn-outline px-6">Adicionar Serviço</Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Serviços e Setores</h2>
          <div className="table-professional">
            <Table>
              <TableHeader>
                <TableRow className="table-header">
                  <TableHead className="table-head">Serviço</TableHead>
                  <TableHead className="table-head">Setor</TableHead>
                  <TableHead className="table-head">Data de Início</TableHead>
                  <TableHead className="table-head">Desconto</TableHead>
                  <TableHead className="table-head">Valor Adicional</TableHead>
                  <TableHead className="table-head">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="table-row">
                  <TableCell colSpan={6} className="table-cell">Nenhum serviço adicionado.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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

export default NovaOperacao;
