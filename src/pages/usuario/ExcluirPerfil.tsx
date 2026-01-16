import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ExcluirPerfil() {
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");
  const expectedText = "EXCLUIR MINHA CONTA";

  const handleDelete = () => {
    if (confirmText !== expectedText) {
      toast.error("Digite o texto de confirmação corretamente.");
      return;
    }
    toast.success("Conta excluída com sucesso.");
    navigate("/");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-destructive">Excluir Conta</CardTitle>
              <CardDescription>Esta ação é irreversível</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded bg-destructive/10 border border-destructive/20">
            <h3 className="font-semibold text-foreground mb-2">Atenção!</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Todos os seus dados serão permanentemente excluídos</li>
              <li>• Seu histórico de atividades será removido</li>
              <li>• Você perderá acesso a todos os recursos do sistema</li>
              <li>• Esta ação não pode ser desfeita</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">
              Para confirmar, digite <span className="font-bold text-destructive">{expectedText}</span>
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Digite o texto de confirmação"
              className="border-destructive/50"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/usuario/visualizar")}
            >
              Cancelar
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={confirmText !== expectedText}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir Conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                    e removerá todos os dados associados de nossos servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Sim, excluir minha conta
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
