import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Building2, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { pessoasMock } from "@/data/pessoas-mock";
import { estadosBrasil } from "@/data/brasil-localidades";
import { toast } from "@/hooks/use-toast";
import { useAuditTrail } from "@/hooks/useAuditTrail";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const validationFields = [
  { name: "nome", label: "Nome da Unidade", required: true, minLength: 2, maxLength: 100 },
  { name: "cep", label: "CEP", required: true },
  { name: "endereco", label: "Endereço", required: true },
  { name: "bairro", label: "Bairro", required: true },
  { name: "cidade", label: "Cidade", required: true },
  { name: "estado", label: "Estado", required: true },
  { name: "responsavel", label: "Responsável", required: true },
];

const NovaUnidade = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();
  const { getAuditMetadata } = useAuditTrail();
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation(
    { nome: "", cep: "", endereco: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", responsavel: "" },
    validationFields
  );

  const fetchAddressByCep = useCallback(async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        toast({ title: "CEP não encontrado", description: "Verifique o CEP digitado.", variant: "destructive" });
        return;
      }

      setFieldValue("endereco", data.logradouro || "");
      setFieldValue("bairro", data.bairro || "");
      setFieldValue("cidade", data.localidade || "");
      setFieldValue("estado", data.uf || "");
      if (data.complemento) setFieldValue("complemento", data.complemento);

      toast({ title: "Endereço encontrado!", description: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}` });
    } catch {
      toast({ title: "Erro ao buscar CEP", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setIsLoadingCep(false);
    }
  }, [setFieldValue]);

  const responsaveisOptions = pessoasMock
    .filter(p => p.status === 'Ativo')
    .map(p => ({ value: p.id, label: `${p.nome} - ${p.cargo}` }));

  const handleSalvar = async () => {
    if (validateAll()) {
      const audit = getAuditMetadata();
      console.log("Audit metadata:", audit);
      await handleSave("/cadastro/estoque/unidades", "Unidade salva com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/cadastro/estoque/unidades");
  };

  return (
    <SimpleFormWizard title="Nova Unidade">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Unidade</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput
                label="Nome da Unidade"
                required
                value={formData.nome}
                onChange={(e) => setFieldValue("nome", e.target.value)}
                onBlur={() => setFieldTouched("nome")}
                error={getFieldError("nome")}
                touched={touched.nome}
              />
              <ValidatedSelect
                label="Responsável"
                required
                value={formData.responsavel}
                onValueChange={(v) => setFieldValue("responsavel", v)}
                placeholder="Selecionar responsável"
                options={responsaveisOptions}
                searchable
                searchPlaceholder="Buscar pessoa..."
              />
            </div>

            {/* Endereço */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">CEP <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Input
                    placeholder="00000-000"
                    className="form-input"
                    value={formData.cep}
                    onChange={(e) => setFieldValue("cep", e.target.value)}
                    onBlur={(e) => {
                      setFieldTouched("cep");
                      fetchAddressByCep(e.target.value);
                    }}
                  />
                  {isLoadingCep && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium">Endereço <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Rua, Avenida, etc."
                  className="form-input"
                  value={formData.endereco}
                  onChange={(e) => setFieldValue("endereco", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Número</Label>
                <Input
                  placeholder="Nº"
                  className="form-input"
                  value={formData.numero}
                  onChange={(e) => setFieldValue("numero", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium">Complemento</Label>
                <Input
                  placeholder="Apto, Bloco, etc."
                  className="form-input"
                  value={formData.complemento}
                  onChange={(e) => setFieldValue("complemento", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Bairro <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Bairro"
                  className="form-input"
                  value={formData.bairro}
                  onChange={(e) => setFieldValue("bairro", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cidade <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Cidade"
                  className="form-input"
                  value={formData.cidade}
                  onChange={(e) => setFieldValue("cidade", e.target.value)}
                />
              </div>
              <ValidatedSelect
                label="Estado"
                required
                value={formData.estado}
                onValueChange={(v) => setFieldValue("estado", v)}
                placeholder="UF"
                options={estadosBrasil.map(uf => ({ value: uf.sigla, label: `${uf.sigla} - ${uf.nome}` }))}
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

export default NovaUnidade;
