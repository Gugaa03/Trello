import { useState, useEffect } from "react";
import Column from "./components/Column";
import { loadBoard, saveBoard } from "./utils/storage";

// Gera ID simples
const uid = () => Math.random().toString(36).substring(2, 9);

// Colunas padrão com cores
const defaultColumns = [
  { title: "Planeado", color: "yellow" },
  { title: "Por Fazer", color: "red" },
  { title: "Em Andamento", color: "purple" },
  { title: "Concluído", color: "black" },
  { title: "Próximas Alterações", color: "blue" },
];

export default function App() {
  const initialBoard = (() => {
    const saved = loadBoard();
    if (!saved) return { columns: defaultColumns.map(c => ({ ...c, id: uid(), cards: [] })) };

    const updatedColumns = defaultColumns.map(def => {
      const existing = saved.columns.find(col => col.title === def.title);
      return existing
        ? { ...existing, color: def.color }
        : { ...def, id: uid(), cards: [] };
    });

    return { columns: updatedColumns };
  })();

  const [board, setBoard] = useState(initialBoard);

  useEffect(() => {
    saveBoard(board);
  }, [board]);

  const addCard = (columnId, content) => {
    setBoard(prev => ({
      columns: prev.columns.map(col =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, { id: uid(), content }] }
          : col
      ),
    }));
  };

  const moveCard = (fromColumnId, toColumnId, cardId) => {
    if (!toColumnId || fromColumnId === toColumnId) return;

    setBoard(prev => {
      let movedCard = null;

      const updatedColumns = prev.columns.map(col => {
        if (col.id === fromColumnId) {
          const index = col.cards.findIndex(c => c.id === cardId);
          if (index !== -1) {
            movedCard = col.cards[index];
            const newCards = [...col.cards];
            newCards.splice(index, 1);
            return { ...col, cards: newCards };
          }
        }
        return col;
      });

      return {
        columns: updatedColumns.map(col =>
          col.id === toColumnId && movedCard
            ? { ...col, cards: [...col.cards, movedCard] }
            : col
        ),
      };
    });
  };

  const removeCard = (columnId, cardId) => {
    setBoard(prev => ({
      columns: prev.columns.map(col =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          : col
      ),
    }));
  };

  // Mapa de títulos para ids
  const columnsMap = {};
  board.columns.forEach(col => { columnsMap[col.title] = col.id; });

  return (
    <div className="flex flex-row flex-wrap justify-between p-6 gap-6 bg-cyan-500 min-h-screen">
      {board.columns.map(col => (
        <Column
          key={col.id}
          column={col}
          addCard={addCard}
          moveCard={moveCard}
          removeCard={removeCard}
          columnsMap={columnsMap}
        />
      ))}
    </div>
  );
}
