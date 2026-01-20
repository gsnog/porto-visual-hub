import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Package } from "lucide-react";

const NovaFormaApresentacao = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/estoque/formas-apresentacao");
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/formas-apresentacao");
  };

  return (
    <SimpleFormWizard title="Nova Forma de Apresentação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Forma de Apresentação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="space-y-4 max-w-xl">
              <div className="form-row">
                <label className="form-label">Forma</label>
                <div className="flex-1">
                  <Input placeholder="" className="form-input" />
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

export default NovaFormaApresentacao;