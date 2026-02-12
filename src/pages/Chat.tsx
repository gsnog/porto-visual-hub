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
  Network,
  PhoneOff,
  VideoOff,
  Mic,
  MicOff,
  Image as ImageIcon,
  Check,
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

const EMOJI_LIST = ['😀','😂','😍','👍','👏','🎉','🔥','❤️','😎','🤔','😅','🙌','💪','✅','⭐','🚀','💡','📌','👋','😊'];

export default function Chat() {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  
  const currentUserId = '9';
  const currentUser = pessoasMock.find(p => p.id === currentUserId)!;
  
  const [selectedConversa, setSelectedConversa] = useState<ChatConversa | null>(null);
  const [mensagens, setMensagens] = useState<ChatMessage[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showHierarchyPanel, setShowHierarchyPanel] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState<'audio' | 'video' | null>(null);
  const [callMuted, setCallMuted] = useState(false);
  const [callVideoOff, setCallVideoOff] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState<typeof pessoasMock[0] | null>(null);
  const [onlineStatus] = useState<Record<string, boolean>>(() => {
    const status: Record<string, boolean> = {};
    pessoasMock.forEach(p => {
      status[p.id] = Math.random() > 0.4;
    });
    return status;
  });

  // New group modal state
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupSearch, setNewGroupSearch] = useState('');
  const [newGroupMembers, setNewGroupMembers] = useState<string[]>([]);

  // New chat modal search
  const [newChatSearch, setNewChatSearch] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversas = useMemo(() => getConversasUsuario(currentUserId), []);
  const totalNaoLidas = useMemo(() => getTotalNaoLidas(currentUserId), []);
  
  const canCreateGroup = hasPermission('chat', 'all', 'create');
  
  useEffect(() => {
    if (selectedConversa) {
      const msgs = getMensagensConversa(selectedConversa.id);
      setMensagens(msgs);
    }
  }, [selectedConversa]);
  
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
    setShowInfoPanel(false);
  };

  const handleConversaHeaderClick = () => {
    if (!selectedConversa || selectedConversa.tipo !== 'direto') return;
    const otherParticipant = selectedConversa.participantes.find(p => p.id !== currentUserId);
    if (otherParticipant) {
      const pessoa = pessoasMock.find(p => p.id === otherParticipant.id);
      if (pessoa) handlePessoaClick(pessoa);
    }
  };

  const handleStartChat = (pessoaId: string) => {
    const existingConversa = conversas.find(
      c => c.tipo === 'direto' && c.participantes.some(p => p.id === pessoaId)
    );
    
    if (existingConversa) {
      setSelectedConversa(existingConversa);
    } else {
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
        toast({ title: "Nova conversa", description: `Conversa iniciada com ${pessoa.nome}` });
      }
    }
    setShowHierarchyPanel(false);
  };

  const handleCreateGroupChat = (pessoaIds: string[], groupName: string) => {
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
    toast({ title: "Grupo criado", description: `Grupo "${groupName}" criado com ${participantes.length} membros` });
    setShowHierarchyPanel(false);
  };

  const handleCreateGroupFromModal = () => {
    if (!newGroupName.trim() || newGroupMembers.length === 0) {
      toast({ title: "Atenção", description: "Informe o nome e adicione membros ao grupo." });
      return;
    }
    handleCreateGroupChat([currentUserId, ...newGroupMembers], newGroupName);
    setShowNewGroupModal(false);
    setNewGroupName('');
    setNewGroupDesc('');
    setNewGroupMembers([]);
    setNewGroupSearch('');
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleImageAttach = () => {
    imageInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = e.target.files?.[0];
    if (!file || !selectedConversa) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      conversaId: selectedConversa.id,
      remetenteId: currentUserId,
      remetenteNome: currentUser.nome,
      remetenteIniciais: currentUser.iniciais,
      conteudo: type === 'image' ? `📷 ${file.name}` : `📎 ${file.name}`,
      tipo: type === 'image' ? 'imagem' : 'arquivo',
      arquivoNome: file.name,
      dataHora: new Date().toISOString(),
      lido: true,
    };
    setMensagens(prev => [...prev, newMsg]);
    toast({ title: type === 'image' ? "Imagem enviada" : "Arquivo enviado", description: file.name });
    e.target.value = '';
  };

  const handleEmojiSelect = (emoji: string) => {
    setNovaMensagem(prev => prev + emoji);
  };

  const handleStartCall = (type: 'audio' | 'video') => {
    setShowCallModal(type);
    setCallMuted(false);
    setCallVideoOff(false);
  };

  const handleEndCall = () => {
    setShowCallModal(null);
    toast({ title: "Chamada encerrada" });
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
  
  const filteredConversas = conversas.filter(c => 
    c.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const chatsDiretos = filteredConversas.filter(c => c.tipo === 'direto');
  const chatsGrupos = filteredConversas.filter(c => c.tipo === 'grupo');

  const filteredNewChatPessoas = pessoasMock.filter(p => 
    p.status === 'Ativo' && p.id !== currentUserId &&
    (newChatSearch ? p.nome.toLowerCase().includes(newChatSearch.toLowerCase()) : true)
  );

  const filteredNewGroupPessoas = pessoasMock.filter(p =>
    p.status === 'Ativo' && p.id !== currentUserId &&
    (newGroupSearch ? p.nome.toLowerCase().includes(newGroupSearch.toLowerCase()) : true)
  );

  const callTarget = selectedConversa?.tipo === 'direto'
    ? selectedConversa.participantes.find(p => p.id !== currentUserId)
    : null;
  
  return (
    <div className="flex h-full overflow-hidden">
      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleFileSelected(e, 'file')} />
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelected(e, 'image')} />

      {/* Sidebar de conversas */}
      <div className="w-80 min-w-[320px] border-r bg-card flex flex-col overflow-hidden">
        <div className="p-4 border-b shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Chat</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setShowNewChatModal(true); setNewChatSearch(''); }}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Nova conversa
                </DropdownMenuItem>
                {canCreateGroup && (
                  <DropdownMenuItem onClick={() => { setShowNewGroupModal(true); setNewGroupName(''); setNewGroupDesc(''); setNewGroupMembers([]); setNewGroupSearch(''); }}>
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
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chatsDiretos.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-medium text-muted-foreground px-2 mb-1">Recentes</div>
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
            
            {chatsGrupos.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-medium text-muted-foreground px-2 mb-1">Grupos</div>
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
      
      {/* Área de mensagens */}
      {selectedConversa ? (
        <div className="flex-1 flex flex-col bg-background min-w-0 overflow-hidden">
          {/* Header da conversa */}
          <div className="h-14 px-4 border-b flex items-center justify-between bg-card shrink-0">
            <div 
              className={cn("flex items-center gap-3", selectedConversa.tipo === 'direto' && "cursor-pointer")}
              onClick={handleConversaHeaderClick}
            >
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
                    {selectedConversa.participantes.find(p => p.id !== currentUserId)?.online ? 'Online' : 'Offline'}
                  </span>
                )}
                {(selectedConversa.tipo === 'grupo' || selectedConversa.tipo === 'equipe') && (
                  <span className="text-xs text-muted-foreground">
                    {selectedConversa.participantes.length} membros
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded hover:bg-primary/10 transition-colors" onClick={() => handleStartCall('audio')}>
                <Phone className="h-5 w-5 text-foreground dark:text-white/70 hover:text-primary" />
              </button>
              <button className="p-2 rounded hover:bg-primary/10 transition-colors" onClick={() => handleStartCall('video')}>
                <Video className="h-5 w-5 text-foreground dark:text-white/70 hover:text-primary" />
              </button>
              <button className="p-2 rounded hover:bg-primary/10 transition-colors" onClick={() => setShowInfoPanel(!showInfoPanel)}>
                <Info className="h-5 w-5 text-foreground dark:text-white/70 hover:text-primary" />
              </button>
            </div>
          </div>
          
          {/* Mensagens - scroll restrito aqui */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {mensagens.map((msg, idx) => {
                const isOwn = msg.remetenteId === currentUserId;
                const showAvatar = idx === 0 || mensagens[idx - 1].remetenteId !== msg.remetenteId;
                
                return (
                  <div 
                    key={msg.id}
                    className={cn("flex gap-3", isOwn && "flex-row-reverse")}
                  >
                    {showAvatar && !isOwn ? (
                      <Avatar 
                        className="h-8 w-8 cursor-pointer shrink-0"
                        onClick={() => {
                          const pessoa = pessoasMock.find(p => p.id === msg.remetenteId);
                          if (pessoa) handlePessoaClick(pessoa);
                        }}
                      >
                        <AvatarFallback className="text-xs">{msg.remetenteIniciais}</AvatarFallback>
                      </Avatar>
                    ) : !isOwn ? (
                      <div className="w-8 shrink-0" />
                    ) : null}
                    
                    <div className={cn("max-w-[70%]", isOwn && "text-right")}>
                      {showAvatar && !isOwn && (
                        <div className="text-xs font-medium text-foreground mb-1">{msg.remetenteNome}</div>
                      )}
                      <div className={cn(
                        "inline-block p-3 rounded-lg text-sm break-words",
                        isOwn 
                          ? "bg-primary text-primary-foreground rounded-br-sm" 
                          : "bg-muted rounded-bl-sm"
                      )}>
                        {msg.conteudo}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{formatMessageTime(msg.dataHora)}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input de mensagem */}
          <div className="p-4 border-t bg-card shrink-0">
            <div className="flex items-end gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={handleFileAttach}>
                    <Paperclip className="h-4 w-4 mr-2" />
                    Anexar arquivo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleImageAttach}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Enviar imagem
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Digite uma mensagem..."
                  className="min-h-[40px] max-h-[120px] resize-none pr-10"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={1}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 absolute right-1 bottom-1">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2" align="end" side="top">
                    <div className="grid grid-cols-5 gap-1">
                      {EMOJI_LIST.map(emoji => (
                        <button
                          key={emoji}
                          className="h-9 w-9 flex items-center justify-center rounded hover:bg-muted text-lg transition-colors"
                          onClick={() => handleEmojiSelect(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
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
        <div className="flex-1 flex items-center justify-center bg-background min-w-0">
          <div className="text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">Selecione uma conversa</p>
            <p className="text-sm">Escolha uma conversa ao lado para começar a conversar</p>
          </div>
        </div>
      )}
      
      {/* Painel de informações */}
      {showInfoPanel && selectedConversa && (
        <div className="w-72 min-w-[288px] border-l bg-card flex flex-col overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between shrink-0">
            <h3 className="font-medium text-sm">Informações</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowInfoPanel(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
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
              <Input 
                placeholder="Buscar pessoa..." 
                className="pl-9"
                value={newChatSearch}
                onChange={(e) => setNewChatSearch(e.target.value)}
              />
            </div>
            <ScrollArea className="h-64">
              <div className="space-y-1">
                {filteredNewChatPessoas.map(pessoa => (
                  <button
                    key={pessoa.id}
                    className="flex items-center gap-3 w-full p-2 rounded hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      handleStartChat(pessoa.id);
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Grupo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome do grupo</Label>
              <Input 
                placeholder="Digite o nome do grupo"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea 
                placeholder="Descrição do grupo (opcional)" 
                rows={2}
                value={newGroupDesc}
                onChange={(e) => setNewGroupDesc(e.target.value)}
              />
            </div>
            <div>
              <Label>Adicionar membros</Label>
              {newGroupMembers.length > 0 && (
                <div className="flex flex-wrap gap-1 my-2">
                  {newGroupMembers.map(id => {
                    const p = pessoasMock.find(pe => pe.id === id);
                    return p ? (
                      <Badge key={id} variant="secondary" className="gap-1 pr-1">
                        {p.nome.split(' ')[0]}
                        <button onClick={() => setNewGroupMembers(prev => prev.filter(m => m !== id))} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar pessoa..." 
                  className="pl-9"
                  value={newGroupSearch}
                  onChange={(e) => setNewGroupSearch(e.target.value)}
                />
              </div>
              <ScrollArea className="h-48 mt-2">
                <div className="space-y-1">
                  {filteredNewGroupPessoas.map(pessoa => {
                    const isSelected = newGroupMembers.includes(pessoa.id);
                    return (
                      <button
                        key={pessoa.id}
                        className={cn(
                          "flex items-center gap-3 w-full p-2 rounded transition-colors",
                          isSelected ? "bg-primary/10" : "hover:bg-muted/50"
                        )}
                        onClick={() => {
                          setNewGroupMembers(prev => 
                            isSelected ? prev.filter(m => m !== pessoa.id) : [...prev, pessoa.id]
                          );
                        }}
                      >
                        <div className={cn(
                          "h-5 w-5 rounded border flex items-center justify-center shrink-0",
                          isSelected ? "bg-primary border-primary" : "border-border"
                        )}>
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{pessoa.iniciais}</AvatarFallback>
                        </Avatar>
                        <div className="text-left min-w-0">
                          <div className="text-sm font-medium truncate">{pessoa.nome}</div>
                          <div className="text-xs text-muted-foreground truncate">{pessoa.cargo}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewGroupModal(false)}>Cancelar</Button>
            <Button onClick={handleCreateGroupFromModal} disabled={!newGroupName.trim() || newGroupMembers.length === 0}>
              Criar Grupo ({newGroupMembers.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal de Chamada */}
      <Dialog open={showCallModal !== null} onOpenChange={(open) => !open && setShowCallModal(null)}>
        <DialogContent className="max-w-sm">
          <div className="flex flex-col items-center py-8 space-y-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {callTarget?.iniciais || (selectedConversa?.tipo === 'grupo' ? <Users className="h-8 w-8" /> : 'U')}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedConversa?.nome}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {showCallModal === 'video' ? 'Chamada de vídeo' : 'Chamada de voz'}
              </p>
              <p className="text-xs text-primary mt-2 animate-pulse">Chamando...</p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className={cn("h-12 w-12 rounded-full", callMuted && "bg-destructive/20 border-destructive")}
                onClick={() => setCallMuted(!callMuted)}
              >
                {callMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              {showCallModal === 'video' && (
                <Button
                  variant="outline"
                  size="icon"
                  className={cn("h-12 w-12 rounded-full", callVideoOff && "bg-destructive/20 border-destructive")}
                  onClick={() => setCallVideoOff(!callVideoOff)}
                >
                  {callVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
              )}
              
              <Button
                variant="destructive"
                size="icon"
                className="h-14 w-14 rounded-full"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
            </div>
          </div>
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
      <div className="relative shrink-0">
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
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-sm truncate">{conversa.nome}</span>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatLastMessageDate(conversa.ultimaMensagemData)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground truncate block max-w-[180px]">
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
