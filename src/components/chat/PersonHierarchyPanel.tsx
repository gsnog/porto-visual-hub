import { useState, useMemo } from 'react';
import { 
  X, 
  MessageSquare, 
  Users, 
  ChevronUp, 
  ChevronDown,
  Building2,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  Pessoa, 
  pessoasMock, 
  getCadeiaGestores, 
  getSubordinados 
} from '@/data/pessoas-mock';
import { usePermissions } from '@/contexts/PermissionsContext';
import { cn } from '@/lib/utils';

interface PersonHierarchyPanelProps {
  pessoa: Pessoa;
  onClose: () => void;
  onStartChat: (pessoaId: string) => void;
  onCreateGroupChat: (pessoaIds: string[], groupName: string) => void;
  currentUserId: string;
  onlineStatus?: Record<string, boolean>;
}

export function PersonHierarchyPanel({
  pessoa,
  onClose,
  onStartChat,
  onCreateGroupChat,
  currentUserId,
  onlineStatus = {},
}: PersonHierarchyPanelProps) {
  const { hasPermission, getScope } = usePermissions();
  const [gestoresOpen, setGestoresOpen] = useState(true);
  const [subordinadosOpen, setSubordinadosOpen] = useState(true);
  const [equipeOpen, setEquipeOpen] = useState(true);

  // Verificar permissões de visualização
  const scope = getScope('chat', 'all');
  
  // Obter cadeia de gestores
  const gestores = useMemo(() => {
    const cadeia = getCadeiaGestores(pessoa.id);
    // Filtrar baseado em permissões
    if (scope === 'self') {
      return cadeia.filter(g => g.id === pessoa.gestorId);
    }
    return cadeia;
  }, [pessoa.id, pessoa.gestorId, scope]);

  // Obter subordinados diretos
  const subordinados = useMemo(() => {
    const subs = getSubordinados(pessoa.id);
    // Filtrar baseado em permissões
    if (scope === 'self') {
      return [];
    }
    return subs.filter(s => s.status === 'Ativo');
  }, [pessoa.id, scope]);

  // Obter pessoas da mesma área/setor
  const pessoasArea = useMemo(() => {
    const mesmaArea = pessoasMock.filter(
      p => p.setorId === pessoa.setorId && 
           p.id !== pessoa.id && 
           p.status === 'Ativo'
    );
    // Remover duplicados (gestores e subordinados já mostrados)
    const idsJaMostrados = new Set([
      pessoa.id,
      ...gestores.map(g => g.id),
      ...subordinados.map(s => s.id)
    ]);
    return mesmaArea.filter(p => !idsJaMostrados.has(p.id));
  }, [pessoa, gestores, subordinados]);

  // Verificar se pode iniciar conversa com uma pessoa
  const canChatWith = (targetId: string) => {
    if (targetId === currentUserId) return false;
    if (!hasPermission('chat', 'all', 'view')) {
      // Verificar escopo
      if (scope === 'self') return false;
      if (scope === 'team') {
        // Pode conversar com pessoas da mesma equipe
        const target = pessoasMock.find(p => p.id === targetId);
        return target?.gestorId === pessoa.gestorId || target?.id === pessoa.gestorId;
      }
    }
    return true;
  };

  // Status online mockado
  const getOnlineStatus = (pessoaId: string) => {
    return onlineStatus[pessoaId] ?? Math.random() > 0.5;
  };

  // Handlers para grupos rápidos
  const handleCreateGestoresGroup = () => {
    const ids = gestores.filter(g => canChatWith(g.id)).map(g => g.id);
    if (ids.length > 0) {
      onCreateGroupChat([currentUserId, ...ids], `Gestores de ${pessoa.nome}`);
    }
  };

  const handleCreateSubordinadosGroup = () => {
    const ids = subordinados.filter(s => canChatWith(s.id)).map(s => s.id);
    if (ids.length > 0) {
      onCreateGroupChat([currentUserId, pessoa.id, ...ids], `Equipe ${pessoa.nome}`);
    }
  };

  const handleCreateAreaGroup = () => {
    const allIds = [
      ...pessoasArea.filter(p => canChatWith(p.id)).map(p => p.id),
      pessoa.id
    ].filter(id => id !== currentUserId);
    if (allIds.length > 0) {
      onCreateGroupChat([currentUserId, ...allIds], `Área ${pessoa.setor}`);
    }
  };

  return (
    <div className="w-80 border-l bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium text-sm">Perfil e Hierarquia</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Perfil da pessoa */}
          <div className="text-center">
            <div className="relative inline-block">
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {pessoa.iniciais}
                </AvatarFallback>
              </Avatar>
              <span className={cn(
                "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card",
                getOnlineStatus(pessoa.id) ? "bg-primary" : "bg-muted-foreground"
              )} />
            </div>
            <h4 className="font-semibold text-foreground mt-2">{pessoa.nome}</h4>
            <p className="text-sm text-muted-foreground">{pessoa.cargo}</p>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1">
              <Building2 className="h-3 w-3" />
              {pessoa.setor}
            </div>
            <Badge variant="outline" className="mt-2">
              {getOnlineStatus(pessoa.id) ? 'Online' : 'Offline'}
            </Badge>
          </div>

          {/* Gestor Direto */}
          {pessoa.gestorNome && pessoa.gestorId && (
            <div className="p-3 bg-muted/30 rounded border">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                Gestor Direto
              </div>
              <PersonRow
                pessoa={pessoasMock.find(p => p.id === pessoa.gestorId)!}
                isOnline={getOnlineStatus(pessoa.gestorId)}
                showChatButton={canChatWith(pessoa.gestorId)}
                onChat={() => onStartChat(pessoa.gestorId!)}
              />
            </div>
          )}

          {/* Ação rápida: Conversar com esta pessoa */}
          {pessoa.id !== currentUserId && canChatWith(pessoa.id) && (
            <Button 
              className="w-full" 
              onClick={() => onStartChat(pessoa.id)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Conversar com {pessoa.nome.split(' ')[0]}
            </Button>
          )}

          <Separator />

          {/* Seção: Hierarquia */}
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Hierarquia
            </h5>

            {/* Gestores (acima) */}
            {gestores.length > 0 && (
              <Collapsible open={gestoresOpen} onOpenChange={setGestoresOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Gestores</span>
                    <Badge variant="secondary" className="text-xs">
                      {gestores.length}
                    </Badge>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {gestores.map((gestor, idx) => (
                    <div 
                      key={gestor.id} 
                      className="ml-4"
                      style={{ opacity: 1 - (idx * 0.15) }}
                    >
                      <PersonRow
                        pessoa={gestor}
                        isOnline={getOnlineStatus(gestor.id)}
                        showChatButton={canChatWith(gestor.id)}
                        onChat={() => onStartChat(gestor.id)}
                        level={idx}
                      />
                    </div>
                  ))}
                  {gestores.filter(g => canChatWith(g.id)).length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={handleCreateGestoresGroup}
                    >
                      <Users className="h-3 w-3 mr-2" />
                      Criar grupo com gestores
                    </Button>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Pessoa selecionada (centro - destaque) */}
            <div className="my-2 p-2 bg-primary/10 border border-primary/20 rounded">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {pessoa.iniciais}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {pessoa.nome}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {pessoa.cargo}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  Selecionado
                </Badge>
              </div>
            </div>

            {/* Subordinados (abaixo) */}
            {subordinados.length > 0 && (
              <Collapsible open={subordinadosOpen} onOpenChange={setSubordinadosOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Subordinados</span>
                    <Badge variant="secondary" className="text-xs">
                      {subordinados.length}
                    </Badge>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {subordinados.map(sub => (
                    <div key={sub.id} className="ml-4">
                      <PersonRow
                        pessoa={sub}
                        isOnline={getOnlineStatus(sub.id)}
                        showChatButton={canChatWith(sub.id)}
                        onChat={() => onStartChat(sub.id)}
                      />
                    </div>
                  ))}
                  {subordinados.filter(s => canChatWith(s.id)).length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={handleCreateSubordinadosGroup}
                    >
                      <Users className="h-3 w-3 mr-2" />
                      Criar grupo com subordinados
                    </Button>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}

            {gestores.length === 0 && subordinados.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-2">
                Sem hierarquia registrada
              </p>
            )}
          </div>

          <Separator />

          {/* Seção: Equipe / Área */}
          <div>
            <Collapsible open={equipeOpen} onOpenChange={setEquipeOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">Pessoas da Área</span>
                  <Badge variant="secondary" className="text-xs">
                    {pessoasArea.length}
                  </Badge>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-1">
                {pessoasArea.length > 0 ? (
                  <>
                    {pessoasArea.map(p => (
                      <PersonRow
                        key={p.id}
                        pessoa={p}
                        isOnline={getOnlineStatus(p.id)}
                        showChatButton={canChatWith(p.id)}
                        onChat={() => onStartChat(p.id)}
                      />
                    ))}
                    {pessoasArea.filter(p => canChatWith(p.id)).length > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={handleCreateAreaGroup}
                      >
                        <Users className="h-3 w-3 mr-2" />
                        Criar grupo com a área
                      </Button>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Sem outras pessoas nesta área
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// Componente auxiliar para exibir uma pessoa na lista
interface PersonRowProps {
  pessoa: Pessoa;
  isOnline: boolean;
  showChatButton: boolean;
  onChat: () => void;
  level?: number;
}

function PersonRow({ pessoa, isOnline, showChatButton, onChat, level = 0 }: PersonRowProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors group">
      <div className="relative shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">
            {pessoa.iniciais}
          </AvatarFallback>
        </Avatar>
        <span className={cn(
          "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card",
          isOnline ? "bg-primary" : "bg-muted-foreground"
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground truncate">
          {pessoa.nome}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {pessoa.cargo}
        </div>
      </div>
      {showChatButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onChat();
          }}
          title="Iniciar conversa"
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
