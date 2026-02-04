import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { pessoasMock, setoresMock, getSubordinados, getCadeiaGestores } from "@/data/pessoas-mock";
import { cn } from "@/lib/utils";

interface HierarchyNode {
  pessoa: typeof pessoasMock[0];
  subordinados: HierarchyNode[];
  isExpanded: boolean;
}

function buildHierarchy(pessoaId: string | null, pessoas: typeof pessoasMock): HierarchyNode[] {
  const subordinados = pessoas.filter(p => p.gestorId === pessoaId);
  return subordinados.map(p => ({
    pessoa: p,
    subordinados: buildHierarchy(p.id, pessoas),
    isExpanded: true
  }));
}

function PersonCard({ pessoa, onClick, isCurrentUser = false }: { 
  pessoa: typeof pessoasMock[0]; 
  onClick?: () => void;
  isCurrentUser?: boolean;
}) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded border cursor-pointer transition-all hover:shadow-md",
        isCurrentUser ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/50"
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
        {pessoa.iniciais}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{pessoa.nome}</p>
        <p className="text-sm text-muted-foreground truncate">{pessoa.cargo}</p>
        <p className="text-xs text-muted-foreground">{pessoa.setor}</p>
      </div>
    </div>
  );
}

function HierarchyTreeNode({ node, level = 0, toggleExpand }: { 
  node: HierarchyNode; 
  level?: number;
  toggleExpand: (id: string) => void;
}) {
  const hasSubordinados = node.subordinados.length > 0;

  return (
    <div className="relative">
      <div className={cn("flex items-center gap-2", level > 0 && "ml-8")}>
        {hasSubordinados && (
          <button 
            onClick={() => toggleExpand(node.pessoa.id)}
            className="p-1 hover:bg-muted rounded"
          >
            {node.isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        )}
        {!hasSubordinados && <div className="w-6" />}
        <div className="flex-1 max-w-xs">
          <PersonCard pessoa={node.pessoa} />
        </div>
      </div>
      
      {node.isExpanded && hasSubordinados && (
        <div className="mt-2 space-y-2 border-l-2 border-muted ml-4 pl-4">
          {node.subordinados.map(sub => (
            <HierarchyTreeNode 
              key={sub.pessoa.id} 
              node={sub} 
              level={level + 1}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hierarquia() {
  const [viewMode, setViewMode] = useState<"gestor" | "area">("gestor");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(pessoasMock.map(p => p.id)));

  // Pessoas sem gestor (exceto diretores)
  const pessoasSemGestor = pessoasMock.filter(p => !p.gestorId && p.cargo !== 'Diretor');

  // Construir hierarquia por gestor
  const hierarchyByGestor = useMemo(() => {
    const topLevel = pessoasMock.filter(p => !p.gestorId);
    return topLevel.map(p => ({
      pessoa: p,
      subordinados: buildHierarchy(p.id, pessoasMock),
      isExpanded: expandedNodes.has(p.id)
    }));
  }, [expandedNodes]);

  // Hierarquia por área
  const hierarchyByArea = useMemo(() => {
    const areasRaiz = setoresMock.filter(s => !s.areaPaiId);
    return areasRaiz.map(area => ({
      area,
      pessoas: pessoasMock.filter(p => p.setorId === area.id),
      subAreas: setoresMock.filter(s => s.areaPaiId === area.id).map(subArea => ({
        area: subArea,
        pessoas: pessoasMock.filter(p => p.setorId === subArea.id)
      }))
    }));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Alerta de pessoas sem gestor */}
      {pessoasSemGestor.length > 0 && (
        <Card className="border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-700 dark:text-yellow-500">
                  {pessoasSemGestor.length} pessoa(s) sem gestor definido
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  {pessoasSemGestor.map(p => p.nome).join(", ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs de visualização */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "gestor" | "area")}>
        <TabsList>
          <TabsTrigger value="gestor" className="gap-2">
            <Users className="h-4 w-4" />
            Por Gestor
          </TabsTrigger>
          <TabsTrigger value="area" className="gap-2">
            <Building2 className="h-4 w-4" />
            Por Área
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gestor" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Organograma por Cadeia de Gestores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hierarchyByGestor.map(node => (
                  <HierarchyTreeNode 
                    key={node.pessoa.id} 
                    node={{
                      ...node,
                      isExpanded: expandedNodes.has(node.pessoa.id)
                    }}
                    toggleExpand={toggleExpand}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area" className="mt-6">
          <div className="space-y-6">
            {hierarchyByArea.map(areaGroup => (
              <Card key={areaGroup.area.id} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {areaGroup.area.nome}
                    <span className="text-sm font-normal text-muted-foreground">
                      ({areaGroup.pessoas.length} pessoas)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {areaGroup.pessoas.map(pessoa => (
                      <PersonCard key={pessoa.id} pessoa={pessoa} />
                    ))}
                  </div>
                  
                  {areaGroup.subAreas.length > 0 && (
                    <div className="border-t border-border pt-4 mt-4 space-y-4">
                      {areaGroup.subAreas.map(subArea => (
                        <div key={subArea.area.id}>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                            <ChevronRight className="h-4 w-4" />
                            {subArea.area.nome}
                            <span className="text-xs">({subArea.pessoas.length} pessoas)</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-6">
                            {subArea.pessoas.map(pessoa => (
                              <PersonCard key={pessoa.id} pessoa={pessoa} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
