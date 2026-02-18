import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { Package } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedInput } from "@/components/ui/validated-input";
import { ValidatedSelect } from "@/components/ui/validated-select";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";

const validationFields = [
  { name: "nome", label: "Nome", required: true, minLength: 2 },
];

const NovoItem = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { nome: "", nomenclatura: "", apresentacao: "", fornecedor: "", setor: "", frequenciaCompra: "", frequenciaSaida: "", descricao: "" },
    validationFields
  );

  const [nomenclaturaOptions, setNomenclaturaOptions] = useState([
    { value: "nom1", label: "Nomenclatura 1" }, { value: "nom2", label: "Nomenclatura 2" }
  ]);
  const [apresentacaoOptions, setApresentacaoOptions] = useState([
    { value: "ap1", label: "Apresentação 1" }, { value: "ap2", label: "Apresentação 2" }
  ]);
  const [fornecedorOptions, setFornecedorOptions] = useState([
    { value: "forn1", label: "Fornecedor 1" }, { value: "forn2", label: "Fornecedor 2" }
  ]);
  const [setorOptions, setSetorOptions] = useState([
    { value: "setor1", label: "Setor 1" }, { value: "setor2", label: "Setor 2" }
  ]);

  const handleSalvar = async () => {
    if (validateAll()) {
      await handleSave("/cadastro/estoque/itens", "Item salvo com sucesso!");
    }
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedInput label="Nome" required value={formData.nome} onChange={(e) => setFieldValue("nome", e.target.value)}
                onBlur={() => setFieldTouched("nome")} error={getFieldError("nome")} touched={touched.nome} />
              <DropdownWithAdd label="Nomenclaturas" value={formData.nomenclatura} onChange={(v) => setFieldValue("nomenclatura", v)}
                options={nomenclaturaOptions} onAddNew={(item) => setNomenclaturaOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Apresentação" value={formData.apresentacao} onChange={(v) => setFieldValue("apresentacao", v)}
                options={apresentacaoOptions} onAddNew={(item) => setApresentacaoOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <DropdownWithAdd label="Fornecedores" required value={formData.fornecedor} onChange={(v) => setFieldValue("fornecedor", v)}
                options={fornecedorOptions} onAddNew={(item) => setFornecedorOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Setor" value={formData.setor} onChange={(v) => setFieldValue("setor", v)}
                options={setorOptions} onAddNew={(item) => setSetorOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <ValidatedSelect label="Frequência de Compra" required value={formData.frequenciaCompra} onChange={(v) => setFieldValue("frequenciaCompra", v)}
                onBlur={() => setFieldTouched("frequenciaCompra")} error={getFieldError("frequenciaCompra")} touched={touched.frequenciaCompra}
                options={[
                  { value: "diario", label: "Diário" }, { value: "semanal", label: "Semanal" }, { value: "mensal", label: "Mensal" }
                ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatedSelect label="Frequência de Saída" value={formData.frequenciaSaida} onChange={(v) => setFieldValue("frequenciaSaida", v)}
                onBlur={() => setFieldTouched("frequenciaSaida")} error={getFieldError("frequenciaSaida")} touched={touched.frequenciaSaida}
                options={[
                  { value: "diario", label: "Diário" }, { value: "semanal", label: "Semanal" }, { value: "mensal", label: "Mensal" }
                ]} />
            </div>

            <ValidatedTextarea label="Descrição" value={formData.descricao} onChange={(e) => setFieldValue("descricao", e.target.value)}
              onBlur={() => setFieldTouched("descricao")} error={getFieldError("descricao")} touched={touched.descricao} />

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/cadastro/estoque/itens")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
};

export default NovoItem;
