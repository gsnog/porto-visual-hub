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
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { estadosBrasil, opcoesSelecao, bancosBrasil } from "@/data/brasil-localidades"
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
]

// Campos obrigatórios por etapa
const requiredFieldsByStep: Record<number, string[]> = {
  1: ["nomeCompleto", "dataNascimento"],
  2: ["celular", "emailPessoal"],
  3: ["cep", "endereco", "bairro", "cidade", "estado"],
  4: ["banco", "tipoConta", "agencia", "conta"],
  5: ["cpf", "rg"],
  6: [], // Etapa 6 não tem campos obrigatórios
}

// Labels amigáveis para os campos
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
}

interface FormData {
  // Step 1
  nomeCompleto: string;
  dataNascimento: string;
  nomePai: string;
  nomeMae: string;
  sexo: string;
  estadoCivil: string;
  nacionalidade: string;
  racaCor: string;
  grauInstrucao: string;
  // Step 2
  celular: string;
  telefoneFixo: string;
  emailPessoal: string;
  emailCorporativo: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  // Step 3
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  // Step 4
  banco: string;
  tipoConta: string;
  agencia: string;
  conta: string;
  digito: string;
  chavePix: string;
  // Step 5
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
  // Step 6
  lgbtqia: string;
  neurodivergente: string;
  pcd: string;
  filhos: string;
  aposentado: string;
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
}

export default function Cadastro() {
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

  // Função para buscar endereço pelo CEP
  const fetchAddressByCep = useCallback(async (cep: string) => {
    // Remove caracteres não numéricos
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
      
      // Atualiza os campos com os dados retornados
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
      console.error('Erro ao buscar CEP:', error)
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
      handleSave("/", "Cadastro salvo com sucesso! O usuário foi cadastrado no sistema.")
    }
  }

  const handleCancelar = () => {
    navigate("/")
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    // Só permite ir para etapas anteriores ou a atual sem validação
    if (step <= currentStep) {
      setCurrentStep(step)
    } else {
      // Para ir para frente, precisa validar a etapa atual
      if (validateStep(currentStep)) {
        setCurrentStep(step)
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-background items-center">
      <div className="max-w-5xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
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
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground scale-110"
                        : currentStep > step.id
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors hidden md:block",
                      currentStep === step.id
                        ? "text-primary"
                        : currentStep > step.id
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-12 h-1 mx-2 rounded-full transition-colors duration-300",
                      currentStep > step.id ? "bg-green-500" : "bg-muted"
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
            {/* Step 1: Dados Pessoais */}
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
                    <p className="text-sm text-muted-foreground">Informações para comunicação</p>
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
                    <p className="text-xs text-muted-foreground">Número principal para contato</p>
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

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contato de Emergência</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Nome do contato" 
                      className="form-input"
                      value={formData.contatoEmergenciaNome}
                      onChange={(e) => updateField("contatoEmergenciaNome", e.target.value)}
                    />
                    <Input 
                      placeholder="(00) 00000-0000" 
                      className="form-input"
                      value={formData.contatoEmergenciaTelefone}
                      onChange={(e) => updateField("contatoEmergenciaTelefone", e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Pessoa para contato em caso de emergência</p>
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
                    <p className="text-sm text-muted-foreground">Localização residencial</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">CEP <span className="text-destructive">*</span></Label>
                    <div className="relative">
                      <Input 
                        placeholder="00000-000" 
                        className="form-input pr-10"
                        value={formData.cep}
                        onChange={(e) => {
                          const value = e.target.value
                          updateField("cep", value)
                          // Busca automática quando o CEP tem 8 dígitos
                          if (value.replace(/\D/g, '').length === 8) {
                            fetchAddressByCep(value)
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value
                          if (value.replace(/\D/g, '').length === 8) {
                            fetchAddressByCep(value)
                          }
                        }}
                      />
                      {isLoadingCep && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Digite o CEP para buscar o endereço automaticamente</p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium">Endereço <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="Rua, Avenida..." 
                      className="form-input"
                      value={formData.endereco}
                      onChange={(e) => updateField("endereco", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Número</Label>
                    <Input 
                      placeholder="Nº" 
                      className="form-input"
                      value={formData.numero}
                      onChange={(e) => updateField("numero", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label className="text-sm font-medium">Complemento</Label>
                    <Input 
                      placeholder="Apto, Bloco, Sala..." 
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
                    <Label className="text-sm font-medium">Estado <span className="text-destructive">*</span></Label>
                    <Input 
                      placeholder="UF" 
                      className="form-input"
                      value={formData.estado}
                      onChange={(e) => updateField("estado", e.target.value.toUpperCase().slice(0, 2))}
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
                </div>
              </div>
            )}

            {/* Step 4: Dados Bancários */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <Landmark className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Dados Bancários</h2>
                    <p className="text-sm text-muted-foreground">Informações para pagamento</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Banco <span className="text-destructive">*</span></Label>
                    <Select value={formData.banco} onValueChange={(v) => updateField("banco", v)}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar banco" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover max-h-60">
                        {bancosBrasil.map(banco => (
                          <SelectItem key={banco.codigo} value={banco.codigo}>
                            {banco.codigo} - {banco.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo da Conta <span className="text-destructive">*</span></Label>
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
                      placeholder="00000-0" 
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
                    placeholder="CPF, E-mail, Telefone ou Chave aleatória" 
                    className="form-input"
                    value={formData.chavePix}
                    onChange={(e) => updateField("chavePix", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Opcional - para pagamentos via PIX</p>
                </div>

                <div className="p-4 bg-muted/50 rounded border border-border">
                  <p className="text-sm text-muted-foreground">
                    💡 Caso não possua conta bancária, você será direcionado(a) para o banco mais próximo para abertura.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Documentos */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Documentos</h2>
                    <p className="text-sm text-muted-foreground">Documentação pessoal</p>
                  </div>
                </div>

                {/* CPF e RG */}
                <div className="p-4 bg-muted/30 rounded border border-border space-y-4">
                  <h3 className="font-medium text-foreground">Identificação</h3>
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
                      <Label className="text-sm font-medium">UF</Label>
                      <Select value={formData.ufRg} onValueChange={(v) => updateField("ufRg", v)}>
                        <SelectTrigger className="form-input">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover max-h-60">
                          {estadosBrasil.map(uf => (
                            <SelectItem key={uf.sigla} value={uf.sigla}>{uf.sigla}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Data Expedição</Label>
                      <Input 
                        type="date" 
                        className="form-input"
                        value={formData.dataExpedicaoRg}
                        onChange={(e) => updateField("dataExpedicaoRg", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* CTPS */}
                <div className="p-4 bg-muted/30 rounded border border-border space-y-4">
                  <h3 className="font-medium text-foreground">Carteira de Trabalho</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">CTPS</Label>
                      <Input 
                        placeholder="Número" 
                        className="form-input"
                        value={formData.ctps}
                        onChange={(e) => updateField("ctps", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Série</Label>
                      <Input 
                        placeholder="Série" 
                        className="form-input"
                        value={formData.ctpsSerie}
                        onChange={(e) => updateField("ctpsSerie", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">UF</Label>
                      <Select value={formData.ctpsUf} onValueChange={(v) => updateField("ctpsUf", v)}>
                        <SelectTrigger className="form-input">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover max-h-60">
                          {estadosBrasil.map(uf => (
                            <SelectItem key={uf.sigla} value={uf.sigla}>{uf.sigla}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Data Expedição</Label>
                      <Input 
                        type="date" 
                        className="form-input"
                        value={formData.ctpsDataExpedicao}
                        onChange={(e) => updateField("ctpsDataExpedicao", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">PIS/PASEP</Label>
                    <Input 
                      placeholder="000.00000.00-0" 
                      className="form-input max-w-xs"
                      value={formData.pisPasep}
                      onChange={(e) => updateField("pisPasep", e.target.value)}
                    />
                  </div>
                </div>

                {/* CNH e Outros */}
                <div className="p-4 bg-muted/30 rounded border border-border space-y-4">
                  <h3 className="font-medium text-foreground">Outros Documentos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">CNH</Label>
                      <Input 
                        placeholder="Número" 
                        className="form-input"
                        value={formData.cnh}
                        onChange={(e) => updateField("cnh", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Categoria</Label>
                      <Select value={formData.cnhCategoria} onValueChange={(v) => updateField("cnhCategoria", v)}>
                        <SelectTrigger className="form-input">
                          <SelectValue placeholder="Cat." />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
                          <SelectItem value="ab">AB</SelectItem>
                          <SelectItem value="c">C</SelectItem>
                          <SelectItem value="d">D</SelectItem>
                          <SelectItem value="e">E</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Validade</Label>
                      <Input 
                        type="date" 
                        className="form-input"
                        value={formData.cnhValidade}
                        onChange={(e) => updateField("cnhValidade", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Título de Eleitor</Label>
                      <Input 
                        placeholder="Número" 
                        className="form-input"
                        value={formData.tituloEleitor}
                        onChange={(e) => updateField("tituloEleitor", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Zona</Label>
                      <Input 
                        placeholder="Zona" 
                        className="form-input"
                        value={formData.tituloZona}
                        onChange={(e) => updateField("tituloZona", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Seção</Label>
                      <Input 
                        placeholder="Seção" 
                        className="form-input"
                        value={formData.tituloSecao}
                        onChange={(e) => updateField("tituloSecao", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Diversidade */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Informações de Diversidade</h2>
                    <p className="text-sm text-muted-foreground">Informações opcionais e confidenciais</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 mb-6">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    🔒 Estas informações são confidenciais e utilizadas apenas para fins estatísticos e políticas de inclusão.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você pertence à comunidade LGBTQIA+?</Label>
                      <p className="text-xs text-muted-foreground mt-1">Informação opcional</p>
                    </div>
                    <RadioGroup 
                      value={formData.lgbtqia} 
                      onValueChange={(v) => updateField("lgbtqia", v)} 
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="lgbtqia-sim" />
                        <Label htmlFor="lgbtqia-sim" className="text-sm">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="lgbtqia-nao" />
                        <Label htmlFor="lgbtqia-nao" className="text-sm">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefiro" id="lgbtqia-prefiro" />
                        <Label htmlFor="lgbtqia-prefiro" className="text-sm">Prefiro não informar</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você é uma pessoa neurodivergente?</Label>
                      <p className="text-xs text-muted-foreground mt-1">TEA, TDAH, Dislexia, etc.</p>
                    </div>
                    <RadioGroup 
                      value={formData.neurodivergente} 
                      onValueChange={(v) => updateField("neurodivergente", v)} 
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="neuro-sim" />
                        <Label htmlFor="neuro-sim" className="text-sm">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="neuro-nao" />
                        <Label htmlFor="neuro-nao" className="text-sm">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefiro" id="neuro-prefiro" />
                        <Label htmlFor="neuro-prefiro" className="text-sm">Prefiro não informar</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você é uma pessoa com deficiência?</Label>
                      <p className="text-xs text-muted-foreground mt-1">PCD - Pessoa com Deficiência</p>
                    </div>
                    <RadioGroup 
                      value={formData.pcd} 
                      onValueChange={(v) => updateField("pcd", v)} 
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="pcd-sim" />
                        <Label htmlFor="pcd-sim" className="text-sm">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="pcd-nao" />
                        <Label htmlFor="pcd-nao" className="text-sm">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefiro" id="pcd-prefiro" />
                        <Label htmlFor="pcd-prefiro" className="text-sm">Prefiro não informar</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você tem filho(s)?</Label>
                    </div>
                    <RadioGroup 
                      value={formData.filhos} 
                      onValueChange={(v) => updateField("filhos", v)} 
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="filhos-sim" />
                        <Label htmlFor="filhos-sim" className="text-sm">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="filhos-nao" />
                        <Label htmlFor="filhos-nao" className="text-sm">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você é aposentado(a)?</Label>
                    </div>
                    <RadioGroup 
                      value={formData.aposentado} 
                      onValueChange={(v) => updateField("aposentado", v)} 
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="aposentado-sim" />
                        <Label htmlFor="aposentado-sim" className="text-sm">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="aposentado-nao" />
                        <Label htmlFor="aposentado-nao" className="text-sm">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div>
                {currentStep > 1 && (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCancelar}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancelar
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    onClick={nextStep}
                    className="btn-action gap-2"
                  >
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSalvar}
                    className="btn-action gap-2 px-8"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Salvar Cadastro
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step indicator mobile */}
        <div className="mt-4 text-center text-sm text-muted-foreground md:hidden">
          Etapa {currentStep} de {steps.length}
        </div>
      </div>

      {/* Validation Dialog */}
      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Campos obrigatórios
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>Por favor, preencha os seguintes campos para continuar:</p>
                <ul className="list-disc list-inside space-y-1">
                  {missingFields.map((field, idx) => (
                    <li key={idx} className="text-destructive font-medium">{field}</li>
                  ))}
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="btn-action">
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
