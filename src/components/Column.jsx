import { useState } from "react";
import Card from "./Card";

export default function Column({ column, addCard, moveCard, removeCard, columnsMap }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim() && !newDesc.trim()) return;
    addCard(column.id, { title: newTitle.trim(), description: newDesc.trim() });
    setNewTitle("");
    setNewDesc("");
  };

const colorClass =
  column.title === "Por Fazer"
    ? "bg-red-400"
    : column.title === "Feito"
    ? "bg-green-400"
    : column.title === "Planeado"
    ? "bg-yellow-400"
    : column.title === "Em Andamento"
    ? "bg-purple-400"
    : column.title === "Concluído"
    ? "bg-teal-400"
    : column.title === "Próximas Alterações"
    ? "bg-pink-400"
    : "bg-gray-400"; // fallback


  const otherColumnTitles = Object.keys(columnsMap || {}).filter(t => t !== column.title);

  return (
    <div className={`flex flex-col w-80 rounded-2xl shadow ${colorClass} h-screen p-4`}>
      <h2 className="text-xl font-bold mb-4 text-white">{column.title}</h2>

      {/* Lista de tarefas com scroll interno */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {column.cards.length === 0 && (
          <div className="text-sm italic text-gray-100">Sem tarefas</div>
        )}

        {column.cards.map(card => (
          <div key={card.id} className="bg-white rounded p-3 shadow">
            <h3 className="font-semibold">{card.content.title || "Sem título"}</h3>
            <p className="text-sm text-gray-700">{card.content.description}</p>

            <div className="flex gap-2 mt-2 flex-wrap">
              {otherColumnTitles.map(title => (
                <button
                  key={title}
                  className="text-xs px-2 py-1 rounded bg-gray-800 text-white hover:opacity-90"
                  onClick={() => {
                    const toId = columnsMap[title];
                    if (!toId) return;
                    moveCard(column.id, toId, card.id);
                  }}
                >
                  → {title}
                </button>
              ))}

              <button
                className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:opacity-90"
                onClick={() => removeCard(column.id, card.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Input + botão */}
      <div className="mt-auto space-y-2">
        <input
          type="text"
          className="w-full p-2 rounded border"
          placeholder="Título da tarefa..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 rounded border"
          placeholder="Descrição da tarefa..."
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
        />
        <button
          className="w-full bg-gray-800 text-white p-2 rounded font-bold hover:bg-gray-700"
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
