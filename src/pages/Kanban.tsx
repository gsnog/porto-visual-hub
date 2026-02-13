import { useState, useMemo } from 'react';
import {
  LayoutGrid,
  Search,
  Plus,
  Users,
  MoreHorizontal,
  ChevronLeft,
  Calendar,
  CheckSquare,
  X,
  Trash2,
  Edit2,
  ClipboardList,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { cn } from '@/lib/utils';
import { pessoasMock } from '@/data/pessoas-mock';
import {
  KanbanBoard,
  KanbanList,
  KanbanCard,
  kanbanBoardsMock,
  kanbanListsMock,
  kanbanCardsMock,
} from '@/data/kanban-mock';

type ViewMode = 'home' | 'board';

export default function Kanban() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedBoard, setSelectedBoard] = useState<KanbanBoard | null>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);

  // State
  const [boards, setBoards] = useState<KanbanBoard[]>(kanbanBoardsMock);
  const [lists, setLists] = useState<KanbanList[]>(kanbanListsMock);
  const [cards, setCards] = useState<KanbanCard[]>(kanbanCardsMock);

  // Drag and drop - cards
  const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null);
  const [dragOverListId, setDragOverListId] = useState<string | null>(null);

  // Drag and drop - lists
  const [draggedList, setDraggedList] = useState<KanbanList | null>(null);
  const [dragOverListTarget, setDragOverListTarget] = useState<string | null>(null);

  const filteredBoards = useMemo(() => {
    if (!searchQuery.trim()) return boards;
    const q = searchQuery.toLowerCase();
    return boards.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }, [boards, searchQuery]);

  const currentBoardLists = useMemo(() => {
    if (!selectedBoard) return [];
    return lists
      .filter((l) => l.boardId === selectedBoard.id)
      .sort((a, b) => a.position - b.position);
  }, [selectedBoard, lists]);

  const getCardsForList = (listId: string) => {
    return cards
      .filter((c) => c.listId === listId && !c.archived)
      .sort((a, b) => a.position - b.position);
  };

  // Navigation
  const openBoard = (board: KanbanBoard) => {
    setSelectedBoard(board);
    setViewMode('board');
  };

  const goBack = () => {
    setViewMode('home');
    setSelectedBoard(null);
  };

  const openCardModal = (card: KanbanCard) => {
    setSelectedCard({ ...card });
    setShowCardModal(true);
  };

  // Drag and Drop
  const handleDragStart = (e: React.DragEvent, card: KanbanCard) => {
    e.stopPropagation();
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', 'card');
  };

  const handleDragOver = (e: React.DragEvent, listId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverListId(listId);
  };

  const handleDrop = (e: React.DragEvent, targetListId: string) => {
    e.preventDefault();
    setDragOverListId(null);
    if (draggedCard && draggedCard.listId !== targetListId) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === draggedCard.id
            ? { ...c, listId: targetListId, position: getCardsForList(targetListId).length }
            : c
        )
      );
    }
    setDraggedCard(null);
  };

  // Drag and Drop - Lists
  const handleListDragStart = (e: React.DragEvent, list: KanbanList) => {
    setDraggedList(list);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', 'list'); // mark as list drag
  };

  const handleListDragOver = (e: React.DragEvent, targetListId: string) => {
    e.preventDefault();
    if (!draggedList || draggedList.id === targetListId) return;
    setDragOverListTarget(targetListId);
  };

  const handleListDrop = (e: React.DragEvent, targetListId: string) => {
    e.preventDefault();
    setDragOverListTarget(null);
    if (!draggedList || draggedList.id === targetListId) {
      setDraggedList(null);
      return;
    }

    setLists((prev) => {
      const boardLists = prev
        .filter((l) => l.boardId === draggedList.boardId)
        .sort((a, b) => a.position - b.position);
      const otherLists = prev.filter((l) => l.boardId !== draggedList.boardId);

      const fromIdx = boardLists.findIndex((l) => l.id === draggedList.id);
      const toIdx = boardLists.findIndex((l) => l.id === targetListId);

      const reordered = [...boardLists];
      const [moved] = reordered.splice(fromIdx, 1);
      reordered.splice(toIdx, 0, moved);

      const updated = reordered.map((l, i) => ({ ...l, position: i }));
      return [...otherLists, ...updated];
    });

    setDraggedList(null);
  };

  const handleListDragEnd = () => {
    setDraggedList(null);
    setDragOverListTarget(null);
  };


  const handleCreateBoard = (title: string, description: string, memberIds: string[]) => {
    const newBoard: KanbanBoard = {
      id: `b_${Date.now()}`,
      title,
      description,
      members: memberIds,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: '9',
    };
    setBoards((prev) => [...prev, newBoard]);
    setShowNewBoardModal(false);
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoards((prev) => prev.filter((b) => b.id !== boardId));
    setLists((prev) => prev.filter((l) => l.boardId !== boardId));
    const listIds = lists.filter((l) => l.boardId === boardId).map((l) => l.id);
    setCards((prev) => prev.filter((c) => !listIds.includes(c.listId)));
  };

  // CRUD - Lists
  const handleAddList = (title: string) => {
    if (!selectedBoard || !title.trim()) return;
    const newList: KanbanList = {
      id: `list_${Date.now()}`,
      boardId: selectedBoard.id,
      title: title.trim(),
      position: currentBoardLists.length,
    };
    setLists((prev) => [...prev, newList]);
  };

  const handleRenameList = (listId: string, newTitle: string) => {
    setLists((prev) =>
      prev.map((l) => (l.id === listId ? { ...l, title: newTitle } : l))
    );
  };

  const handleDeleteList = (listId: string) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
    setCards((prev) => prev.filter((c) => c.listId !== listId));
  };

  // CRUD - Cards
  const handleAddCard = (listId: string, title: string) => {
    if (!title.trim()) return;
    const newCard: KanbanCard = {
      id: `c_${Date.now()}`,
      listId,
      title: title.trim(),
      description: '',
      position: getCardsForList(listId).length,
      assigneeId: null,
      dueDate: null,
      checklists: [],
      observations: '',
      archived: false,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: '9',
    };
    setCards((prev) => [...prev, newCard]);
  };

  const handleUpdateCard = (updatedCard: KanbanCard) => {
    setCards((prev) =>
      prev.map((c) => (c.id === updatedCard.id ? updatedCard : c))
    );
    setSelectedCard(updatedCard);
  };

  const handleDeleteCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
    setShowCardModal(false);
    setSelectedCard(null);
  };

  // Get board members for assignee selection
  const getBoardMembers = () => {
    if (!selectedBoard) return pessoasMock;
    return pessoasMock.filter((p) => selectedBoard.members.includes(p.id));
  };

  // HOME VIEW
  const renderHome = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar quadros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2" onClick={() => setShowNewBoardModal(true)}>
          <Plus className="h-4 w-4" />
          Novo Quadro
        </Button>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold">Meus Quadros</h2>
        </div>
        {filteredBoards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBoards.map((board) => (
              <Card
                key={board.id}
                className="cursor-pointer hover:shadow-md transition-shadow group"
                onClick={() => openBoard(board)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{board.title}</h3>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {board.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBoard(board.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{board.members.length} participantes</span>
                    <span>-</span>
                    <span>
                      {lists.filter((l) => l.boardId === board.id).length} listas
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <LayoutGrid className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                {searchQuery
                  ? 'Nenhum quadro encontrado.'
                  : 'Nenhum quadro criado. Clique em "Novo Quadro" para comecar.'}
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );

  // BOARD VIEW
  const renderBoard = () => {
    if (!selectedBoard) return null;

    return (
      <div className="h-[calc(100vh-10rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ChevronLeft className="h-5 w-5 nav-arrow" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{selectedBoard.title}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedBoard.description}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              {selectedBoard.members.length} Participantes
            </Button>
          </div>
        </div>

        {/* Lists */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 h-full pb-4">
            {currentBoardLists.map((list) => (
              <KanbanListColumn
                key={list.id}
                list={list}
                cards={getCardsForList(list.id)}
                isDragOver={dragOverListId === list.id}
                isListDragOver={dragOverListTarget === list.id}
                isDraggingList={draggedList?.id === list.id}
                onDragOver={(e) => {
                  if (draggedList) {
                    handleListDragOver(e, list.id);
                  } else {
                    handleDragOver(e, list.id);
                  }
                }}
                onDragLeave={() => { setDragOverListId(null); setDragOverListTarget(null); }}
                onDrop={(e) => {
                  if (draggedList) {
                    handleListDrop(e, list.id);
                  } else {
                    handleDrop(e, list.id);
                  }
                }}
                onCardDragStart={handleDragStart}
                onCardDragEnd={() => { setDraggedCard(null); setDragOverListId(null); }}
                onCardClick={openCardModal}
                onAddCard={(title) => handleAddCard(list.id, title)}
                onRenameList={(title) => handleRenameList(list.id, title)}
                onDeleteList={() => handleDeleteList(list.id)}
                onListDragStart={(e) => handleListDragStart(e, list)}
                onListDragEnd={handleListDragEnd}
              />
            ))}

            {/* Add list */}
            <AddListButton onAdd={handleAddList} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      {viewMode === 'home' && renderHome()}
      {viewMode === 'board' && renderBoard()}

      {/* Card detail modal */}
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          open={showCardModal}
          onClose={() => {
            setShowCardModal(false);
            setSelectedCard(null);
          }}
          onUpdate={handleUpdateCard}
          onDelete={handleDeleteCard}
          boardMembers={getBoardMembers()}
          lists={currentBoardLists}
        />
      )}

      {/* New board modal */}
      <NewBoardModal
        open={showNewBoardModal}
        onClose={() => setShowNewBoardModal(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
}

// ============ ADD LIST BUTTON ============
function AddListButton({ onAdd }: { onAdd: (title: string) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <div className="w-72 flex-shrink-0">
        <Button
          variant="ghost"
          className="w-full h-10 justify-start gap-2 bg-muted/50 hover:bg-muted"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-4 w-4" />
          Adicionar lista
        </Button>
      </div>
    );
  }

  return (
    <div className="w-72 flex-shrink-0 bg-muted/50 rounded p-2 space-y-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nome da lista..."
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSubmit}>
          Adicionar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setIsAdding(false); setTitle(''); }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ============ KANBAN LIST COLUMN ============
interface KanbanListColumnProps {
  list: KanbanList;
  cards: KanbanCard[];
  isDragOver: boolean;
  isListDragOver: boolean;
  isDraggingList: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onCardDragStart: (e: React.DragEvent, card: KanbanCard) => void;
  onCardDragEnd: () => void;
  onCardClick: (card: KanbanCard) => void;
  onAddCard: (title: string) => void;
  onRenameList: (title: string) => void;
  onDeleteList: () => void;
  onListDragStart: (e: React.DragEvent) => void;
  onListDragEnd: () => void;
}

function KanbanListColumn({
  list,
  cards,
  isDragOver,
  isListDragOver,
  isDraggingList,
  onDragOver,
  onDragLeave,
  onDrop,
  onCardDragStart,
  onCardDragEnd,
  onCardClick,
  onAddCard,
  onRenameList,
  onDeleteList,
  onListDragStart,
  onListDragEnd,
}: KanbanListColumnProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameTitle, setRenameTitle] = useState(list.title);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(newCardTitle.trim());
      setNewCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleRename = () => {
    if (renameTitle.trim()) {
      onRenameList(renameTitle.trim());
      setIsRenaming(false);
    }
  };

  return (
    <div
      draggable
      onDragStart={onListDragStart}
      onDragEnd={onListDragEnd}
      className={cn(
        'w-72 flex-shrink-0 bg-muted/50 rounded p-2 flex flex-col max-h-full transition-all',
        isDragOver && 'ring-2 ring-primary ring-offset-2',
        isListDragOver && 'border-2 border-primary border-dashed',
        isDraggingList && 'opacity-50'
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        {isRenaming ? (
          <Input
            value={renameTitle}
            onChange={(e) => setRenameTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            className="h-7 text-sm font-medium"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{list.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {cards.length}
            </Badge>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsAddingCard(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar card
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setIsRenaming(true); setRenameTitle(list.title); }}>
              <Edit2 className="h-4 w-4 mr-2" />
              Renomear lista
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={onDeleteList}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir lista
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-2">
          {cards.map((card) => (
            <KanbanCardItem
              key={card.id}
              card={card}
              onDragStart={(e) => onCardDragStart(e, card)}
              onDragEnd={onCardDragEnd}
              onClick={() => onCardClick(card)}
            />
          ))}

          {isAddingCard ? (
            <div className="space-y-2">
              <Textarea
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Titulo do card..."
                className="resize-none"
                rows={2}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddCard();
                  }
                }}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddCard}>
                  Adicionar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setIsAddingCard(false); setNewCardTitle(''); }}
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

// ============ KANBAN CARD ITEM ============
function KanbanCardItem({
  card,
  onDragStart,
  onDragEnd,
  onClick,
}: {
  card: KanbanCard;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onClick: () => void;
}) {
  const assignee = card.assigneeId
    ? pessoasMock.find((p) => p.id === card.assigneeId)
    : null;
  const totalChecklistItems = card.checklists.reduce(
    (acc, cl) => acc + cl.items.length,
    0
  );
  const completedChecklistItems = card.checklists.reduce(
    (acc, cl) => acc + cl.items.filter((i) => i.completed).length,
    0
  );
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition-shadow"
    >
      <CardContent className="p-3 space-y-2">
        <p className="text-sm font-medium">{card.title}</p>

        {/* Info badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
          {card.dueDate && (
            <Badge
              variant={isOverdue ? 'destructive' : 'outline'}
              className="text-xs gap-1"
            >
              {isOverdue ? (
                <AlertCircle className="h-3 w-3" />
              ) : (
                <Calendar className="h-3 w-3" />
              )}
              {new Date(card.dueDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
              })}
              {isOverdue && ' - Em atraso'}
            </Badge>
          )}

          {totalChecklistItems > 0 && (
            <span className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              {completedChecklistItems}/{totalChecklistItems}
            </span>
          )}
        </div>

        {/* Assignee */}
        {assignee && (
          <div className="flex justify-end">
            <div
              className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium"
              title={assignee.nome}
            >
              {assignee.iniciais}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============ CARD DETAIL MODAL ============
function CardDetailModal({
  card,
  open,
  onClose,
  onUpdate,
  onDelete,
  boardMembers,
  lists,
}: {
  card: KanbanCard;
  open: boolean;
  onClose: () => void;
  onUpdate: (card: KanbanCard) => void;
  onDelete: (cardId: string) => void;
  boardMembers: typeof pessoasMock;
  lists: KanbanList[];
}) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const [newChecklistItemText, setNewChecklistItemText] = useState<Record<string, string>>({});
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  const list = lists.find((l) => l.id === card.listId);
  const assignee = card.assigneeId
    ? pessoasMock.find((p) => p.id === card.assigneeId)
    : null;
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  const updateField = (field: keyof KanbanCard, value: any) => {
    onUpdate({ ...card, [field]: value });
  };

  const toggleChecklistItem = (checklistId: string, itemId: string) => {
    const updatedChecklists = card.checklists.map((cl) =>
      cl.id === checklistId
        ? {
            ...cl,
            items: cl.items.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
          }
        : cl
    );
    onUpdate({ ...card, checklists: updatedChecklists });
  };

  const addChecklistItem = (checklistId: string) => {
    const text = newChecklistItemText[checklistId]?.trim();
    if (!text) return;
    const updatedChecklists = card.checklists.map((cl) =>
      cl.id === checklistId
        ? {
            ...cl,
            items: [
              ...cl.items,
              { id: `cki_${Date.now()}`, text, completed: false },
            ],
          }
        : cl
    );
    onUpdate({ ...card, checklists: updatedChecklists });
    setNewChecklistItemText((prev) => ({ ...prev, [checklistId]: '' }));
  };

  const addChecklist = () => {
    if (!newChecklistTitle.trim()) return;
    const newChecklist = {
      id: `ck_${Date.now()}`,
      title: newChecklistTitle.trim(),
      items: [],
    };
    onUpdate({ ...card, checklists: [...card.checklists, newChecklist] });
    setNewChecklistTitle('');
    setShowAddChecklist(false);
  };

  const deleteChecklist = (checklistId: string) => {
    onUpdate({
      ...card,
      checklists: card.checklists.filter((cl) => cl.id !== checklistId),
    });
  };

  const deleteChecklistItem = (checklistId: string, itemId: string) => {
    const updatedChecklists = card.checklists.map((cl) =>
      cl.id === checklistId
        ? { ...cl, items: cl.items.filter((item) => item.id !== itemId) }
        : cl
    );
    onUpdate({ ...card, checklists: updatedChecklists });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{card.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            na lista <span className="font-medium">{list?.title}</span>
          </p>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* Main content */}
          <div className="col-span-2 space-y-6">
            {/* Title edit */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Nome da Tarefa
              </Label>
              <Input
                value={card.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="font-medium"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Descricao
              </Label>
              <Textarea
                value={card.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Adicionar descricao..."
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Checklists */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckSquare className="h-3.5 w-3.5" />
                  Checklists
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 h-7 text-xs"
                  onClick={() => setShowAddChecklist(true)}
                >
                  <Plus className="h-3 w-3" />
                  Nova checklist
                </Button>
              </div>

              {showAddChecklist && (
                <div className="flex gap-2">
                  <Input
                    value={newChecklistTitle}
                    onChange={(e) => setNewChecklistTitle(e.target.value)}
                    placeholder="Nome da checklist..."
                    className="h-8 text-sm"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && addChecklist()}
                  />
                  <Button size="sm" className="h-8" onClick={addChecklist}>
                    Criar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    onClick={() => { setShowAddChecklist(false); setNewChecklistTitle(''); }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {card.checklists.map((checklist) => {
                const completed = checklist.items.filter((i) => i.completed).length;
                const total = checklist.items.length;
                const percent = total > 0 ? (completed / total) * 100 : 0;

                return (
                  <div key={checklist.id} className="border rounded p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        {checklist.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {completed}/{total}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => deleteChecklist(checklist.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {total > 0 && (
                      <div className="h-1.5 bg-muted rounded">
                        <div
                          className="h-full bg-primary rounded transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      {checklist.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 group/item">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() =>
                              toggleChecklistItem(checklist.id, item.id)
                            }
                          />
                          <span
                            className={cn(
                              'text-sm flex-1',
                              item.completed && 'line-through text-muted-foreground'
                            )}
                          >
                            {item.text}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 opacity-0 group-hover/item:opacity-100"
                            onClick={() =>
                              deleteChecklistItem(checklist.id, item.id)
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Add item */}
                    <div className="flex gap-2">
                      <Input
                        value={newChecklistItemText[checklist.id] || ''}
                        onChange={(e) =>
                          setNewChecklistItemText((prev) => ({
                            ...prev,
                            [checklist.id]: e.target.value,
                          }))
                        }
                        placeholder="Novo item..."
                        className="h-7 text-sm"
                        onKeyDown={(e) =>
                          e.key === 'Enter' && addChecklistItem(checklist.id)
                        }
                      />
                      <Button
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => addChecklistItem(checklist.id)}
                      >
                        Adicionar
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Observations */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Observacoes
              </Label>
              <Textarea
                value={card.observations}
                onChange={(e) => updateField('observations', e.target.value)}
                placeholder="Adicionar observacoes..."
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Assignee */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Responsavel
              </Label>
              <Select
                value={card.assigneeId || ''}
                onValueChange={(value) =>
                  updateField('assigneeId', value || null)
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {boardMembers.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {assignee && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                    {assignee.iniciais}
                  </div>
                  <span className="text-sm">{assignee.nome}</span>
                </div>
              )}
            </div>

            {/* Due date */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Prazo de Entrega
              </Label>
              <Input
                type="date"
                value={card.dueDate || ''}
                onChange={(e) =>
                  updateField('dueDate', e.target.value || null)
                }
                className="h-9"
              />
              {isOverdue && (
                <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  Em atraso
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Status
              </Label>
              {isOverdue ? (
                <Badge variant="destructive" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Em atraso
                </Badge>
              ) : (
                <Badge variant="secondary">
                  {list?.title || 'Sem lista'}
                </Badge>
              )}
            </div>

            {/* Move card */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Mover para
              </Label>
              <Select
                value={card.listId}
                onValueChange={(value) => updateField('listId', value)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {lists.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                onClick={() => onDelete(card.id)}
              >
                <Trash2 className="h-4 w-4" />
                Excluir card
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============ NEW BOARD MODAL ============
function NewBoardModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string, members: string[]) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate(title.trim(), description.trim(), selectedMembers);
    setTitle('');
    setDescription('');
    setSelectedMembers([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Quadro</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Nome <span className="text-destructive">*</span>
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do quadro"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Descricao</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descricao do quadro"
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Participantes</Label>
            <ScrollArea className="h-48 border rounded p-2">
              <div className="space-y-1">
                {pessoasMock
                  .filter((p) => p.status === 'Ativo')
                  .map((pessoa) => (
                    <div
                      key={pessoa.id}
                      className={cn(
                        'flex items-center gap-3 p-2 rounded cursor-pointer transition-colors',
                        selectedMembers.includes(pessoa.id)
                          ? 'bg-primary/10'
                          : 'hover:bg-muted'
                      )}
                      onClick={() => toggleMember(pessoa.id)}
                    >
                      <Checkbox
                        checked={selectedMembers.includes(pessoa.id)}
                        onCheckedChange={() => toggleMember(pessoa.id)}
                      />
                      <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                        {pessoa.iniciais}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm truncate block">{pessoa.nome}</span>
                        <span className="text-xs text-muted-foreground truncate block">
                          {pessoa.cargo} - {pessoa.setor}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
            {selectedMembers.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedMembers.length} participante(s) selecionado(s)
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={!title.trim()}>
              Criar Quadro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
