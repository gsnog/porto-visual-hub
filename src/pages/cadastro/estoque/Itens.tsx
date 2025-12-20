import { Card } from "@/components/ui/card";

const Itens = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Itens</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Cadastro de itens do estoque.</p>
      </Card>
    </div>
  );
};

export default Itens;
