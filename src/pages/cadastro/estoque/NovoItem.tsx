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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const validationFields = [
  { name: "nome", label: "Nome", required: true, minLength: 2 },
  { name: "data", label: "Data", required: true },
];

const NovoItem = () => {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { nome: "", data: "", nomenclatura: "", apresentacao: "", fornecedor: "", setor: "", frequenciaCompra: "", frequenciaSaida: "", descricao: "" },
    validationFields
  );

  const [nomenclaturaOptions, setNomenclaturaOptions] = useState([
    { value: "nom1", label: "Nomenclatura 1" }, { value: "nom2", label: "Nomenclatura 2" }
  ]);

  const [apresentacaoOptions, setApresentacaoOptions] = useState([
    { value: "caixa", label: "Caixa" }, { value: "unidade", label: "Unidade" }, { value: "pacote", label: "Pacote" }, { value: "litro", label: "Litro" }, { value: "kg", label: "Kg" }
  ]);

  const fornecedorOptions = [
    { value: "forn1", label: "Fornecedor 1" }, { value: "forn2", label: "Fornecedor 2" }
  ];
  const setorOptions = [
    { value: "setor1", label: "Setor 1" }, { value: "setor2", label: "Setor 2" }
  ];

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
              <ValidatedInput label="Data" required type="date" value={formData.data} onChange={(e) => setFieldValue("data", e.target.value)}
                onBlur={() => setFieldTouched("data")} error={getFieldError("data")} touched={touched.data} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Nomenclaturas" value={formData.nomenclatura} onChange={(v) => setFieldValue("nomenclatura", v)}
                options={nomenclaturaOptions} onAddNew={(item) => setNomenclaturaOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Fornecedores</Label>
                <Select value={formData.fornecedor} onValueChange={(v) => setFieldValue("fornecedor", v)}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {fornecedorOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Forma de Apresentação" value={formData.apresentacao} onChange={(v) => setFieldValue("apresentacao", v)}
                options={apresentacaoOptions} onAddNew={(item) => setApresentacaoOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Setor</Label>
                <Select value={formData.setor} onValueChange={(v) => setFieldValue("setor", v)}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {setorOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
