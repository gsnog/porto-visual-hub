import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FileText } from "lucide-react";

const NovoPlanoContas = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/plano-contas");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/plano-contas");
  };

  return (
    <SimpleFormWizard title="Novo Plano de Contas">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Plano de Contas</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div className="form-row">
                <label className="form-label">Categoria</label>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="form-input w-32">
                      <SelectValue placeholder="---------" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="cat1">Categoria 1</SelectItem>
                      <SelectItem value="cat2">Categoria 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="btn-action px-4">Adicionar Categoria</Button>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Subcategoria</label>
                <div className="flex-1">
                  <div className="flex gap-3">
                    <Select>
                      <SelectTrigger className="form-input w-32">
                        <SelectValue placeholder="---------" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="sub1">Subcategoria 1</SelectItem>
                        <SelectItem value="sub2">Subcategoria 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="btn-action px-4">Adicionar Subcategoria</Button>
                  </div>
                  <span className="form-hint">Obrigatório</span>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">Contábil</label>
                <div className="flex-1">
                  <div className="flex gap-3">
                    <Select>
                      <SelectTrigger className="form-input w-32">
                        <SelectValue placeholder="---------" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="cont1">Contábil 1</SelectItem>
                        <SelectItem value="cont2">Contábil 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="btn-action px-4">Adicionar Contábil</Button>
                  </div>
                  <span className="form-hint">Obrigatório</span>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">ID</label>
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
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoPlanoContas;