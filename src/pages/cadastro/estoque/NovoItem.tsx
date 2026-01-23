import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Package } from "lucide-react";

const NovoItem = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/estoque/itens");
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/itens");
  };

  return (
    <SimpleFormWizard title="Novo Item">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Item</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

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
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoItem;