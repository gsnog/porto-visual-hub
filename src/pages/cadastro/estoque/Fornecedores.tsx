import { Card } from "@/components/ui/card";

const FornecedoresEstoque = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Fornecedores - Estoque</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Cadastro de fornecedores para estoque.</p>
      </Card>
    </div>
  );
};

export default FornecedoresEstoque;
