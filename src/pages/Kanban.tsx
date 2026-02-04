import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Star, 
  Clock, 
  Search, 
  Plus, 
  Settings, 
  Users, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckSquare,
  MessageSquare,
  Paperclip,
  User,
  X,
  GripVertical,
  Trash2,
  Copy,
  Archive,
  Eye,
  Flag,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { usePermissions } from '@/contexts/PermissionsContext';
import { pessoasMock } from '@/data/pessoas-mock';
import {
  KanbanWorkspace,
  KanbanBoard,
  KanbanList,
  KanbanCard,
  kanbanLabelsMock,
  kanbanWorkspacesMock,
  kanbanBoardsMock,
  kanbanListsMock,
  kanbanCardsMock,
  getWorkspacesByUser,
  getBoardsByWorkspace,
  getListsByBoard,
  getCardsByList,
  getStarredBoards,
  getRecentBoards,
  searchKanban,
  canManageBoard,
  canManageCards,
  getMyCards,
  getMyCardsThisWeek,
} from '@/data/kanban-mock';

// Estado mock do usuário atual
const CURRENT_USER_ID = '9'; // Pedro Piaes

type ViewMode = 'home' | 'workspace' | 'board';

export default function Kanban() {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedWorkspace, setSelectedWorkspace] = useState<KanbanWorkspace | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<KanbanBoard | null>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  
  // Estados para drag and drop
  const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null);
  const [draggedList, setDraggedList] = useState<KanbanList | null>(null);
  const [dragOverListId, setDragOverListId] = useState<string | null>(null);
  
  // Estados de listas e cards (para simular mudanças)
  const [lists, setLists] = useState<KanbanList[]>(kanbanListsMock);
  const [cards, setCards] = useState<KanbanCard[]>(kanbanCardsMock);
  
  // Dados do usuário
  const userWorkspaces = useMemo(() => getWorkspacesByUser(CURRENT_USER_ID), []);
  const starredBoards = useMemo(() => getStarredBoards(CURRENT_USER_ID), []);
  const recentBoards = useMemo(() => getRecentBoards(CURRENT_USER_ID), []);
  const myCards = useMemo(() => getMyCards(CURRENT_USER_ID), []);
  const myCardsThisWeek = useMemo(() => getMyCardsThisWeek(CURRENT_USER_ID), []);
  
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchKanban(CURRENT_USER_ID, searchQuery);
  }, [searchQuery]);
  
  const currentBoardLists = useMemo(() => {
    if (!selectedBoard) return [];
    return lists
      .filter(l => l.boardId === selectedBoard.id)
      .sort((a, b) => a.position - b.position);
  }, [selectedBoard, lists]);
  
  const getCardsForList = (listId: string) => {
    return cards
      .filter(c => c.listId === listId && !c.archived)
      .sort((a, b) => a.position - b.position);
  };
  
  // Navegação
  const openWorkspace = (ws: KanbanWorkspace) => {
    setSelectedWorkspace(ws);
    setViewMode('workspace');
  };
  
  const openBoard = (board: KanbanBoard) => {
    setSelectedBoard(board);
    setViewMode('board');
    // Encontrar workspace
    const ws = kanbanWorkspacesMock.find(w => w.id === board.workspaceId);
    if (ws) setSelectedWorkspace(ws);
  };
  
  const goBack = () => {
    if (viewMode === 'board') {
      setViewMode('workspace');
      setSelectedBoard(null);
    } else if (viewMode === 'workspace') {
      setViewMode('home');
      setSelectedWorkspace(null);
    }
  };
  
  const openCardModal = (card: KanbanCard) => {
    setSelectedCard(card);
    setShowCardModal(true);
  };
  
  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, card: KanbanCard) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e: React.DragEvent, listId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverListId(listId);
  };
  
  const handleDragLeave = () => {
    setDragOverListId(null);
  };
  
  const handleDrop = (e: React.DragEvent, targetListId: string) => {
    e.preventDefault();
    setDragOverListId(null);
    
    if (draggedCard && draggedCard.listId !== targetListId) {
      // Mover card para nova lista
      setCards(prev => prev.map(c => 
        c.id === draggedCard.id 
          ? { ...c, listId: targetListId, position: getCardsForList(targetListId).length } 
          : c
      ));
    }
    setDraggedCard(null);
  };
  
  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragOverListId(null);
  };
  
  // Renderização da Home
  const renderHome = () => (
    <div className="space-y-6">
      {/* Header com busca */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ambientes, quadros ou cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Criar Ambiente
          </Button>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Criar Quadro
          </Button>
        </div>
      </div>
      
      {/* Resultados de busca */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resultados da busca</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchResults.workspaces.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Ambientes</Label>
                <div className="flex flex-wrap gap-2">
                  {searchResults.workspaces.map(ws => (
                    <Button 
                      key={ws.id} 
                      variant="outline" 
                      size="sm"
                      onClick={() => openWorkspace(ws)}
                    >
                      {ws.icon} {ws.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {searchResults.boards.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Quadros</Label>
                <div className="flex flex-wrap gap-2">
                  {searchResults.boards.map(b => (
                    <Button 
                      key={b.id} 
                      variant="outline" 
                      size="sm"
                      onClick={() => openBoard(b)}
                    >
                      {b.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {searchResults.cards.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Cards</Label>
                <div className="space-y-2">
                  {searchResults.cards.slice(0, 5).map(c => (
                    <div 
                      key={c.id}
                      className="p-2 border rounded hover:bg-muted cursor-pointer"
                      onClick={() => openCardModal(c)}
                    >
                      <span className="text-sm">{c.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {searchResults.workspaces.length === 0 && 
             searchResults.boards.length === 0 && 
             searchResults.cards.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum resultado encontrado.</p>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Favoritos */}
      {starredBoards.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <h2 className="font-semibold">Favoritos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {starredBoards.map(board => (
              <BoardCard key={board.id} board={board} onClick={() => openBoard(board)} />
            ))}
          </div>
        </section>
      )}
      
      {/* Recentes */}
      {recentBoards.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold">Recentes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentBoards.map(board => (
              <BoardCard key={board.id} board={board} onClick={() => openBoard(board)} />
            ))}
          </div>
        </section>
      )}
      
      {/* Meus Ambientes */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">Meus Ambientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userWorkspaces.map(ws => (
            <Card 
              key={ws.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openWorkspace(ws)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center text-lg"
                    style={{ backgroundColor: ws.color + '20' }}
                  >
                    {ws.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{ws.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{ws.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{ws.members.length} membros</span>
                  <span>•</span>
                  <span>{getBoardsByWorkspace(ws.id).length} quadros</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Minha Semana */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">Minha Semana</h2>
        </div>
        <Card>
          <CardContent className="p-4">
            {myCardsThisWeek.length > 0 ? (
              <div className="space-y-2">
                {myCardsThisWeek.map(card => (
                  <div 
                    key={card.id}
                    className="flex items-center justify-between p-2 rounded border hover:bg-muted cursor-pointer"
                    onClick={() => openCardModal(card)}
                  >
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{card.title}</span>
                    </div>
                    {card.dueDate && (
                      <Badge variant="outline" className="text-xs">
                        {new Date(card.dueDate).toLocaleDateString('pt-BR')}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum card com vencimento esta semana.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
  
  // Renderização do Workspace
  const renderWorkspace = () => {
    if (!selectedWorkspace) return null;
    
    const workspaceBoards = getBoardsByWorkspace(selectedWorkspace.id);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div 
              className="w-12 h-12 rounded flex items-center justify-center text-xl"
              style={{ backgroundColor: selectedWorkspace.color + '20' }}
            >
              {selectedWorkspace.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold">{selectedWorkspace.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedWorkspace.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              Membros
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Quadro
            </Button>
          </div>
        </div>
        
        {/* Quadros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workspaceBoards.map(board => (
            <BoardCard key={board.id} board={board} onClick={() => openBoard(board)} />
          ))}
        </div>
      </div>
    );
  };
  
  // Renderização do Board (Kanban)
  const renderBoard = () => {
    if (!selectedBoard) return null;
    
    return (
      <div className="h-[calc(100vh-10rem)] flex flex-col">
        {/* Header do Board */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{selectedBoard.title}</h1>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Star className={cn(
                    "h-4 w-4",
                    selectedBoard.starred && "fill-yellow-500 text-yellow-500"
                  )} />
                </Button>
              </div>
              {selectedWorkspace && (
                <p className="text-sm text-muted-foreground">
                  {selectedWorkspace.icon} {selectedWorkspace.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {/* Filtros */}
            <Button variant="outline" size="sm" className="gap-2">
              <Tag className="h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              Membros
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Quadro
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Quadro
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Listas e Cards */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 h-full pb-4">
            {currentBoardLists.map(list => (
              <KanbanListColumn
                key={list.id}
                list={list}
                cards={getCardsForList(list.id)}
                isDragOver={dragOverListId === list.id}
                onDragOver={(e) => handleDragOver(e, list.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, list.id)}
                onCardDragStart={handleDragStart}
                onCardDragEnd={handleDragEnd}
                onCardClick={openCardModal}
              />
            ))}
            
            {/* Adicionar nova lista */}
            <div className="w-72 flex-shrink-0">
              <Button 
                variant="ghost" 
                className="w-full h-10 justify-start gap-2 bg-muted/50 hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
                Adicionar lista
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-full">
      {viewMode === 'home' && renderHome()}
      {viewMode === 'workspace' && renderWorkspace()}
      {viewMode === 'board' && renderBoard()}
      
      {/* Modal do Card */}
      <CardDetailModal
        card={selectedCard}
        open={showCardModal}
        onClose={() => {
          setShowCardModal(false);
          setSelectedCard(null);
        }}
      />
    </div>
  );
}

// Componentes auxiliares
interface BoardCardProps {
  board: KanbanBoard;
  onClick: () => void;
}

function BoardCard({ board, onClick }: BoardCardProps) {
  const workspace = kanbanWorkspacesMock.find(ws => ws.id === board.workspaceId);
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden group"
      onClick={onClick}
    >
      <div 
        className="h-24 relative"
        style={{ background: board.background }}
      >
        {board.starred && (
          <Star className="absolute top-2 right-2 h-4 w-4 text-white fill-white" />
        )}
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium truncate">{board.title}</h3>
        {workspace && (
          <p className="text-xs text-muted-foreground truncate mt-1">
            {workspace.icon} {workspace.name}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface KanbanListColumnProps {
  list: KanbanList;
  cards: KanbanCard[];
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onCardDragStart: (e: React.DragEvent, card: KanbanCard) => void;
  onCardDragEnd: () => void;
  onCardClick: (card: KanbanCard) => void;
}

function KanbanListColumn({
  list,
  cards,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onCardDragStart,
  onCardDragEnd,
  onCardClick,
}: KanbanListColumnProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  
  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      // Simulação - em produção seria uma chamada de API
      console.log('Novo card:', newCardTitle, 'na lista:', list.id);
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };
  
  return (
    <div 
      className={cn(
        "w-72 flex-shrink-0 bg-muted/50 rounded p-2 flex flex-col max-h-full",
        isDragOver && "ring-2 ring-primary ring-offset-2"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Header da lista */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">{list.title}</h3>
          <Badge variant="secondary" className="text-xs">
            {cards.length}
            {list.cardLimit && `/${list.cardLimit}`}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Adicionar card</DropdownMenuItem>
            <DropdownMenuItem>Renomear lista</DropdownMenuItem>
            <DropdownMenuItem>Mover lista</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Excluir lista
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Cards */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-2">
          {cards.map(card => (
            <KanbanCardItem
              key={card.id}
              card={card}
              onDragStart={(e) => onCardDragStart(e, card)}
              onDragEnd={onCardDragEnd}
              onClick={() => onCardClick(card)}
            />
          ))}
          
          {/* Adicionar card */}
          {isAddingCard ? (
            <div className="space-y-2">
              <Textarea
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Digite um título para este card..."
                className="resize-none"
                rows={2}
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddCard}>
                  Adicionar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setIsAddingCard(false);
                    setNewCardTitle('');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground"
              onClick={() => setIsAddingCard(true)}
            >
              <Plus className="h-4 w-4" />
              Adicionar card
            </Button>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface KanbanCardItemProps {
  card: KanbanCard;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onClick: () => void;
}

function KanbanCardItem({ card, onDragStart, onDragEnd, onClick }: KanbanCardItemProps) {
  const assignees = pessoasMock.filter(p => card.assignees.includes(p.id));
  const labels = kanbanLabelsMock.filter(l => card.labels.includes(l.id));
  const totalChecklistItems = card.checklists.reduce((acc, cl) => acc + cl.items.length, 0);
  const completedChecklistItems = card.checklists.reduce(
    (acc, cl) => acc + cl.items.filter(i => i.completed).length, 
    0
  );
  
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();
  
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition-shadow group"
    >
      <CardContent className="p-3 space-y-2">
        {/* Labels */}
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {labels.map(label => (
              <div
                key={label.id}
                className="h-2 w-10 rounded-full"
                style={{ backgroundColor: label.color }}
                title={label.name}
              />
            ))}
          </div>
        )}
        
        {/* Título */}
        <p className="text-sm font-medium">{card.title}</p>
        
        {/* Badges e info */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
          {/* Due date */}
          {card.dueDate && (
            <Badge 
              variant={isOverdue ? "destructive" : "outline"}
              className="text-xs gap-1"
            >
              <Calendar className="h-3 w-3" />
              {new Date(card.dueDate).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short' 
              })}
            </Badge>
          )}
          
          {/* Prioridade */}
          {card.priority === 'urgent' && (
            <Badge variant="destructive" className="text-xs gap-1">
              <Flag className="h-3 w-3" />
              Urgente
            </Badge>
          )}
          {card.priority === 'high' && (
            <Badge className="text-xs gap-1 bg-orange-500">
              <Flag className="h-3 w-3" />
              Alta
            </Badge>
          )}
          
          {/* Checklist */}
          {totalChecklistItems > 0 && (
            <span className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              {completedChecklistItems}/{totalChecklistItems}
            </span>
          )}
          
          {/* Comentários */}
          {card.comments.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {card.comments.length}
            </span>
          )}
          
          {/* Anexos */}
          {card.attachments.length > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {card.attachments.length}
            </span>
          )}
        </div>
        
        {/* Assignees */}
        {assignees.length > 0 && (
          <div className="flex justify-end -space-x-2">
            {assignees.slice(0, 3).map(pessoa => (
              <div
                key={pessoa.id}
                className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium ring-2 ring-background"
                title={pessoa.nome}
              >
                {pessoa.iniciais}
              </div>
            ))}
            {assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium ring-2 ring-background">
                +{assignees.length - 3}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface CardDetailModalProps {
  card: KanbanCard | null;
  open: boolean;
  onClose: () => void;
}

function CardDetailModal({ card, open, onClose }: CardDetailModalProps) {
  if (!card) return null;
  
  const list = kanbanListsMock.find(l => l.id === card.listId);
  const board = kanbanBoardsMock.find(b => b.id === list?.boardId);
  const assignees = pessoasMock.filter(p => card.assignees.includes(p.id));
  const watchers = pessoasMock.filter(p => card.watchers.includes(p.id));
  const labels = kanbanLabelsMock.filter(l => card.labels.includes(l.id));
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-lg">{card.title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                na lista <span className="font-medium">{list?.title}</span>
                {board && ` • ${board.title}`}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* Conteúdo principal */}
          <div className="col-span-2 space-y-6">
            {/* Labels */}
            {labels.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Etiquetas</Label>
                <div className="flex flex-wrap gap-2">
                  {labels.map(label => (
                    <Badge 
                      key={label.id}
                      style={{ backgroundColor: label.color }}
                      className="text-white"
                    >
                      {label.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Descrição */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Descrição</Label>
              <p className="text-sm">
                {card.description || 'Sem descrição'}
              </p>
            </div>
            
            {/* Checklists */}
            {card.checklists.length > 0 && (
              <div className="space-y-4">
                {card.checklists.map(checklist => {
                  const completed = checklist.items.filter(i => i.completed).length;
                  const total = checklist.items.length;
                  const percent = total > 0 ? (completed / total) * 100 : 0;
                  
                  return (
                    <div key={checklist.id}>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          {checklist.title}
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full mb-3">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="space-y-2">
                        {checklist.items.map(item => (
                          <div key={item.id} className="flex items-center gap-2">
                            <Checkbox checked={item.completed} />
                            <span className={cn(
                              "text-sm",
                              item.completed && "line-through text-muted-foreground"
                            )}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Comentários */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Comentários</Label>
              <div className="space-y-3">
                {card.comments.length > 0 ? (
                  card.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {pessoasMock.find(p => p.id === comment.authorId)?.iniciais || '??'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{comment.authorName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum comentário.</p>
                )}
                
                {/* Novo comentário */}
                <div className="flex gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium flex-shrink-0">
                    PP
                  </div>
                  <div className="flex-1">
                    <Textarea 
                      placeholder="Escreva um comentário..."
                      rows={2}
                      className="resize-none"
                    />
                    <Button size="sm" className="mt-2">
                      Comentar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Atividades */}
            {card.activities.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Atividades</Label>
                <div className="space-y-2">
                  {card.activities.map(activity => (
                    <div key={activity.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{activity.userName}</span>
                      <span>{activity.description}</span>
                      <span>•</span>
                      <span>{new Date(activity.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Membros */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Responsáveis</Label>
              <div className="space-y-2">
                {assignees.map(pessoa => (
                  <div key={pessoa.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                      {pessoa.iniciais}
                    </div>
                    <span className="text-sm">{pessoa.nome}</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar
                </Button>
              </div>
            </div>
            
            {/* Datas */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Datas</Label>
              <div className="space-y-2 text-sm">
                {card.startDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Início: {new Date(card.startDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                )}
                {card.dueDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Vencimento: {new Date(card.dueDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Prioridade */}
            {card.priority && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Prioridade</Label>
                <Badge variant={
                  card.priority === 'urgent' ? 'destructive' :
                  card.priority === 'high' ? 'default' :
                  'secondary'
                }>
                  {card.priority === 'urgent' && 'Urgente'}
                  {card.priority === 'high' && 'Alta'}
                  {card.priority === 'medium' && 'Média'}
                  {card.priority === 'low' && 'Baixa'}
                </Badge>
              </div>
            )}
            
            {/* Observadores */}
            {watchers.length > 0 && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Observadores</Label>
                <div className="flex -space-x-2">
                  {watchers.map(pessoa => (
                    <div
                      key={pessoa.id}
                      className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium ring-2 ring-background"
                      title={pessoa.nome}
                    >
                      {pessoa.iniciais}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ações */}
            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Copy className="h-4 w-4" />
                Copiar
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Archive className="h-4 w-4" />
                Arquivar
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Excluir
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
