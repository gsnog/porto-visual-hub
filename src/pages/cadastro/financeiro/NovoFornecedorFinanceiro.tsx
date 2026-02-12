import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Truck, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useState } from "react";
import { useCnpjLookup, formatCnpj } from "@/hooks/useCnpjLookup";

const NovoFornecedorFinanceiro = () => {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/cadastro/financeiro/fornecedores",
    successMessage: "Fornecedor salvo!",
    successDescription: "O registro foi salvo com sucesso.",
  });

  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const setFieldValue = (field: string, value: string) => {
    switch (field) {
      case "nome": setNome(value); break;
      case "razaoSocial": setRazaoSocial(value); break;
      case "endereco": setEndereco(value); break;
      case "email": setEmail(value); break;
      case "telefone": setTelefone(value); break;
    }
  };

  const { consultarCnpj, isSearching } = useCnpjLookup(setFieldValue);

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
                  <Input
                    placeholder="00.000.000/0000-00"
                    className="form-input"
                    value={cnpj}
                    onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                    maxLength={18}
                  />
                  <Button
                    className="btn-action px-6"
                    onClick={() => consultarCnpj(cnpj)}
                    disabled={isSearching}
                    type="button"
                  >
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Consultar"}
                  </Button>
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
                <Input placeholder="" className="form-input" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Razão Social</Label>
                <Input placeholder="" className="form-input" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Endereço</Label>
                <Textarea placeholder="" className="form-input min-h-[100px]" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Vendedor</Label>
                <Input placeholder="" className="form-input" value={vendedor} onChange={(e) => setVendedor(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input type="email" placeholder="fornecedor@example.com" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Telefone</Label>
                <Input placeholder="(99) 9999-9999" className="form-input" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>
            </div>

            <FormActionBar
              onSave={handleSalvar}
              onCancel={handleCancelar}
              isSaving={isSaving}
            />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoFornecedorFinanceiro;
