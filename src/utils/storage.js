export const loadBoard = () => {
  try {
    const data = localStorage.getItem("board");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveBoard = (board) => {
  try {
    localStorage.setItem("board", JSON.stringify(board));
  } catch (e) {
    console.error("Erro ao salvar board:", e);
  }
};
