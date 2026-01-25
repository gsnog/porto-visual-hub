import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Users } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";

const validationFields = [
  { name: "cnpj", label: "CNPJ", required: true },
  { name: "cpf", label: "CPF", required: false },
  { name: "nome", label: "Nome", required: true, minLength: 2, maxLength: 100 },
  { name: "razaoSocial", label: "Razão Social", required: false },
  { name: "endereco", label: "Endereço", required: true, minLength: 5 },
  { 
    name: "email", 
    label: "Email", 
    required: true, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Email inválido"
  },
  { name: "telefone", label: "Telefone", required: true },
];

const NovoCliente = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation(
    { cnpj: "", cpf: "", nome: "", razaoSocial: "", endereco: "", email: "", telefone: "" },
    validationFields
  );

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/cadastro/financeiro/clientes", "Cliente salvo com sucesso!");
    }
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
                <ValidatedInput
                  label="CNPJ"
                  required
                  value={formData.cnpj}
                  onChange={(e) => setFieldValue("cnpj", e.target.value)}
                  onBlur={() => setFieldTouched("cnpj")}
                  error={getFieldError("cnpj")}
                  touched={touched.cnpj}
                />
                <Button className="btn-action px-6 mt-2">Consultar</Button>
              </div>

              <ValidatedInput
                label="CPF"
                value={formData.cpf}
                onChange={(e) => setFieldValue("cpf", e.target.value)}
                onBlur={() => setFieldTouched("cpf")}
                error={getFieldError("cpf")}
                touched={touched.cpf}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                label="Nome"
                required
                value={formData.nome}
                onChange={(e) => setFieldValue("nome", e.target.value)}
                onBlur={() => setFieldTouched("nome")}
                error={getFieldError("nome")}
                touched={touched.nome}
              />

              <ValidatedInput
                label="Razão Social"
                value={formData.razaoSocial}
                onChange={(e) => setFieldValue("razaoSocial", e.target.value)}
                onBlur={() => setFieldTouched("razaoSocial")}
                error={getFieldError("razaoSocial")}
                touched={touched.razaoSocial}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ValidatedTextarea
                label="Endereço"
                required
                value={formData.endereco}
                onChange={(e) => setFieldValue("endereco", e.target.value)}
                onBlur={() => setFieldTouched("endereco")}
                error={getFieldError("endereco")}
                touched={touched.endereco}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={() => setFieldTouched("email")}
                error={getFieldError("email")}
                touched={touched.email}
              />

              <ValidatedInput
                label="Telefone"
                required
                value={formData.telefone}
                onChange={(e) => setFieldValue("telefone", e.target.value)}
                onBlur={() => setFieldTouched("telefone")}
                error={getFieldError("telefone")}
                touched={touched.telefone}
              />
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

export default NovoCliente;
