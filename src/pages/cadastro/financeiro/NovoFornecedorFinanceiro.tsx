import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Truck } from "lucide-react";

const NovoFornecedorFinanceiro = () => {
  const navigate = useNavigate();

  const handleSalvar = () => {
    navigate("/cadastro/financeiro/fornecedores");
  };

  const handleCancelar = () => {
    navigate("/cadastro/financeiro/fornecedores");
  };

  return (
    <SimpleFormWizard title="Novo Fornecedor">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Fornecedor</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div className="form-row">
                <label className="form-label">CNPJ</label>
                <div className="flex gap-3">
                  <Input placeholder="" className="form-input w-64" />
                  <Button className="btn-action px-6">Consultar</Button>
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">CPF</label>
                <Input placeholder="" className="form-input w-64" />
              </div>

              <div className="form-row">
                <label className="form-label">Nome</label>
                <Input placeholder="" className="form-input w-64" />
              </div>

              <div className="form-row">
                <label className="form-label">Razão Social</label>
                <Input placeholder="" className="form-input w-64" />
              </div>

              <div className="flex items-start gap-4">
                <label className="form-label pt-2">Endereço</label>
                <Textarea placeholder="" className="form-input w-80 min-h-[120px]" />
              </div>

              <div className="form-row">
                <label className="form-label">Vendedor</label>
                <Input placeholder="" className="form-input w-64" />
              </div>

              <div className="form-row">
                <label className="form-label">Email</label>
                <Input type="email" placeholder="fornecedor@example.com" className="form-input w-64" />
              </div>

              <div className="form-row">
                <label className="form-label">Telefone</label>
                <Input placeholder="(99) 9999-9999" className="form-input w-64" />
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

export default NovoFornecedorFinanceiro;