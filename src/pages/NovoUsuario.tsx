import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NovoUsuario() {
  const inputClass = "bg-[#efefef] placeholder:text-[#22265B] placeholder:opacity-100 h-10 rounded-lg"
  const selectTriggerClass = "bg-[#efefef] text-black placeholder:text-[#22265B] placeholder:opacity-100 h-10 rounded-lg"

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden">
      <div className="p-6 space-y-6 overflow-x-hidden w-full max-w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Novo Usuário</h1>
        </div>

        <Card className="border-[#E3E3E3]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Informações do Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input id="username" placeholder="Nome de Usuário" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Nome" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input id="sobrenome" placeholder="Sobrenome" className={inputClass} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="Senha" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <Input id="confirmarSenha" type="password" placeholder="Confirmar Senha" className={inputClass} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fotoPerfil">Foto de Perfil</Label>
              <Input id="fotoPerfil" type="file" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Setor</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar Setor" className="!text-[#22265B]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="ti">TI</SelectItem>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Unidade</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar Unidade" className="!text-[#22265B]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matriz">Matriz</SelectItem>
                    <SelectItem value="filial1">Filial 1</SelectItem>
                    <SelectItem value="filial2">Filial 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cargo</Label>
              <Select>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Selecionar Cargo" className="!text-[#22265B]" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estagiario">Estagiário</SelectItem>
                  <SelectItem value="junior">Júnior</SelectItem>
                  <SelectItem value="pleno">Pleno</SelectItem>
                  <SelectItem value="senior">Sênior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end flex-wrap">
          <Button variant="outline" className="rounded-lg px-8">
            Cancelar
          </Button>
          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white px-8">
            Criar
          </Button>
        </div>
      </div>
    </div>
  )
}