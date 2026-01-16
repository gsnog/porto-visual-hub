import { useState } from "react"
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
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Dados Pessoais", icon: User },
  { id: 2, title: "Contato", icon: Phone },
  { id: 3, title: "Endereço", icon: MapPin },
  { id: 4, title: "Dados Bancários", icon: Landmark },
  { id: 5, title: "Documentos", icon: FileText },
  { id: 6, title: "Diversidade", icon: Heart },
]

export default function Cadastro() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const handleSalvar = () => {
    navigate("/")
  }

  const handleCancelar = () => {
    navigate("/")
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="max-w-5xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
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
                      "flex-1 h-1 mx-2 rounded-full transition-colors duration-300",
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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
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
                    <Input placeholder="Nome igual ao RG" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data de Nascimento <span className="text-destructive">*</span></Label>
                    <Input type="date" className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nome do Pai</Label>
                    <Input placeholder="Nome completo" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nome da Mãe</Label>
                    <Input placeholder="Nome completo" className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sexo</Label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Estado Civil</Label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                        <SelectItem value="casado">Casado(a)</SelectItem>
                        <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                        <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nacionalidade</Label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="brasileira">Brasileira</SelectItem>
                        <SelectItem value="estrangeira">Estrangeira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Raça/Cor</Label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="branca">Branca</SelectItem>
                        <SelectItem value="preta">Preta</SelectItem>
                        <SelectItem value="parda">Parda</SelectItem>
                        <SelectItem value="amarela">Amarela</SelectItem>
                        <SelectItem value="indigena">Indígena</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Grau de Instrução</Label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                        <SelectItem value="medio">Ensino Médio</SelectItem>
                        <SelectItem value="superior">Ensino Superior</SelectItem>
                        <SelectItem value="pos">Pós-graduação</SelectItem>
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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
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
                    <Input placeholder="(00) 00000-0000" className="form-input" />
                    <p className="text-xs text-muted-foreground">Número principal para contato</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Telefone Fixo</Label>
                    <Input placeholder="(00) 0000-0000" className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">E-mail Pessoal <span className="text-destructive">*</span></Label>
                    <Input type="email" placeholder="email@exemplo.com" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">E-mail Corporativo</Label>
                    <Input type="email" placeholder="email@empresa.com" className="form-input" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contato de Emergência</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Nome do contato" className="form-input" />
                    <Input placeholder="(00) 00000-0000" className="form-input" />
                  </div>
                  <p className="text-xs text-muted-foreground">Pessoa para contato em caso de emergência</p>
                </div>
              </div>
            )}

            {/* Step 3: Endereço */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
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
                    <Input placeholder="00000-000" className="form-input" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium">Endereço <span className="text-destructive">*</span></Label>
                    <Input placeholder="Rua, Avenida..." className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Número</Label>
                    <Input placeholder="Nº" className="form-input" />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label className="text-sm font-medium">Complemento</Label>
                    <Input placeholder="Apto, Bloco, Sala..." className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Bairro <span className="text-destructive">*</span></Label>
                    <Input placeholder="Bairro" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Cidade <span className="text-destructive">*</span></Label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="sao-paulo">São Paulo</SelectItem>
                        <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                        <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Estado <span className="text-destructive">*</span></Label>
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="sp">São Paulo</SelectItem>
                        <SelectItem value="rj">Rio de Janeiro</SelectItem>
                        <SelectItem value="mg">Minas Gerais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Dados Bancários */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
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
                    <Select>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Selecionar banco" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="001">001 - Banco do Brasil</SelectItem>
                        <SelectItem value="104">104 - Caixa Econômica</SelectItem>
                        <SelectItem value="237">237 - Bradesco</SelectItem>
                        <SelectItem value="341">341 - Itaú</SelectItem>
                        <SelectItem value="033">033 - Santander</SelectItem>
                        <SelectItem value="260">260 - Nubank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo da Conta <span className="text-destructive">*</span></Label>
                    <Select>
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
                    <Input placeholder="0000" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Conta <span className="text-destructive">*</span></Label>
                    <Input placeholder="00000-0" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Dígito</Label>
                    <Input placeholder="0" className="form-input" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Chave PIX</Label>
                  <Input placeholder="CPF, E-mail, Telefone ou Chave aleatória" className="form-input" />
                  <p className="text-xs text-muted-foreground">Opcional - para pagamentos via PIX</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg border border-border">
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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Documentos</h2>
                    <p className="text-sm text-muted-foreground">Documentação pessoal</p>
                  </div>
                </div>

                {/* CPF e RG */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-4">
                  <h3 className="font-medium text-foreground">Identificação</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">CPF <span className="text-destructive">*</span></Label>
                      <Input placeholder="000.000.000-00" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">RG <span className="text-destructive">*</span></Label>
                      <Input placeholder="00.000.000-0" className="form-input" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Órgão Expedidor</Label>
                      <Input placeholder="SSP" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">UF</Label>
                      <Select>
                        <SelectTrigger className="form-input">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="sp">SP</SelectItem>
                          <SelectItem value="rj">RJ</SelectItem>
                          <SelectItem value="mg">MG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Data Expedição</Label>
                      <Input type="date" className="form-input" />
                    </div>
                  </div>
                </div>

                {/* CTPS */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-4">
                  <h3 className="font-medium text-foreground">Carteira de Trabalho</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">CTPS</Label>
                      <Input placeholder="Número" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Série</Label>
                      <Input placeholder="Série" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">UF</Label>
                      <Select>
                        <SelectTrigger className="form-input">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="sp">SP</SelectItem>
                          <SelectItem value="rj">RJ</SelectItem>
                          <SelectItem value="mg">MG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Data Expedição</Label>
                      <Input type="date" className="form-input" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">PIS/PASEP</Label>
                    <Input placeholder="000.00000.00-0" className="form-input max-w-xs" />
                  </div>
                </div>

                {/* CNH e Outros */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-4">
                  <h3 className="font-medium text-foreground">Outros Documentos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">CNH</Label>
                      <Input placeholder="Número" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Categoria</Label>
                      <Select>
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
                      <Input type="date" className="form-input" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Título de Eleitor</Label>
                      <Input placeholder="Número" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Zona</Label>
                      <Input placeholder="Zona" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Seção</Label>
                      <Input placeholder="Seção" className="form-input" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Diversidade */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Informações de Diversidade</h2>
                    <p className="text-sm text-muted-foreground">Informações opcionais e confidenciais</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    🔒 Estas informações são confidenciais e utilizadas apenas para fins estatísticos e políticas de inclusão.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você pertence à comunidade LGBTQIA+?</Label>
                      <p className="text-xs text-muted-foreground mt-1">Informação opcional</p>
                    </div>
                    <RadioGroup defaultValue="nao" className="flex gap-4">
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

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você é uma pessoa neurodivergente?</Label>
                      <p className="text-xs text-muted-foreground mt-1">TEA, TDAH, Dislexia, etc.</p>
                    </div>
                    <RadioGroup defaultValue="nao" className="flex gap-4">
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

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você é uma pessoa com deficiência?</Label>
                      <p className="text-xs text-muted-foreground mt-1">PCD - Pessoa com Deficiência</p>
                    </div>
                    <RadioGroup defaultValue="nao" className="flex gap-4">
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

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você tem filho(s)?</Label>
                    </div>
                    <RadioGroup defaultValue="nao" className="flex gap-4">
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

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                    <div>
                      <Label className="text-sm font-medium">Você é aposentado(a)?</Label>
                    </div>
                    <RadioGroup defaultValue="nao" className="flex gap-4">
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
                  >
                    <Check className="h-4 w-4" />
                    Salvar Cadastro
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
    </div>
  )
}
