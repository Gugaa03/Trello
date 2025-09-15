import { useState } from "react";
import Card from "./Card";

export default function Column({
  column,
  addCard,
  removeCard,
  moveCard,
  onDrop,
  boardColumns,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newDate, setNewDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleAdd = () => {
    if (!newTitle.trim() || !newDesc.trim() || !newDate || !newPriority) {
      alert("Preenche todos os campos!");
      return;
    }
    if (newDate < today) {
      alert("A data não pode ser anterior a hoje!");
      return;
    }
    addCard(column.id, {
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      date: newDate,
    });
    setNewTitle("");
    setNewDesc("");
    setNewPriority("");
    setNewDate("");
  };

  const otherColumns = boardColumns
    ? boardColumns.filter((c) => c.id !== column.id)
    : [];

  const gradientClass = (title) => {
    switch (title) {
      case "Por Fazer":
        return "bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 animate-gradient-x";
      case "Planeado":
        return "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-gradient-x";
      case "Em Andamento":
        return "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 animate-gradient-x";
      case "Concluído":
        return "bg-gradient-to-r from-green-500 via-green-600 to-green-700 animate-gradient-x";
      case "Próximas Alterações":
        return "bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 animate-gradient-x";
      default:
        return "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 animate-gradient-x";
    }
  };

  return (
    <div
      className={`flex flex-col w-80 rounded-2xl shadow h-screen p-4 ${gradientClass(
        column.title
      )}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, column.id)}
      style={{ backgroundSize: "400% 400%" }}
    >
      <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
        {column.title}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {column.cards.length === 0 && (
          <div className="text-sm italic text-white/80">Sem tarefas</div>
        )}

        {column.cards.map((card) => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                "card",
                JSON.stringify({ cardId: card.id, fromColumnId: column.id })
              )
            }
          >
            <Card
              content={card}
              moveCard={moveCard}
              removeCard={removeCard}
              otherColumns={otherColumns}
              columnId={column.id}
            />
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2">

        <input
          type="text"
          className={`w-full p-2 rounded border border-white/50 bg-white/20 placeholder-white/70 ${
            newTitle ? "text-black" : "text-white"
          }`}
          placeholder="Título da tarefa..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        
        <textarea
          className={`w-full p-2 rounded border border-white/50 bg-white/20 placeholder-white/70 ${
            newDesc ? "text-black" : "text-white"
          }`}
          placeholder="Descrição da tarefa..."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />

        <select
          className={`w-full p-2 rounded border border-white/50 bg-white/20 ${
            newPriority ? "text-black" : "text-black/70"
          }`}
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="" disabled>
            Prioridade
          </option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>

        <input
          type="date"
          className={`w-full p-2 rounded border border-white/50 bg-white/20 ${
            newDate ? "text-black" : "text-white"
          }`}
          min={today}
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <button
          className="w-full bg-white/20 text-white p-2 rounded font-bold hover:bg-white/30"
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
