import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { CircleDollarSign } from "lucide-react";

const NovoCentroCusto = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/centro-custo");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/centro-custo");
  };

  return (
    <SimpleFormWizard title="Novo Centro de Custo">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <CircleDollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Centro de Custo</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

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
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoCentroCusto;