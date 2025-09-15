export default function Card({
  content,
  moveCard,
  removeCard,
  otherColumns,
  columnId,
}) {
  const priorityColor = (priority) => {
    switch (priority) {
      case "Alta":
        return "bg-red-600 text-white";
      case "Média":
        return "bg-yellow-600 text-black";
      case "Baixa":
        return "bg-green-600 text-black";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <div className="bg-white p-3 rounded shadow hover:shadow-xl transition-shadow duration-300 relative glow-card">
      <h3 className="font-bold text-lg">{content.title}</h3>
      <p className="text-sm text-gray-700">{content.description}</p>

      <div className="flex gap-2 mt-1 flex-wrap items-center">
        <div
          className={`text-xs px-2 py-1 rounded font-bold ${priorityColor(
            content.priority
          )}`}
        >
          {content.priority || "Prioridade"}
        </div>
        <div className="text-xs px-2 py-1 rounded bg-gray-200">
          {content.date}
        </div>
      </div>

      <div className="flex gap-1 flex-wrap mt-2">
        {otherColumns.map((c) => (
          <button
            key={c.id}
            className="text-xs px-2 py-1 rounded bg-gray-800 text-white hover:opacity-90"
            onClick={() => moveCard(columnId, c.id, content.id)}
          >
            → {c.title}
          </button>
        ))}
        <button
          className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:opacity-90"
          onClick={() => removeCard(columnId, content.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
