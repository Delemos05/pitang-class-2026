import { useState } from "react";

// Definir tarefa
type Task = {
  completed: boolean;
  id: string;
  title: string;
};

export default function Tasks() {
  
  const [input, setInput] = useState(""); // texto 
  const [tasks, setTasks] = useState<Task[]>([]); // lista de tarefas
  const [inputError, setInputError] = useState(false); // erro de validação

  // Função para salvar tarefa
  function onSaveTask() {
    // Validação: não adiciona se estiver vazio
    if (!input.trim()) {
      setInputError(true); // mostra erro
      setTimeout(() => setInputError(false), 2000); // remove erro após 2s
      return;
    }
    
    // Adiciona nova tarefa à lista
    setTasks([
      ...tasks,
      { completed: false, id: crypto.randomUUID(), title: input },
    ]);
    setInput(""); // limpa o input
    setInputError(false); // remove erro
  }

  // Função para marcar tarefa como concluída
  function completeTask({ id }: Task) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  // Função para deletar tarefa
  function deleteTask({ id }: Task) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Contadores para mostrar ao usuário
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="max-w-md mx-auto px-4">
      {/* Área de input para adicionar tarefas */}
      <div className="flex gap-2 mb-4">
        <input
          className={`flex-1 p-3 bg-white/10 border rounded-lg text-white placeholder-white/40 focus:outline-none transition-colors ${
            inputError 
              ? "border-red-400 focus:border-red-400" // borda vermelha se erro
              : "border-white/20 focus:border-white/40" // borda normal
          }`}
          placeholder="Add a task..."
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSaveTask()} // Adiciona com Enter
        />
        <button
          className="px-5 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          onClick={onSaveTask}
        >
          Adicionar
        </button>
      </div>

      {/* Mensagem de erro */}
      {inputError && (
        <p className="text-red-400 text-sm mb-4">Adicione uma tarefa, moço(a)!</p>
      )}

      {/* Contador de tarefas */}
      {totalCount > 0 && (
        <div className="text-white/50 text-sm mb-4 text-center">
          {completedCount} de {totalCount} completas
        </div>
      )}

      {/* Lista de tarefas */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            className={`flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors ${
              task.completed ? "opacity-50" : ""
            }`}
            key={task.id}
          >
            {/* Texto da tarefa - clicável para marcar como concluída */}
            <span
              className={`flex-1 ${
                task.completed ? "line-through text-white/50" : ""
              }`}
              onClick={() => completeTask(task)}
            >
              {task.title}
            </span>
            {/* Botão para deletar */}
            <button
              className="text-white/30 hover:text-red-400 px-2"
              onClick={() => deleteTask(task)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* Mensagem quando não há tarefas */}
      {tasks.length === 0 && (
        <p className="text-white/30 text-center py-8">sem Tarefa</p>
      )}
    </div>
  );
}
