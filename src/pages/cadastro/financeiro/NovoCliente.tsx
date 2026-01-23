import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Users } from "lucide-react";

const NovoCliente = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/clientes");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/clientes");
  };

  return (
    <SimpleFormWizard title="Novo Cliente">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Cliente</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">CNPJ <span className="text-destructive">*</span></Label>
                <div className="flex gap-3">
                  <Input placeholder="" className="form-input" />
                  <Button className="btn-action px-6">Consultar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">CPF</Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nome <span className="text-destructive">*</span></Label>
                <Input placeholder="" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Razão Social</Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Endereço <span className="text-destructive">*</span></Label>
                <Textarea placeholder="" className="form-input min-h-[100px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email <span className="text-destructive">*</span></Label>
                <Input type="email" placeholder="" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Telefone <span className="text-destructive">*</span></Label>
                <Input placeholder="" className="form-input" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSalvar} className="btn-action px-6">Salvar</Button>
              <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoCliente;
