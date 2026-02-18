import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import SimpleFormWizard from "@/components/SimpleFormWizard";

const niveisIniciais = [
  { value: "executivo", label: "Executivo" },
  { value: "gerencial", label: "Gerencial" },
  { value: "coordenacao", label: "Coordenação" },
  { value: "senior", label: "Sênior" },
  { value: "pleno", label: "Pleno" },
  { value: "junior", label: "Júnior" },
  { value: "operacional", label: "Operacional" },
  { value: "estagio", label: "Estágio" },
];

const cargosSuperioresIniciais = [
  { value: "diretor", label: "Diretor" },
  { value: "gerente", label: "Gerente" },
  { value: "coordenador", label: "Coordenador" },
];

export default function NovoCargo() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nivel, setNivel] = useState("");
  const [cargoSuperior, setCargoSuperior] = useState("");
  const [niveis, setNiveis] = useState(niveisIniciais);
  const [cargosSuperiores, setCargosSuperiores] = useState(cargosSuperioresIniciais);

  const handleSubmit = () => {
    if (!nome.trim() || !nivel) {
      toast({ title: "Campos obrigatórios", description: "Preencha o nome e o nível do cargo.", variant: "destructive" });
      return;
    }
    handleSave("/cadastro/pessoas/cargos", "Cargo criado com sucesso!");
  };

  return (
    <SimpleFormWizard>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/cadastro/pessoas/cargos")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Novo Cargo</h1>
      </div>

      <Card className="border-border">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nome do Cargo <span className="text-destructive">*</span></Label>
              <Input placeholder="Ex: Analista de Sistemas" value={nome} onChange={(e) => setNome(e.target.value)} className="form-input" />
            </div>
            <DropdownWithAdd
              label="Nível Hierárquico"
              value={nivel}
              onChange={setNivel}
              options={niveis}
              onAddNew={(name) => {
                const val = name.toLowerCase().replace(/\s+/g, "-");
                setNiveis(prev => [...prev, { value: val, label: name }]);
                setNivel(val);
              }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea placeholder="Descreva as responsabilidades do cargo..." value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} />
          </div>

          <DropdownWithAdd
            label="Cargo Superior (Hierarquia)"
            value={cargoSuperior}
            onChange={setCargoSuperior}
            options={cargosSuperiores}
            onAddNew={(name) => {
              const val = name.toLowerCase().replace(/\s+/g, "-");
              setCargosSuperiores(prev => [...prev, { value: val, label: name }]);
              setCargoSuperior(val);
            }}
            placeholder="Selecione o cargo superior"
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => navigate("/cadastro/pessoas/cargos")}>Cancelar</Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Salvando...</> : "Salvar Cargo"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
