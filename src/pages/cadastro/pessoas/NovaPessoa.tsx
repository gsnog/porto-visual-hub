import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { 
  User, 
  Phone, 
  MapPin, 
  Landmark, 
  FileText, 
  Heart,
  Building2,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { estadosBrasil, opcoesSelecao, bancosBrasil } from "@/data/brasil-localidades"
import { setoresMock, cargosMock, tiposVinculo, pessoasMock } from "@/data/pessoas-mock"
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const steps = [
  { id: 1, title: "Dados Pessoais", icon: User },
  { id: 2, title: "Contato", icon: Phone },
  { id: 3, title: "Endereço", icon: MapPin },
  { id: 4, title: "Dados Bancários", icon: Landmark },
  { id: 5, title: "Documentos", icon: FileText },
  { id: 6, title: "Diversidade", icon: Heart },
  { id: 7, title: "Dados da Empresa", icon: Building2 },
]

const requiredFieldsByStep: Record<number, string[]> = {
  1: ["nomeCompleto", "dataNascimento"],
  2: ["celular", "emailPessoal"],
  3: ["cep", "endereco", "bairro", "cidade", "estado"],
  4: ["banco", "tipoConta", "agencia", "conta"],
  5: ["cpf", "rg"],
  6: [],
  7: ["setor", "cargo", "tipoVinculo", "dataAdmissao", "statusPessoa"],
}

const fieldLabels: Record<string, string> = {
  nomeCompleto: "Nome Completo",
  dataNascimento: "Data de Nascimento",
  celular: "Celular",
  emailPessoal: "E-mail Pessoal",
  cep: "CEP",
  endereco: "Endereço",
  bairro: "Bairro",
  cidade: "Cidade",
  estado: "Estado",
  banco: "Banco",
  tipoConta: "Tipo da Conta",
  agencia: "Agência",
  conta: "Conta",
  cpf: "CPF",
  rg: "RG",
  setor: "Setor/Área",
  cargo: "Cargo",
  tipoVinculo: "Tipo de Vínculo",
  dataAdmissao: "Data de Admissão",
  statusPessoa: "Status",
}

interface FormData {
  // Step 1 - Dados Pessoais
  nomeCompleto: string;
  dataNascimento: string;
  nomePai: string;
  nomeMae: string;
  sexo: string;
  estadoCivil: string;
  nacionalidade: string;
  racaCor: string;
  grauInstrucao: string;
  // Step 2 - Contato
  celular: string;
  telefoneFixo: string;
  emailPessoal: string;
  emailCorporativo: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  // Step 3 - Endereço
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  // Step 4 - Dados Bancários
  banco: string;
  tipoConta: string;
  agencia: string;
  conta: string;
  digito: string;
  chavePix: string;
  // Step 5 - Documentos
  cpf: string;
  rg: string;
  orgaoExpedidor: string;
  ufRg: string;
  dataExpedicaoRg: string;
  ctps: string;
  ctpsSerie: string;
  ctpsUf: string;
  ctpsDataExpedicao: string;
  pisPasep: string;
  cnh: string;
  cnhCategoria: string;
  cnhValidade: string;
  tituloEleitor: string;
  tituloZona: string;
  tituloSecao: string;
  // Step 6 - Diversidade
  lgbtqia: string;
  neurodivergente: string;
  pcd: string;
  filhos: string;
  aposentado: string;
  // Step 7 - Dados da Empresa (NOVO)
  setor: string;
  cargo: string;
  gestorDireto: string;
  tipoVinculo: string;
  dataAdmissao: string;
  statusPessoa: string;
  funcaoDescricao: string;
  salario: string;
}

const initialFormData: FormData = {
  nomeCompleto: "",
  dataNascimento: "",
  nomePai: "",
  nomeMae: "",
  sexo: "",
  estadoCivil: "",
  nacionalidade: "",
  racaCor: "",
  grauInstrucao: "",
  celular: "",
  telefoneFixo: "",
  emailPessoal: "",
  emailCorporativo: "",
  contatoEmergenciaNome: "",
  contatoEmergenciaTelefone: "",
  cep: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  banco: "",
  tipoConta: "",
  agencia: "",
  conta: "",
  digito: "",
  chavePix: "",
  cpf: "",
  rg: "",
  orgaoExpedidor: "",
  ufRg: "",
  dataExpedicaoRg: "",
  ctps: "",
  ctpsSerie: "",
  ctpsUf: "",
  ctpsDataExpedicao: "",
  pisPasep: "",
  cnh: "",
  cnhCategoria: "",
  cnhValidade: "",
  tituloEleitor: "",
  tituloZona: "",
  tituloSecao: "",
  lgbtqia: "nao",
  neurodivergente: "nao",
  pcd: "nao",
  filhos: "nao",
  aposentado: "nao",
  setor: "",
  cargo: "",
  gestorDireto: "",
  tipoVinculo: "",
  dataAdmissao: "",
  statusPessoa: "Ativo",
  funcaoDescricao: "",
  salario: "",
}

export default function NovaPessoa() {
  const navigate = useNavigate()
  const { isSaving, handleSave } = useSaveWithDelay()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showValidationDialog, setShowValidationDialog] = useState(false)
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [isLoadingCep, setIsLoadingCep] = useState(false)

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const fetchAddressByCep = useCallback(async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) return
    
    setIsLoadingCep(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data: ViaCepResponse = await response.json()
      
      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP digitado e tente novamente.",
          variant: "destructive",
        })
        return
      }
      
      setFormData(prev => ({
        ...prev,
        endereco: data.logradouro || prev.endereco,
        bairro: data.bairro || prev.bairro,
        cidade: data.localidade || prev.cidade,
        estado: data.uf || prev.estado,
        complemento: data.complemento || prev.complemento,
      }))
      
      toast({
        title: "Endereço encontrado!",
        description: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`,
      })
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Não foi possível consultar o CEP. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingCep(false)
    }
  }, [])

  const validateStep = (step: number): boolean => {
    const required = requiredFieldsByStep[step] || []
    const missing = required.filter(field => !formData[field as keyof FormData])
    
    if (missing.length > 0) {
      setMissingFields(missing.map(f => fieldLabels[f] || f))
      setShowValidationDialog(true)
      return false
    }
    return true
  }

  const handleSalvar = () => {
    if (validateStep(currentStep)) {
      handleSave("/cadastro/pessoas/pessoas", "Pessoa cadastrada com sucesso!")
    }
  }

  const handleCancelar = () => {
    navigate("/cadastro/pessoas/pessoas")
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step)
    } else if (validateStep(currentStep)) {
      setCurrentStep(step)
    }
  }

  // Gestores disponíveis (pessoas ativas)
  const gestoresDisponiveis = pessoasMock.filter(p => p.status === 'Ativo')

  return (
    <div className="flex flex-col h-full bg-background items-center">
      <div className="max-w-5xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(step.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-200 group",
                    currentStep >= step.id ? "cursor-pointer" : "cursor-pointer opacity-60"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground scale-110"
                        : currentStep > step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <step.icon className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors hidden lg:block",
                      currentStep === step.id
                        ? "text-primary"
                        : currentStep > step.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-6 md:w-12 h-1 mx-1 md:mx-2 rounded-full transition-colors duration-300",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 md:p-8">
            {/* Step 7: Dados da Empresa (NEW) */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Dados da Empresa</h2>
                    <p className="text-sm text-muted-foreground">Informações organizacionais do colaborador</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Setor/Área <span className="text-destructive">*</span></Label>
                    <Select value={formData.setor} onValueChange={(v) => updateField("setor", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar setor" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {setoresMock.map(setor => (
                          <SelectItem key={setor.id} value={setor.id}>{setor.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Cargo <span className="text-destructive">*</span></Label>
                    <Select value={formData.cargo} onValueChange={(v) => updateField("cargo", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar cargo" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {cargosMock.map(cargo => (
                          <SelectItem key={cargo.id} value={cargo.nome}>{cargo.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Gestor Direto</Label>
                    <Select value={formData.gestorDireto} onValueChange={(v) => updateField("gestorDireto", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar gestor" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="none">Sem gestor (cargo de liderança)</SelectItem>
                        {gestoresDisponiveis.map(pessoa => (
                          <SelectItem key={pessoa.id} value={pessoa.id}>
                            {pessoa.nome} - {pessoa.cargo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo de Vínculo <span className="text-destructive">*</span></Label>
                    <Select value={formData.tipoVinculo} onValueChange={(v) => updateField("tipoVinculo", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar vínculo" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {tiposVinculo.map(tipo => (
                          <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data de Admissão <span className="text-destructive">*</span></Label>
                    <Input 
                      type="date" 
                      className="form-input" 
                      value={formData.dataAdmissao}
                      onChange={(e) => updateField("dataAdmissao", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Status <span className="text-destructive">*</span></Label>
                    <Select value={formData.statusPessoa} onValueChange={(v) => updateField("statusPessoa", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar status" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Afastado">Afastado</SelectItem>
                        <SelectItem value="Desligado">Desligado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Função / Descrição do que faz</Label>
                  <Input 
                    placeholder="Descreva as principais atividades" 
                    className="form-input" 
                    value={formData.funcaoDescricao}
                    onChange={(e) => updateField("funcaoDescricao", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Salário (R$) - Campo Sensível</Label>
                  <Input 
                    type="number" 
                    placeholder="0,00" 
                    className="form-input" 
                    value={formData.salario}
                    onChange={(e) => updateField("salario", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Este campo é visível apenas para perfis autorizados (RH/Admin)
                  </p>
                </div>
              </div>
            )}

            {/* Outras etapas - renderizar igual ao Cadastro.tsx original */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Dados Pessoais</h2>
                    <p className="text-sm text-muted-foreground">Informações básicas do colaborador</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nome Completo <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="Nome igual ao RG" 
                      className="form-input" 
                      value={formData.nomeCompleto}
                      onChange={(e) => updateField("nomeCompleto", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data de Nascimento <span className="text-destructive">*</span></Label>
                    <Input 
                      type="date" 
                      className="form-input" 
                      value={formData.dataNascimento}
                      onChange={(e) => updateField("dataNascimento", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nome do Pai</Label>
                    <Input 
                      placeholder="Nome completo" 
                      className="form-input"
                      value={formData.nomePai}
                      onChange={(e) => updateField("nomePai", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nome da Mãe</Label>
                    <Input 
                      placeholder="Nome completo" 
                      className="form-input"
                      value={formData.nomeMae}
                      onChange={(e) => updateField("nomeMae", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sexo</Label>
                    <Select value={formData.sexo} onValueChange={(v) => updateField("sexo", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {opcoesSelecao.sexo.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Estado Civil</Label>
                    <Select value={formData.estadoCivil} onValueChange={(v) => updateField("estadoCivil", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {opcoesSelecao.estadoCivil.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nacionalidade</Label>
                    <Select value={formData.nacionalidade} onValueChange={(v) => updateField("nacionalidade", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {opcoesSelecao.nacionalidade.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Raça/Cor</Label>
                    <Select value={formData.racaCor} onValueChange={(v) => updateField("racaCor", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {opcoesSelecao.racaCor.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Grau de Instrução</Label>
                    <Select value={formData.grauInstrucao} onValueChange={(v) => updateField("grauInstrucao", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {opcoesSelecao.grauInstrucao.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contato */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Contato</h2>
                    <p className="text-sm text-muted-foreground">Informações de contato do colaborador</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Celular <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      className="form-input"
                      value={formData.celular}
                      onChange={(e) => updateField("celular", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Telefone Fixo</Label>
                    <Input 
                      placeholder="(00) 0000-0000" 
                      className="form-input"
                      value={formData.telefoneFixo}
                      onChange={(e) => updateField("telefoneFixo", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">E-mail Pessoal <span className="text-destructive">*</span></Label>
                    <Input 
                      type="email" 
                      placeholder="email@exemplo.com" 
                      className="form-input"
                      value={formData.emailPessoal}
                      onChange={(e) => updateField("emailPessoal", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">E-mail Corporativo</Label>
                    <Input 
                      type="email" 
                      placeholder="email@empresa.com" 
                      className="form-input"
                      value={formData.emailCorporativo}
                      onChange={(e) => updateField("emailCorporativo", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Contato de Emergência - Nome</Label>
                    <Input 
                      placeholder="Nome do contato" 
                      className="form-input"
                      value={formData.contatoEmergenciaNome}
                      onChange={(e) => updateField("contatoEmergenciaNome", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Contato de Emergência - Telefone</Label>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      className="form-input"
                      value={formData.contatoEmergenciaTelefone}
                      onChange={(e) => updateField("contatoEmergenciaTelefone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Endereço */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Endereço</h2>
                    <p className="text-sm text-muted-foreground">Endereço residencial do colaborador</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">CEP <span className="text-destructive">*</span></Label>
                    <div className="relative">
                      <Input 
                        placeholder="00000-000" 
                        className="form-input"
                        value={formData.cep}
                        onChange={(e) => updateField("cep", e.target.value)}
                        onBlur={(e) => fetchAddressByCep(e.target.value)}
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
                      onChange={(e) => updateField("endereco", e.target.value)}
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
                      onChange={(e) => updateField("numero", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium">Complemento</Label>
                    <Input 
                      placeholder="Apto, Bloco, etc." 
                      className="form-input"
                      value={formData.complemento}
                      onChange={(e) => updateField("complemento", e.target.value)}
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
                      onChange={(e) => updateField("bairro", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Cidade <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="Cidade" 
                      className="form-input"
                      value={formData.cidade}
                      onChange={(e) => updateField("cidade", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Estado <span className="text-destructive">*</span></Label>
                    <Select value={formData.estado} onValueChange={(v) => updateField("estado", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {estadosBrasil.map(uf => (
                          <SelectItem key={uf.sigla} value={uf.sigla}>{uf.sigla} - {uf.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4-6: Manter estrutura similar ao original */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <Landmark className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Dados Bancários</h2>
                    <p className="text-sm text-muted-foreground">Informações bancárias para pagamento</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Banco <span className="text-destructive">*</span></Label>
                    <Select value={formData.banco} onValueChange={(v) => updateField("banco", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar banco" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover max-h-[300px]">
                        {bancosBrasil.map(banco => (
                          <SelectItem key={banco.codigo} value={banco.codigo}>
                            {banco.codigo} - {banco.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo de Conta <span className="text-destructive">*</span></Label>
                    <Select value={formData.tipoConta} onValueChange={(v) => updateField("tipoConta", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="corrente">Conta Corrente</SelectItem>
                        <SelectItem value="poupanca">Conta Poupança</SelectItem>
                        <SelectItem value="salario">Conta Salário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Agência <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="0000" 
                      className="form-input"
                      value={formData.agencia}
                      onChange={(e) => updateField("agencia", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Conta <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="00000000" 
                      className="form-input"
                      value={formData.conta}
                      onChange={(e) => updateField("conta", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Dígito</Label>
                    <Input 
                      placeholder="0" 
                      className="form-input"
                      value={formData.digito}
                      onChange={(e) => updateField("digito", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Chave PIX</Label>
                  <Input 
                    placeholder="CPF, e-mail, telefone ou chave aleatória" 
                    className="form-input"
                    value={formData.chavePix}
                    onChange={(e) => updateField("chavePix", e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Documentos</h2>
                    <p className="text-sm text-muted-foreground">Documentação pessoal do colaborador</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">CPF <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="000.000.000-00" 
                      className="form-input"
                      value={formData.cpf}
                      onChange={(e) => updateField("cpf", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">RG <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="00.000.000-0" 
                      className="form-input"
                      value={formData.rg}
                      onChange={(e) => updateField("rg", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Órgão Expedidor</Label>
                    <Input 
                      placeholder="SSP" 
                      className="form-input"
                      value={formData.orgaoExpedidor}
                      onChange={(e) => updateField("orgaoExpedidor", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">UF RG</Label>
                    <Select value={formData.ufRg} onValueChange={(v) => updateField("ufRg", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {estadosBrasil.map(uf => (
                          <SelectItem key={uf.sigla} value={uf.sigla}>{uf.sigla}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data de Expedição</Label>
                    <Input 
                      type="date" 
                      className="form-input"
                      value={formData.dataExpedicaoRg}
                      onChange={(e) => updateField("dataExpedicaoRg", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">PIS/PASEP</Label>
                  <Input 
                    placeholder="000.00000.00-0" 
                    className="form-input"
                    value={formData.pisPasep}
                    onChange={(e) => updateField("pisPasep", e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Diversidade</h2>
                    <p className="text-sm text-muted-foreground">Informações opcionais de diversidade</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Você se identifica como LGBTQIA+?</Label>
                    <RadioGroup 
                      value={formData.lgbtqia} 
                      onValueChange={(v) => updateField("lgbtqia", v)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="lgbtqia-sim" />
                        <Label htmlFor="lgbtqia-sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="lgbtqia-nao" />
                        <Label htmlFor="lgbtqia-nao">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefiro-nao-dizer" id="lgbtqia-pnd" />
                        <Label htmlFor="lgbtqia-pnd">Prefiro não dizer</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Você é pessoa com deficiência (PCD)?</Label>
                    <RadioGroup 
                      value={formData.pcd} 
                      onValueChange={(v) => updateField("pcd", v)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="pcd-sim" />
                        <Label htmlFor="pcd-sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="pcd-nao" />
                        <Label htmlFor="pcd-nao">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Você é neurodivergente?</Label>
                    <RadioGroup 
                      value={formData.neurodivergente} 
                      onValueChange={(v) => updateField("neurodivergente", v)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="neuro-sim" />
                        <Label htmlFor="neuro-sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="neuro-nao" />
                        <Label htmlFor="neuro-nao">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefiro-nao-dizer" id="neuro-pnd" />
                        <Label htmlFor="neuro-pnd">Prefiro não dizer</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={currentStep === 1 ? handleCancelar : prevStep}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentStep === 1 ? "Cancelar" : "Anterior"}
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="gap-2">
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSalvar} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Cadastro"
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Validation Dialog */}
      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Campos obrigatórios
            </AlertDialogTitle>
            <AlertDialogDescription>
              Por favor, preencha os seguintes campos antes de continuar:
              <ul className="list-disc list-inside mt-2 space-y-1">
                {missingFields.map((field, index) => (
                  <li key={index} className="text-destructive">{field}</li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
