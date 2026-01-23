import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Truck, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";

const NovoFornecedorFinanceiro = () => {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/cadastro/financeiro/fornecedores",
    successMessage: "Fornecedor salvo!",
    successDescription: "O registro foi salvo com sucesso.",
  });

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">CNPJ</Label>
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
                <Label className="text-sm font-medium">Endereço</Label>
                <Textarea placeholder="" className="form-input min-h-[100px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Vendedor</Label>
                <Input placeholder="" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input type="email" placeholder="fornecedor@example.com" className="form-input" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Telefone</Label>
                <Input placeholder="(99) 9999-9999" className="form-input" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSalvar} disabled={isSaving} className="btn-action px-6">
                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvando...</> : "Salvar"}
              </Button>
              <Button onClick={handleCancelar} disabled={isSaving} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoFornecedorFinanceiro;
