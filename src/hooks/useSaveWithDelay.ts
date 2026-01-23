import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface UseSaveWithDelayOptions {
  redirectTo: string;
  successMessage?: string;
  successDescription?: string;
  delay?: number;
}

export function useSaveWithDelay({
  redirectTo,
  successMessage = "Salvo com sucesso!",
  successDescription = "O registro foi salvo no sistema.",
  delay = 1500,
}: UseSaveWithDelayOptions) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSalvar = async () => {
    setIsSaving(true);
    
    // Simula processamento
    await new Promise((resolve) => setTimeout(resolve, delay));
    
    toast({
      title: successMessage,
      description: successDescription,
    });
    
    setIsSaving(false);
    navigate(redirectTo);
  };

  return { handleSalvar, isSaving };
}
