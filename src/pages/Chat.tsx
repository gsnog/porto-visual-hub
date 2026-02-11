import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  Users,
  Hash,
  User,
  Phone,
  Video,
  Info,
  X,
  ChevronDown,
  MessageSquare,
  UserPlus,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { usePermissions } from '@/contexts/PermissionsContext';
import {
  conversasMock,
  equipesMock,
  getConversasUsuario,
  getMensagensConversa,
  getTotalNaoLidas,
  ChatConversa,
  ChatMessage,
} from '@/data/chat-mock';
import { pessoasMock } from '@/data/pessoas-mock';
import { PersonHierarchyPanel } from '@/components/chat/PersonHierarchyPanel';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Chat() {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  
  const currentUserId = '9'; // Pedro Piaes (mockado)
  const currentUser = pessoasMock.find(p => p.id === currentUserId)!;
  
  const [activeTab, setActiveTab] = useState<'chats' | 'equipes'>('chats');
  const [selectedConversa, setSelectedConversa] = useState<ChatConversa | null>(null);
  const [mensagens, setMensagens] = useState<ChatMessage[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showHierarchyPanel, setShowHierarchyPanel] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState<typeof pessoasMock[0] | null>(null);
  const [onlineStatus] = useState<Record<string, boolean>>(() => {
    const status: Record<string, boolean> = {};
    pessoasMock.forEach(p => {
      status[p.id] = Math.random() > 0.4;
    });
    return status;
  });
  
  const [equipesOpen, setEquipesOpen] = useState<Record<string, boolean>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversas = useMemo(() => getConversasUsuario(currentUserId), []);
  const totalNaoLidas = useMemo(() => getTotalNaoLidas(currentUserId), []);
  
  const canCreateGroup = hasPermission('chat', 'all', 'create');
  
  // Carregar mensagens quando selecionar conversa
  useEffect(() => {
    if (selectedConversa) {
      const msgs = getMensagensConversa(selectedConversa.id);
      setMensagens(msgs);
    }
  }, [selectedConversa]);
  
  // Scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);
  
  const handleSendMessage = () => {
    if (!novaMensagem.trim() || !selectedConversa) return;
    
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      conversaId: selectedConversa.id,
      remetenteId: currentUserId,
      remetenteNome: currentUser.nome,
      remetenteIniciais: currentUser.iniciais,
      conteudo: novaMensagem,
      tipo: 'texto',
      dataHora: new Date().toISOString(),
      lido: true,
    };
    
    setMensagens([...mensagens, newMsg]);
    setNovaMensagem('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handlePessoaClick = (pessoa: typeof pessoasMock[0]) => {
    setSelectedPessoa(pessoa);
    setShowHierarchyPanel(true);
    setShowInfoPanel(false); // Fecha o painel de info se estiver aberto
  };

  const handleStartChat = (pessoaId: string) => {
    // Procurar conversa existente com essa pessoa
    const existingConversa = conversas.find(
      c => c.tipo === 'direto' && c.participantes.some(p => p.id === pessoaId)
    );
    
    if (existingConversa) {
      setSelectedConversa(existingConversa);
    } else {
      // Criar nova conversa mock
      const pessoa = pessoasMock.find(p => p.id === pessoaId);
      if (pessoa) {
        const newConversa: ChatConversa = {
          id: `c-new-${Date.now()}`,
          tipo: 'direto',
          nome: pessoa.nome,
          participantes: [
            { id: pessoaId, nome: pessoa.nome, iniciais: pessoa.iniciais, online: onlineStatus[pessoaId] ?? false },
            { id: currentUserId, nome: currentUser.nome, iniciais: currentUser.iniciais, online: true },
          ],
          naoLidas: 0,
        };
        setSelectedConversa(newConversa);
        toast({
          title: "Nova conversa",
          description: `Conversa iniciada com ${pessoa.nome}`,
        });
      }
    }
    setShowHierarchyPanel(false);
  };

  const handleCreateGroupChat = (pessoaIds: string[], groupName: string) => {
    // Criar grupo mock
    const participantes = pessoaIds.map(id => {
      const pessoa = pessoasMock.find(p => p.id === id);
      return {
        id,
        nome: pessoa?.nome ?? 'Desconhecido',
        iniciais: pessoa?.iniciais ?? '??',
        online: onlineStatus[id] ?? false,
      };
    });
    
    const newConversa: ChatConversa = {
      id: `c-group-${Date.now()}`,
      tipo: 'grupo',
      nome: groupName,
      descricao: `Grupo criado com ${participantes.length} membros`,
      participantes,
      naoLidas: 0,
      criadorId: currentUserId,
    };
    
    setSelectedConversa(newConversa);
    toast({
      title: "Grupo criado",
      description: `Grupo "${groupName}" criado com ${participantes.length} membros`,
    });
    setShowHierarchyPanel(false);
  };
  
  const formatMessageTime = (dataHora: string) => {
    const date = new Date(dataHora);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatLastMessageDate = (dataHora?: string) => {
    if (!dataHora) return '';
    const date = new Date(dataHora);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return formatMessageTime(dataHora);
    }
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };
  
  const getConversaIcon = (tipo: ChatConversa['tipo']) => {
    switch (tipo) {
      case 'direto': return User;
      case 'grupo': return Users;
      case 'equipe': return Hash;
    }
  };
  
  const filteredConversas = conversas.filter(c => 
    c.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const chatsDiretos = filteredConversas.filter(c => c.tipo === 'direto');
  const chatsGrupos = filteredConversas.filter(c => c.tipo === 'grupo');
  const chatsEquipes = filteredConversas.filter(c => c.tipo === 'equipe');
  
  return (
    <div className="flex h-[calc(100vh-4rem)] gap-0 -mx-6 -my-6">
      {/* Sidebar de conversas */}
      <div className="w-80 border-r bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Chat</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowNewChatModal(true)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Nova conversa
                </DropdownMenuItem>
                {canCreateGroup && (
                  <DropdownMenuItem onClick={() => setShowNewGroupModal(true)}>
                    <Users className="h-4 w-4 mr-2" />
                    Novo grupo
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar conversas..."
              className="pl-9 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-2">
              {/* Chats recentes */}
              {chatsDiretos.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-medium text-muted-foreground px-2 mb-1">
                    Recentes
                  </div>
                  {chatsDiretos.map(conversa => (
                    <ConversaItem 
                      key={conversa.id}
                      conversa={conversa}
                      isActive={selectedConversa?.id === conversa.id}
                      onClick={() => setSelectedConversa(conversa)}
                      formatLastMessageDate={formatLastMessageDate}
                    />
                  ))}
                </div>
              )}
              
              {/* Grupos */}
              {chatsGrupos.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-medium text-muted-foreground px-2 mb-1">
                    Grupos
                  </div>
                  {chatsGrupos.map(conversa => (
                    <ConversaItem 
                      key={conversa.id}
                      conversa={conversa}
                      isActive={selectedConversa?.id === conversa.id}
                      onClick={() => setSelectedConversa(conversa)}
                      formatLastMessageDate={formatLastMessageDate}
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Área de mensagens */}
      {selectedConversa ? (
        <div className="flex-1 flex flex-col bg-background">
          {/* Header da conversa */}
          <div className="h-14 px-4 border-b flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className={cn(
                  selectedConversa.tipo === 'equipe' && "bg-primary text-primary-foreground"
                )}>
                  {selectedConversa.tipo === 'equipe' ? (
                    <Hash className="h-4 w-4" />
                  ) : selectedConversa.tipo === 'grupo' ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    selectedConversa.participantes.find(p => p.id !== currentUserId)?.iniciais || 'U'
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm text-foreground">{selectedConversa.nome}</h3>
                {selectedConversa.tipo === 'direto' && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      selectedConversa.participantes.find(p => p.id !== currentUserId)?.online 
                        ? "bg-primary" 
                        : "bg-muted-foreground"
                    )} />
                    {selectedConversa.participantes.find(p => p.id !== currentUserId)?.online 
                      ? 'Online' 
                      : 'Offline'}
                  </span>
                )}
                {(selectedConversa.tipo === 'grupo' || selectedConversa.tipo === 'equipe') && (
                  <span className="text-xs text-muted-foreground">
                    {selectedConversa.participantes.length} membros
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Video className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setShowInfoPanel(!showInfoPanel)}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Mensagens */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mensagens.map((msg, idx) => {
                const isOwn = msg.remetenteId === currentUserId;
                const showAvatar = idx === 0 || mensagens[idx - 1].remetenteId !== msg.remetenteId;
                
                return (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex gap-3",
                      isOwn && "flex-row-reverse"
                    )}
                  >
                    {showAvatar && !isOwn ? (
                      <Avatar 
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => {
                          const pessoa = pessoasMock.find(p => p.id === msg.remetenteId);
                          if (pessoa) handlePessoaClick(pessoa);
                        }}
                      >
                        <AvatarFallback className="text-xs">
                          {msg.remetenteIniciais}
                        </AvatarFallback>
                      </Avatar>
                    ) : !isOwn ? (
                      <div className="w-8" />
                    ) : null}
                    
                    <div className={cn(
                      "max-w-[70%]",
                      isOwn && "text-right"
                    )}>
                      {showAvatar && !isOwn && (
                        <div className="text-xs font-medium text-foreground mb-1">
                          {msg.remetenteNome}
                        </div>
                      )}
                      <div className={cn(
                        "inline-block p-3 rounded-lg text-sm",
                        isOwn 
                          ? "bg-primary text-primary-foreground rounded-br-sm" 
                          : "bg-muted rounded-bl-sm"
                      )}>
                        {msg.conteudo}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatMessageTime(msg.dataHora)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input de mensagem */}
          <div className="p-4 border-t bg-card">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Digite uma mensagem..."
                  className="min-h-[40px] max-h-[120px] resize-none pr-10"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={1}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 absolute right-1 bottom-1"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                size="icon" 
                className="h-9 w-9 shrink-0"
                onClick={handleSendMessage}
                disabled={!novaMensagem.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">Selecione uma conversa</p>
            <p className="text-sm">Escolha uma conversa ao lado para começar a conversar</p>
          </div>
        </div>
      )}
      
      {/* Painel de informações */}
      {showInfoPanel && selectedConversa && (
        <div className="w-72 border-l bg-card">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-medium text-sm">Informações</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowInfoPanel(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100%-56px)]">
            <div className="p-4">
              <div className="text-center mb-4">
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarFallback className={cn(
                    "text-lg",
                    selectedConversa.tipo === 'equipe' && "bg-primary text-primary-foreground"
                  )}>
                    {selectedConversa.tipo === 'equipe' ? (
                      <Hash className="h-6 w-6" />
                    ) : selectedConversa.tipo === 'grupo' ? (
                      <Users className="h-6 w-6" />
                    ) : (
                      selectedConversa.participantes.find(p => p.id !== currentUserId)?.iniciais
                    )}
                  </AvatarFallback>
                </Avatar>
                <h4 className="font-medium">{selectedConversa.nome}</h4>
                {selectedConversa.descricao && (
                  <p className="text-sm text-muted-foreground mt-1">{selectedConversa.descricao}</p>
                )}
              </div>
              
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Membros ({selectedConversa.participantes.length})
                </div>
                <div className="space-y-2">
                  {selectedConversa.participantes.map(p => (
                    <button
                      key={p.id}
                      className="flex items-center gap-2 w-full p-2 rounded hover:bg-muted/50 transition-colors"
                      onClick={() => {
                        const pessoa = pessoasMock.find(pe => pe.id === p.id);
                        if (pessoa) handlePessoaClick(pessoa);
                      }}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{p.iniciais}</AvatarFallback>
                        </Avatar>
                        <span className={cn(
                          "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card",
                          p.online ? "bg-primary" : "bg-muted-foreground"
                        )} />
                      </div>
                      <span className="text-sm">{p.nome}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* Modal Nova Conversa */}
      <Dialog open={showNewChatModal} onOpenChange={setShowNewChatModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Conversa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar pessoa..." className="pl-9" />
            </div>
            <ScrollArea className="h-64">
              <div className="space-y-1">
                {pessoasMock
                  .filter(p => p.status === 'Ativo' && p.id !== currentUserId)
                  .map(pessoa => (
                    <button
                      key={pessoa.id}
                      className="flex items-center gap-3 w-full p-2 rounded hover:bg-muted/50 transition-colors"
                      onClick={() => {
                        // Mock: criar nova conversa
                        setShowNewChatModal(false);
                      }}
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{pessoa.iniciais}</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="text-sm font-medium">{pessoa.nome}</div>
                        <div className="text-xs text-muted-foreground">{pessoa.cargo} • {pessoa.setor}</div>
                      </div>
                    </button>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Modal Novo Grupo */}
      <Dialog open={showNewGroupModal} onOpenChange={setShowNewGroupModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Grupo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome do grupo</Label>
              <Input placeholder="Digite o nome do grupo" />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea placeholder="Descrição do grupo (opcional)" rows={2} />
            </div>
            <div>
              <Label>Adicionar membros</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar pessoa..." className="pl-9" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewGroupModal(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowNewGroupModal(false)}>
              Criar Grupo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      
      {/* Painel de Hierarquia */}
      {showHierarchyPanel && selectedPessoa && (
        <PersonHierarchyPanel
          pessoa={selectedPessoa}
          onClose={() => setShowHierarchyPanel(false)}
          onStartChat={handleStartChat}
          onCreateGroupChat={handleCreateGroupChat}
          currentUserId={currentUserId}
          onlineStatus={onlineStatus}
        />
      )}
    </div>
  );
}

// Componente de item de conversa
interface ConversaItemProps {
  conversa: ChatConversa;
  isActive: boolean;
  onClick: () => void;
  formatLastMessageDate: (date?: string) => string;
}

function ConversaItem({ conversa, isActive, onClick, formatLastMessageDate }: ConversaItemProps) {
  const Icon = conversa.tipo === 'direto' ? User : conversa.tipo === 'grupo' ? Users : Hash;
  const currentUserId = '9';
  
  const otherParticipant = conversa.tipo === 'direto' 
    ? conversa.participantes.find(p => p.id !== currentUserId)
    : null;
  
  return (
    <button
      className={cn(
        "flex items-center gap-3 w-full p-2 rounded transition-colors",
        isActive ? "bg-muted" : "hover:bg-muted/50"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarFallback className={cn(
            "text-sm",
            conversa.tipo === 'equipe' && "bg-primary text-primary-foreground"
          )}>
            {conversa.tipo === 'equipe' ? (
              <Hash className="h-4 w-4" />
            ) : conversa.tipo === 'grupo' ? (
              <Users className="h-4 w-4" />
            ) : (
              otherParticipant?.iniciais
            )}
          </AvatarFallback>
        </Avatar>
        {otherParticipant && (
          <span className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
            otherParticipant.online ? "bg-primary" : "bg-muted-foreground"
          )} />
        )}
      </div>
      
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm truncate">{conversa.nome}</span>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatLastMessageDate(conversa.ultimaMensagemData)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground truncate">
            {conversa.ultimaMensagem}
          </span>
          {conversa.naoLidas > 0 && (
            <Badge className="h-5 min-w-[20px] px-1.5 shrink-0">
              {conversa.naoLidas}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
