import { useState } from "react";
import Column from "./components/Column";

const uid = () => Math.random().toString(36).substring(2, 9);

export default function App() {
  const [board, setBoard] = useState({
    columns: [
      { id: "todo", title: "Por Fazer", cards: [] },
      { id: "planned", title: "Planeado", cards: [] },
      { id: "inprogress", title: "Em Andamento", cards: [] },
      { id: "done", title: "Concluído", cards: [] },
      { id: "future", title: "Próximas Alterações", cards: [] },
    ],
  });

  const addCard = (columnId, card) => {
    setBoard((prev) => ({
      columns: prev.columns.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, { ...card, id: uid() }] }
          : col
      ),
    }));
  };

  const removeCard = (columnId, cardId) => {
    setBoard((prev) => ({
      columns: prev.columns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      ),
    }));
  };

  const moveCard = (fromColumnId, toColumnId, cardId) => {
    if (fromColumnId === toColumnId) return;

    setBoard((prev) => {
      let movedCard;
      const newColumns = prev.columns.map((col) => {
        if (col.id === fromColumnId) {
          movedCard = col.cards.find((c) => c.id === cardId);
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        return col;
      });

      return {
        columns: newColumns.map((col) =>
          col.id === toColumnId && movedCard
            ? { ...col, cards: [...col.cards, movedCard] }
            : col
        ),
      };
    });
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const { cardId, fromColumnId } = JSON.parse(e.dataTransfer.getData("card"));
    moveCard(fromColumnId, targetColumnId, cardId);
  };

  return (
    <div
      className="flex gap-6 p-6 h-screen overflow-x-auto"
      style={{
        background: `radial-gradient(circle at top left, #1e3a8a, #3b82f6, #9333ea, #f472b6)`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      {board.columns.map((col) => (
        <Column
          key={col.id}
          column={col}
          addCard={addCard}
          removeCard={removeCard}
          moveCard={moveCard}
          onDrop={handleDrop}
          boardColumns={board.columns}
        />
      ))}
    </div>
  );
}
