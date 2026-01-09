import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Camera } from "lucide-react";

export default function EditarPerfil() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "Pedro Piaes",
    email: "pedro.piaes@serp.com.br",
    telefone: "(11) 99999-9999",
    cargo: "Desenvolvedor",
    departamento: "Tecnologia",
    endereco: "São Paulo, SP",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perfil atualizado com sucesso!");
    navigate("/usuario/visualizar");
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Editar Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-32 w-32 rounded-xl">
                  <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold rounded-xl">
                    {getInitials(formData.nome)}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="form-label">Nome Completo</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="form-label">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="form-label">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo" className="form-label">Cargo</Label>
                <Input
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departamento" className="form-label">Departamento</Label>
                <Input
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco" className="form-label">Endereço</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/usuario/visualizar")}
                className="text-destructive border-destructive hover:bg-destructive hover:text-white transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button type="submit" className="btn-action px-6">
                Salvar Alterações
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
