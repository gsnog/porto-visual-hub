import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Mail, Phone, Building2, Briefcase, Calendar, MapPin } from "lucide-react";

export default function VisualizarPerfil() {
  const navigate = useNavigate();

  // Dados mockados do usuário
  const usuario = {
    nome: "Pedro Piaes",
    email: "pedro.piaes@serp.com.br",
    telefone: "(11) 99999-9999",
    cargo: "Desenvolvedor",
    departamento: "Tecnologia",
    dataAdmissao: "15/03/2023",
    endereco: "São Paulo, SP",
    iniciais: "PP",
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Informações do Perfil</CardTitle>
          <Button 
            onClick={() => navigate("/usuario/editar")}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Editar Perfil
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar e Nome */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 rounded-xl">
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold rounded-xl">
                  {usuario.iniciais}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">{usuario.nome}</h2>
                <p className="text-muted-foreground">{usuario.cargo}</p>
              </div>
            </div>

            {/* Informações */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium text-foreground truncate">{usuario.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium text-foreground truncate">{usuario.telefone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Cargo</p>
                  <p className="font-medium text-foreground truncate">{usuario.cargo}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Departamento</p>
                  <p className="font-medium text-foreground truncate">{usuario.departamento}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Data de Admissão</p>
                  <p className="font-medium text-foreground truncate">{usuario.dataAdmissao}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Localização</p>
                  <p className="font-medium text-foreground truncate">{usuario.endereco}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
