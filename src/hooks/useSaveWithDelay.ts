import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface UseSaveWithDelayOptions {
  redirectTo?: string;
  successMessage?: string;
  successDescription?: string;
  delay?: number;
}

export function useSaveWithDelay(options?: UseSaveWithDelayOptions) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  const delay = options?.delay ?? 1500;

  // Função que aceita parâmetros dinâmicos ou usa os padrões
  const handleSave = async (
    redirectToParam?: string,
    successMessageParam?: string,
    successDescriptionParam?: string
  ) => {
    const finalRedirect = redirectToParam ?? options?.redirectTo ?? "/";
    const finalMessage = successMessageParam ?? options?.successMessage ?? "Salvo com sucesso!";
    const finalDescription = successDescriptionParam ?? options?.successDescription ?? "O registro foi salvo no sistema.";
    
    setIsSaving(true);
    
    // Simula processamento
    await new Promise((resolve) => setTimeout(resolve, delay));
    
    toast({
      title: finalMessage,
      description: finalDescription,
    });
    
    setIsSaving(false);
    navigate(finalRedirect);
  };

  // Mantém compatibilidade com handleSalvar para arquivos já atualizados
  const handleSalvar = async () => {
    await handleSave();
  };

  return { handleSave, handleSalvar, isSaving };
}
