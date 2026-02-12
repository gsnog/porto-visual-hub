import { useState } from "react";
import { toast } from "sonner";

interface CnpjData {
  razaoSocial: string;
  nomeFantasia: string;
  endereco: string;
  email: string;
  telefone: string;
}

export const formatCnpj = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const useCnpjLookup = (
  setFieldValue: (field: string, value: string) => void
) => {
  const [isSearching, setIsSearching] = useState(false);

  const consultarCnpj = async (cnpjRaw: string) => {
    const digits = cnpjRaw.replace(/\D/g, "");

    if (digits.length !== 14) {
      toast.error("CNPJ inválido", {
        description: "O CNPJ deve conter 14 dígitos.",
      });
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://open.cnpja.com/office/${digits}`
      );

      if (!response.ok) {
        throw new Error("Empresa não encontrada");
      }

      const data = await response.json();

      const razaoSocial = data.company?.name || data.alias || "";
      const nomeFantasia = data.alias || data.company?.name || "";
      const email =
        data.emails && data.emails.length > 0
          ? data.emails[0].address || ""
          : "";
      const telefone =
        data.phones && data.phones.length > 0
          ? `(${data.phones[0].area}) ${data.phones[0].number}`
          : "";

      const addr = data.address || {};
      const endereco = [
        addr.street,
        addr.number,
        addr.details,
        addr.district,
        addr.city,
        addr.state,
        addr.zip,
      ]
        .filter(Boolean)
        .join(", ");

      // Fill available fields
      if (razaoSocial) setFieldValue("razaoSocial", razaoSocial);
      if (nomeFantasia) setFieldValue("nome", nomeFantasia);
      if (endereco) setFieldValue("endereco", endereco);
      if (email) setFieldValue("email", email);
      if (telefone) setFieldValue("telefone", telefone);

      toast.success("CNPJ encontrado!", {
        description: `${razaoSocial}`,
      });
    } catch (error) {
      toast.error("Erro ao consultar CNPJ", {
        description:
          "Não foi possível encontrar os dados. Verifique o CNPJ e tente novamente.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return { consultarCnpj, isSearching, formatCnpj };
};
