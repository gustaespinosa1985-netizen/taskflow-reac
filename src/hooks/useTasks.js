import { useEffect, useState } from "react";

const STORAGE_KEY = "taskflow.tasks";

const sampleTasks = [
  { id: 1, title: "Preparar la presentación del lunes", done: false, createdAt: "2026-09-14T08:05:00" },
  { id: 2, title: "Revisar el informe de gastos", done: true, createdAt: "2026-09-14T08:10:00" },
  { id: 3, title: "Responder el correo de Compras", done: false, createdAt: "2026-09-14T08:15:00" },
];

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn("No se pudo leer lo que estaba guardado.", error);
  }
  return sampleTasks;
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn("No se pudo guardar.", error);
    }
  }, [tasks]);

  function addTask(title) {
    setTasks((current) => [
      ...current,
      { id: Date.now(), title: title, done: false, createdAt: new Date().toISOString() },
    ]);
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  }

  function removeCompleted() {
    setTasks((current) => current.filter((task) => !task.done));
  }

  return { tasks, addTask, toggleTask, removeCompleted };
}
